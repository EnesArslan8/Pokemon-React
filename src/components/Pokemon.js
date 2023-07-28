// import axios from "axios";
// import { useState, useEffect } from "react";
// import { TextField, MenuItem } from "@mui/material";

// const currencies = [
//   {
//     value: "USD",
//     label: "$",
//   },
//   {
//     value: "EUR",
//     label: "€",
//   },
//   {
//     value: "BTC",
//     label: "฿",
//   },
//   {
//     value: "JPY",
//     label: "¥",
//   },
// ];

// function Pokemon() {
//   const [pokemon, setPokemon] = useState([]);
//   const [count, setCount] = useState(null);

//   useEffect(() => {
//     /*pokeCounter*/
//     const getCount = async () => {
//       try {
//         const responsiveCount = await axios.get(
//           "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281"
//         );
//         setCount(responsiveCount.data.results.length);
//       } catch (err) {
//         console.log("Pokemon sayısı getirelemedi:" + err);
//       }
//     };
//     getCount();

//     const getPoke = async () => {
//       try {
//         const responsivePoke = await axios.get(
//           `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`
//         );
//         setPokemon(responsivePoke.data.results);
//       } catch (err) {
//         console.log("Pokemon API hata verdi:" + err);
//       }
//     };
//     getPoke();
//   }, []);
//   console.log(pokemon);
//   console.log(count);
//   return (
//     <div className="pokemon">
//       <div className="filterArea">
//         <TextField
//           color="error"
//           id="searchInput"
//           label="Pokemon aratınız..."
//           variant="filled"
//           helperText="Please search your Pokemon "
//           fullWidth
//         />
//         <TextField
//           id="searchSelect"
//           select
//           variant="outlined"
//           color="error"
//           label="Tür"
//           defaultValue="Tür Seçiniz"
//           helperText="Please select your Pokemon type"
//         >
//           {currencies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//       </div>

//       <div className="count">Toplam Pokemon Sayısı: {count}</div>
//       <div className="cardContainer">
//         {pokemon.map((item, id) => (
//           <div className="card" key={id}>
//             {item.name.toUpperCase()}
//           </div>
//         ))}
//       </div>
//       <div className="pages">

//       </div>
//     </div>
//   );
// }

// export default Pokemon;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, MenuItem, Button } from "@mui/material";

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [flippedCardIndex, setFlippedCardIndex] = useState(-1);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const countResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281"
        );
        setCount(countResponse.data.results.length);

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
        {pokemon.map((item, id) => (
          <div
            className={`card ${flippedCardIndex === id ? "flipped" : ""}`}
            key={id}
            onClick={() =>
              setFlippedCardIndex(id === flippedCardIndex ? -1 : id)
            }
          >
            <div className="front">{item.name.toUpperCase()}</div>
            <div className="back"></div>
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
