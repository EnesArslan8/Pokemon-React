import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, MenuItem, Button } from "@mui/material";

import LoadingSpin from "react-loading-spin";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 20;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [flippedCardIndex, setFlippedCardIndex] = useState(-1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("Tümü");
  const [isLoading, setIsLoading] = useState(false);
  const [showPageButtons, setShowPageButtons] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/"
        );
        setCount(countResponse.data.count);
        const type = await axios.get("https://pokeapi.co/api/v2/type");
        const typeInput = type.data.results.map((type) => type.name);
        setTypes(["Tümü", ...typeInput]);
        const pokemonResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${itemsPerPage}`
        );
        setPokemon(pokemonResponse.data.results);
      } catch (err) {
        console.log("Error fetching Pokemon data: " + err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredPokemon = async () => {
      if (selectedType === "Tümü") {
        try {
          const pokemonResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/?offset=${
              (currentPage - 1) * itemsPerPage
            }&limit=${itemsPerPage * 20}`
          );
          setCurrentPage(1); // Sayfalama sıfırlanıyor
          setPokemon(pokemonResponse.data.results);
        } catch (err) {
          console.log("Error fetching Pokemon data: " + err);
        }
      } else {
        try {
          const typeResponse = await axios.get(
            `https://pokeapi.co/api/v2/type/${selectedType}`
          );
          const pokemonURLs = typeResponse.data.pokemon.map(
            (pokemon) => pokemon.pokemon.url
          );
          const pokemonData = await Promise.all(
            pokemonURLs.map((url) => axios.get(url))
          );
          const filteredPokemon = pokemonData.map((response) => response.data);
          setPokemon(filteredPokemon);
          setCurrentPage(1); // Sayfalama sıfırlanıyor
          
        } catch (err) {
          console.log("Error fetching Pokemon data: " + err);
        }
      }
    };
    fetchFilteredPokemon();
  }, [selectedType, searchInputValue]);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setSelectedPokemon(response.data);
      setFlippedCardIndex(id === flippedCardIndex ? -1 : id);
      setIsLoading(false);
    } catch (err) {
      console.log("Error fetching Pokemon details: " + err);
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setShowPageButtons(false);
    setSearchInputValue(value);
  };
 
  const handleSearchSelectChange = (event) => {
    const { value } = event.target;
    setSelectedType(value);
    // setCurrentPage(1); // Sayfalama sıfırlanıyor
  };

  const filteredPokemon = () => {
    if (selectedType === "Tümü") {
      return pokemon.filter((item) =>
        item.name.toUpperCase().includes(searchInputValue.toUpperCase())
      );
    } else {
      return pokemon.filter((item) =>
        item.types?.some((type) => type.type.name === selectedType) &&
        item.name.toUpperCase().includes(searchInputValue.toUpperCase())
      );
    }
  };

  const getTotalPageCount = () => Math.ceil(count / itemsPerPage);

  const getPageRange = () => {
    const totalPages = getTotalPageCount();
    const maxPageButtons = 5;
    let startPage = currentPage - Math.floor(maxPageButtons / 2);
    startPage = Math.max(1, startPage);
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
    startPage = Math.max(1, endPage - maxPageButtons + 1);

    return { startPage, endPage };
  };

  return (
    <div className="pokemon">
      <div className="filterArea">
        <TextField
          color="error"
          id="searchInput"
          label="Pokemon aratınız..."
          variant="filled"
          helperText="Please search your Pokemon "
          fullWidth
          value={searchInputValue}
          onChange={handleSearchInputChange}
        />
        <TextField
          id="searchSelect"
          select
          label="Tür"
          value={selectedType}
          onChange={handleSearchSelectChange}
          helperText="Please select your Pokemon type"
        >
          {types.map((option, id) => (
            <MenuItem key={id} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="count">Toplam Pokemon Sayısı: {count}</div>
      <div className="cardContainer">
        {filteredPokemon()
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item) => (
            <div
              className={`card ${
                flippedCardIndex === item.name ? "flipped" : ""
              }`}
              key={item.name}
              onClick={() => handleCardClick(item.name)}
            >
              <div className="front">{item.name.toUpperCase()}</div>
              <div className="back">
                {isLoading ? (
                  <div>
                    <LoadingSpin />
                  </div>
                ) : flippedCardIndex === item.name && selectedPokemon ? (
                  <div>
                    <img
                      src={
                        selectedPokemon.sprites.other.dream_world.front_default
                      }
                      alt={selectedPokemon.name}
                    />
                    <p>İsim: {selectedPokemon.name}</p>
                    <p>Boy: {selectedPokemon.height}</p>
                    <p>Ağırlık: {selectedPokemon.weight}</p>
                  </div>
                ) : (
                  <p>Bu pokemonun bilgileri bulunamadı.</p>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="pages">
        {showPageButtons || searchInputValue==="" && (
          <div>
            {Array.from(
              { length: getPageRange().endPage - getPageRange().startPage + 1 },
              (_, index) => (
                <Button
                  key={getPageRange().startPage + index}
                  variant={
                    currentPage === getPageRange().startPage + index
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() =>
                    handlePageChange(getPageRange().startPage + index)
                  }
                >
                  {getPageRange().startPage + index}
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pokemon;
