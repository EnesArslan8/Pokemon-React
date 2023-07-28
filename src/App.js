import "./App.css";
import { Route, Routes,Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pokemon" element={<Pokemon/>}/>
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
