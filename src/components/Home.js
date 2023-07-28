import React from "react";
import closePoke from "../img/closePoke.png";
import openPoke from "../img/openedPoke.png";
import light from "../img/kisspng-computer-icons-lightning-encapsulated-postscript-5ae53876ad5195.3911558615249716387099.png";
function Home() {
  return (
    <div className="home">
      <div className="topSide">
        {/* <img id="img"  src={light}></img> */}
        <button>Get Started</button>
      </div>
      <div className="midSide">
        <div className="container">
          <button>Item Category</button>
          <img src={closePoke} />
          <button>Gender</button>
        </div>
      </div>
      <div className="bottomSide">
        <div>
          <button>Item</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
