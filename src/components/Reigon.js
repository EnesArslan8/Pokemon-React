import { useState, useEffect } from "react";
import pokeMap from "../img/pokeMap.png";
import axios from "axios";

function Reigon() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/region");
        setData(response.data.results);
      } catch (err) {
        console.log("Reigonlar gelirken hata oluştu: " + err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="reigon">
      <h1 className="title">REİGON</h1>

      <div className="container">
        <div className="city">
          {data.map((item, id) => {
            return (
              <span className="text" key={id}>
                {item.name.toUpperCase()}
              </span>
            );
          })}
        </div>
      </div>
      <div className="imgArea">
        <div className="imgBackGround">
          <img className="img" src={pokeMap} />
        </div>
      </div>
    </div>
  );
}

export default Reigon;
