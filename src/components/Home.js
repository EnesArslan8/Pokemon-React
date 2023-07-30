import React, { useEffect } from "react";
import closePoke from "../img/closePoke.png";
import {Link} from 'react-router-dom'

function Home() {
  useEffect(()=>{
    listenerImage();
  },[])
  
  function listenerImage(){
    const rotatingImg = document.getElementById("rotatingImg");
    document.addEventListener("mousemove", (e) => {
      
        const containerRect = rotatingImg.parentElement.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        const angle = Math.atan2(
          e.clientY - containerCenterY,
          e.clientX - containerCenterX
        );
        const rotationDeg = angle * (180 / Math.PI *4);
        rotatingImg.style.transform = `rotate(${rotationDeg}deg)`;
      
    });
  }

  return (
    <div className="home">
      <div className="topSide">
        <Link to="pokemon"><button className="getStartedBtn">Get Started</button></Link>
      </div>
      <div className="midSide">
        <div className="container">
          <Link to="/itemCategory"><button className="itemCategoryBtn">Item Category</button></Link>
          <img id="rotatingImg" src={closePoke} />
          <Link to="/gender"><button className="genderBtn">Gender</button></Link>
        </div>
      </div>
      <div className="bottomSide">
        <div>
          <Link to="/item"><button>Item</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
