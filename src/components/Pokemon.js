import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, MenuItem, Button } from "@mui/material";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [flippedCardIndex, setFlippedCardIndex] = useState(-1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("Tümü");

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
            `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${itemsPerPage}`
          );
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
        } catch (err) {
          console.log("Error fetching Pokemon data: " + err);
        }
      }
    };
    fetchFilteredPokemon();
  }, [selectedType]);

  const handlePageChange = async (pageNumber) => {
    setFlippedCardIndex(-1);
    setSelectedPokemon(null);

    try {
      const offset = (pageNumber - 1) * itemsPerPage;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${itemsPerPage}`
      );
      setPokemon(response.data.results);
      setCurrentPage(pageNumber);
    } catch (err) {
      console.log("Error fetching Pokemon data for page: " + pageNumber);
    }
  };

  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setSelectedPokemon(response.data);
      setFlippedCardIndex(id === flippedCardIndex ? -1 : id);
    } catch (err) {
      console.log("Error fetching Pokemon details: " + err);
    }
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchInputValue(value);
  };

  const handleSearchSelectChange = (event) => {
    const { value } = event.target;
    setSelectedType(value);
  };

  const getPageRange = () => {
    const totalPages = Math.ceil(count / itemsPerPage);
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
        {pokemon.map((item) => (
          <div
            className={`card ${
              flippedCardIndex === item.name ? "flipped" : ""
            }`}
            key={item.name}
            onClick={() => handleCardClick(item.name)}
          >
            <div className="front">{item.name.toUpperCase()}</div>
            <div className="back">
              {flippedCardIndex === item.name && selectedPokemon ? (
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
                <p>Tıklayın, bilgileri gösterin</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pages">
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
              onClick={() => handlePageChange(getPageRange().startPage + index)}
            >
              {getPageRange().startPage + index}
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default Pokemon;
