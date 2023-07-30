import React, { useEffect, useState } from "react";
import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
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

  const getGenderIcon = (genderName) => {
    switch (genderName) {
      case "male":
        return <MaleIcon className="icon"/>;
      case "female":
        return <FemaleIcon className="icon" />;
      default:
        return <TransgenderIcon className="icon" />;
    }
  };

  return (
    <div className="genders">
      <div className="container">
        <div className="gender">
          <h1 className="genderTitle">Gender</h1>
        </div>
        <div className="genderArea">
          <ul>
            {data.map((item, id) => {
              return (
                <li className="genderType" key={id}>
                  {getGenderIcon(item.name)}
                  <span className="typeText">{item.name.toUpperCase()}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p className="genderCount">
        Mevcut Pokemon cinsiyet sayısı : {data.length}
      </p>
    </div>
  );
}

export default Gender;
