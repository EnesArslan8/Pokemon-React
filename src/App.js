import "./App.css";
import { Route, Routes,Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import Footer from "./components/Footer";
import Type from "./components/Type";
import Gender from "./components/Gender";
import ItemCategory from "./components/ItemCategory";
import Item from "./components/Item";

function App() {
  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/type" element={<Type/>}/>
        <Route path="/pokemon" element={<Pokemon/>}/>
        <Route path="/itemCategory" element={<ItemCategory/>}/>
        <Route path="/gender" element={<Gender/>}/>
        <Route path="/item" element={<Item/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
