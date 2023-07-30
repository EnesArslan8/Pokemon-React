import React, { useEffect, useState } from "react";
import axios from "axios";

function Gender() {
  const [data, getData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/gender");

        getData(response.data.results);
      } catch (err) {
        console.log("Genderlar gelirken hata oluştu:" + err);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="genders">
      <div className="container">
        <div className="gender">
          <h1 className="genderTitle">Gender</h1>
        </div>
        <div className="genderArea">
          <ul>
            {data.map((item,id)=>{
                return <li key={id}>{item.name}</li>
            })}
          </ul>
        </div>
        <p className="genderCount">
            Mevcut Pokemon cinsiyet sayısı : {data.length}
        </p>
      </div>
    </div>
  );
}

export default Gender;
