import { useState, useEffect } from "react";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import axios from "axios";

function ItemCategory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/item-category?offset=20&limit=54"
        );
        setData(response.data.results);
      } catch (err) {
        console.log("Item category yüklenirken hata oluştu:" + err);
      }
    };
    fecthData();
  }, []);
  console.log(data);
  return (
    <div className="ItemCategory">
      <h1 className="title">Item Category</h1>
      <div className="container">
        <div className="categoryItems">
          
          {data.map((item,id)=>{
            return <span key={id} className="categoryText"><SubdirectoryArrowRightIcon className="icon"/>{item.name}</span>
          })}
        </div>
      </div>
    </div>
  );
}

export default ItemCategory;
