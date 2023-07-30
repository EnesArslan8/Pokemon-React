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
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="reigon">
      <h1 className="title">REİGON</h1>
      <div className="reigonArea">
        {data.map((item, id) => {
          return (
            <div key={id} className="reigonName">
              {item.name}
            </div>
          );
        })}
        <img src={pokeMap}/>
      </div>
    </div>
  );
}

export default Reigon;
