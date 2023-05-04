import "./App.css";
import Lading from "./components/LandingPage/Landing";
import HomePage from "./components/HomePage/Home";
import Deatil from "./components/DetailPage/Detail";
import NotFound from "./components/NotFound/NotFound";
import FormPage from './components/FormPage/Form'
import About from './components/About/About'
import React from "react";
import axios from "axios";
import { allRecipes } from "./redux/actions/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes`).then((results) => {
      dispatch(allRecipes(results.data));
    });
  }, [dispatch]);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Lading />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/detail/:id' element={<Deatil />}/>
        <Route path="/formPage" element={<FormPage />} />
        <Route path="/About" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
