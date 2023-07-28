import axios from "axios";
import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";

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




function Pokemon() {
  const [pokemon, setPokemon] = useState([]);

  const [count, setCount] = useState(null);

  useEffect(() => {
    /*pokeCounter*/
    const getCount = async () => {
      try {
        const responsiveCount = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281"
        );
        setCount(responsiveCount.data.results.length);
      } catch (err) {
        console.log("Pokemon sayısı getirelemedi:" + err);
      }
    };
    getCount();

    const getPoke = async () => {
      try {
        const responsivePoke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`
        );
        setPokemon(responsivePoke.data.results);
      } catch (err) {
        console.log("Pokemon API hata verdi:" + err);
      }
    };
    getPoke();
  }, []);
  console.log(pokemon);
  console.log(count);
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
          <div className="card" key={id}>
            {item.name.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="pages">
          
      </div>
    </div>
  );
}

export default Pokemon;
