import "./App.css";
import { Route, Routes,Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import Footer from "./components/Footer";
import Type from "./components/Type";

function App() {
  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/type" element={<Type/>}/>
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
