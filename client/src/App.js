import "./App.css";
import Lading from "./components/LandingPage/Landing";
import HomePage from "./components/HomePage/Home";
import Deatil from "./components/DetailPage/Detail";
import NotFound from "./components/NotFound/NotFound";
import FormPage from "./components/FormPage/Form";
import React from "react";
import axios from "axios";
import { allRecipes, allDiets } from "./redux/actions/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes`).then((results) => {
      dispatch(allRecipes(results.data));
    });
  }, [dispatch]);

  useEffect(() => {
    axios.get(`http://localhost:3001/diets`).then((results) => {
      dispatch(allDiets(results.data));
    });
  }, [dispatch]);


  const createRecipeData = () => {
    axios.get(`http://localhost:3001/recipes`).then((results) => {
      dispatch(allRecipes(results.data));
    });
  }

  const showDetail = () => {
    axios.get(`http://localhost:3001/recipes`).then((results) => {
      dispatch(allRecipes(results.data));
    });
  }
  
  useEffect(() => {
    createRecipeData();
  }, []);

  useEffect(() => {
    showDetail();
  }, []);

  const location = useLocation();
  const background = location.state && location.state.background


  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/" element={<Lading />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location && (
      <Routes>
        <Route path='/detail/:id' element={<Deatil showDetail={showDetail}/>} />
      </Routes>)}
      {location && (
      <Routes>
        <Route path="/formPage" element={<FormPage createRecipeData={createRecipeData}/>} />
      </Routes>)}
      
    </div>
  );
}

export default App;
