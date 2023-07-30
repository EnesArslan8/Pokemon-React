import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

function Item() {
  const [itemName, setItemName] = useState([]);
  const [itemImg, setItemImg] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 75;
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseName = await axios.get(
          `https://pokeapi.co/api/v2/item/?offset=${
            (currentPage - 1) * itemsPerPage
          }&limit=${itemsPerPage}`
        );

        setItemName(responseName.data.results);
        setTotalItems(responseName.data.count);
        setTotalPages(Math.ceil(responseName.data.count / itemsPerPage));
      } catch (err) {
        console.log("Item name dönerken hata meydana geldi: " + err);
      }
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchItemImg = async () => {
      try {
        const imagePromises = itemName.map(async (item) => {
          const responseItemImg = await axios.get(item.url);
          return { id: item.name, image: responseItemImg.data.sprites.default };
        });

        const images = await Promise.all(imagePromises);

        const imageMap = images.reduce((acc, curr) => {
          acc[curr.id] = curr.image;
          return acc;
        }, {});

        setItemImg(imageMap);
      } catch (err) {
        console.log("Item resmi dönerken hata meydana geldi: " + err);
      }
    };
    fetchItemImg();
  }, [itemName]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageRange = () => {
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    return { startPage, endPage };
  };

  return (
    <div className="items">
        <h1 className="title">Item</h1>
      <div className="itemContainer">
        {itemName.map((item, id) => (
          <div className="item" key={id}>
            <div className="imgArea">
              {itemImg[item.name] && (
                <img className="img" src={itemImg[item.name]} alt={item.name} />
              )}
            </div>
            <div className="itemTitle">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </Button>
        {Array.from(
          { length: getPageRange().endPage - getPageRange().startPage + 1 },
          (_, index) => (
            <Button
              key={getPageRange().startPage + index}
              onClick={() => handlePageChange(getPageRange().startPage + index)}
              variant={
                currentPage === getPageRange().startPage + index
                  ? "contained"
                  : "outlined"
              }
            >
              {getPageRange().startPage + index}
            </Button>
          )
        )}
        <Button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
}

export default Item;
