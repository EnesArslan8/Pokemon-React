import { useState, useEffect } from "react";
import axios from "axios";

function Type() {
  const [data, setData] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [typePok, setTypePok] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        setData(response.data);
      } catch (err) {
        console.log("Type API çalışmadı:" + err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTypeId) {
      const fetchTypeId = async () => {
        try {
          const typeResponse = await axios.get(
            `https://pokeapi.co/api/v2/type/${selectedTypeId}`
          );
          setTypePok(typeResponse.data.pokemon);
        } catch (err) {
          console.log("Type Id dönerken hata:" + err);
        }
      };
      fetchTypeId();
    }
  }, [selectedTypeId]);

  const handleFlip = (item) => {
    setSelectedTypeId(selectedTypeId === item.name ? null : item.name);
  };

  console.log(data);
  console.log(typePok);

  return (
    <div className="types">
      <h1 className="typeTitle">POKEMON TYPES</h1>
      <div className="cardContainer">
        {Array.isArray(data.results) ? (
          data.results.map((item, id) => {
            return (
              <div
                onClick={() => handleFlip(item)}
                className={`card ${
                  selectedTypeId === item.name ? "flipped" : ""
                }`}
                key={id}
              >
                <h1>{item.name.toUpperCase()}</h1>
                {selectedTypeId === item.name && (
                  <div className="back">
                    {typePok.map((pokemon, index) => (
                      <p key={index}>{pokemon.pokemon.name}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="loading">Loading gelecek buraya</p>
        )}
      </div>
    </div>
  );
}

export default Type;
