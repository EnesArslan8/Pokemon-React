import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, MenuItem, Button } from "@mui/material";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

// ... (yukarıdaki kodlar aynı kalsın) ...

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [flippedCardIndex, setFlippedCardIndex] = useState(-1);
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/"
        );
        setCount(countResponse.data.count);

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

  const getPageRange = () => {
    const totalPages = Math.ceil(count / itemsPerPage);
    const maxPageButtons = 5;
    let startPage = currentPage - Math.floor(maxPageButtons / 2);
    startPage = Math.max(1, startPage);
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
    startPage = Math.max(1, endPage - maxPageButtons + 1);
    return { startPage, endPage };
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

  const filteredPokemon = pokemon.filter((item) =>
    item.name.toUpperCase().includes(searchInputValue.toUpperCase())
  );

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
          variant="outlined"
          color="error"
          label="Tür"
          defaultValue="Tür Seçiniz"
          helperText="Please select your Pokemon type"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="count">Toplam Pokemon Sayısı: {count}</div>
      <div className="cardContainer">
        {filteredPokemon.map((item) => (
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
