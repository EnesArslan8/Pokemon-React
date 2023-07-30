import React from "react";
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="container">
          <h4>Pokemon API</h4>
          <p>
            Here you can use pokemon information and description. You can search
            about everything Pokemon. This website created PokemonAPI.Here you
            can use pokemon information and description. You can search about
            everything Pokemon. This website created PokemonAPI.
          </p>
        </div>
      </div>
      <div className="footerLinks">
        <div className="container">
          <h4>Discover</h4>
          <ul>
            <Link to={"/pokemon"}><li>Get Started</li></Link>
            <Link to={"itemCategory"}><li>Item Category</li></Link>
            <Link to={"/gender"}><li>Gender</li></Link>
            <Link to={"/item"}><li>Item</li></Link>
            <Link to={"/type"}><li>Type</li></Link>
            <Link to={"/reigon"}><li>Reigon</li></Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
