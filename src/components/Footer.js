import React from "react";

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
            <li>Get Started</li>
            <li>Item Category</li>
            <li>Gender</li>
            <li>Item</li>
            <li>Type</li>
            <li>Evo Chain</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
