import React from "react";
import { Typography, Divider } from "@mui/material";
import closePoke from "../img/closePoke.png";
import { Link } from "react-router-dom";

function Header() {
  const style = {
    margin:"0 20px 0 0 ",
  };
  return (
    <div className="header">
      <Link to={"/"}>
        <div className="logoArea">
          <img className="logo" src={closePoke} />
        </div>
      </Link>

      <div className="linkArea">
        <div className="link">
          <Link to={"/pokemon"}>
            <h4>Pokemon</h4>
          </Link>
        </div>
        <Divider color="red" sx={style}  orientation="vertical"></Divider>
        <div className="link">
          <Link to={"/type"}>
            <h4> Type</h4>
          </Link>
        </div>
        <Divider color="red" sx={style} orientation="vertical"></Divider>
        <div className="link">
          <Link to={"/pokemon"}>
            <h4> Evo Chain</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
