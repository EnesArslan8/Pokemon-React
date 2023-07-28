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
          <button className="itemCategoryBtn">Item Category</button>
          <img id="rotatingImg" src={closePoke} />
          <button className="genderBtn">Gender</button>
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
