import {
  ALL_RECIPES,
  SEARCH_RECIPES,
  NEXT_PAGE,
  PREV_PAGE,
  RESET_NUM_PAGE,
  RESET_PAGE,
  ALL_DIETS,
  FILTER_ORIGIN,
  ORDER_HEALTHSCORE,
  ORDER_DIET,
  FILTER_DIETS,
} from "./types";
import axios from "axios";

export function resetPage() {
  return {
    type: RESET_PAGE,
  };
}

export function prevPage() {
  return {
    type: PREV_PAGE,
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE,
  };
}

export function resetNumPage() {
  return {
    type: RESET_NUM_PAGE,
  };
}

export function allRecipes(recipes) {
  return {
    type: ALL_RECIPES,
    payload: recipes,
  };
}

export function searchRecipes(recipes) {
  return {
    type: SEARCH_RECIPES,
    payload: recipes,
  };
}

export function allDiets(diets) {
  return {
    type: ALL_DIETS,
    payload: diets,
  };
}


export function addRecipe(payload) {
  
  console.log(payload);
  return async function(dispatch) {
      try {
          let response = await axios.post(`http://localhost:3001/recipes`, payload);
          return response;
      } catch (error) {
          console.log(error)
    }
  }
}

export function dietsFilter(diets) {
  return {
    type: FILTER_DIETS,
    payload: diets,
  };
}

export function originFilter(caso) {
  return {
    type: FILTER_ORIGIN,
    payload: caso,
  };
}

export function dietOrder(caso) {
  return {
    type: ORDER_DIET,
    payload: caso,
  };
}

export function healtScoreOrder(caso) {
  return {
    type: ORDER_HEALTHSCORE,
    payload: caso,
  };
}
