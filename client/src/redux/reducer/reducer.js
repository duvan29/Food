/* eslint-disable array-callback-return */
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
} from "../actions/types"

const inicialState = {
  recipes: [],
  originRecipes: [],
  numPage: 1,
  Diets: [],
};

export default function rootReducer(state = inicialState, { type, payload }) {
  switch (type) {
    case ALL_RECIPES:
      return {
        ...state,
        originRecipes: payload,
        recipes: payload,
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        numPage: state.numPage + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case RESET_NUM_PAGE:
      return {
        ...state,
        numPage: 1,
      };
    case RESET_PAGE:
      return {
        ...state,
        recipes: state.originRecipes,
        numPage: 1,
      };
    case ALL_DIETS:
      return {
        ...state,
        Diets: payload,
      };
    case FILTER_DIETS:
      let dietFilt = [];
      for(const e of payload) {
        dietFilt = state.originRecipes.filter((recipe) => {
        if (recipe.dietTypes && e !== "Reset") {
          return recipe.dietTypes.includes(e);
        }
      });    
      }
      return {
        ...state,
        recipes: payload.length === 0 ? state.originRecipes : dietFilt
      };
    case FILTER_ORIGIN:
      let orgFilt = state.originRecipes.filter((recipe) => {
        if (payload === "A" && payload !== "Reset") {
          return recipe.id <= 1095753;
        } else if (payload === "B" && payload !== "Reset") {
          return recipe.id > 1095753;
        }
      });
      if (payload === "Reset") orgFilt = state.originRecipes;
      return {
        ...state,
        recipes: orgFilt,
      };
    case ORDER_DIET:
      let orderDiet = [...state.recipes].sort((a, b) => {
        if (payload === "A" && payload !== "Reset") {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        } else if (payload === "D" && payload !== "Reset") {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      if (payload === "Reset") orderDiet = state.originRecipes;
      return {
        ...state,
        recipes: orderDiet,
      };
      case ORDER_HEALTHSCORE:
        let orderHealtScore = [...state.recipes].sort((a, b) => {
          if (payload !== "Reset") {
            if (payload === "A" && a.healthScore > b.healthScore) {
              return 1;
            } else if (payload === "A" && a.healthScore < b.healthScore) {
              return -1;
            } else if (payload === "D" && a.healthScore < b.healthScore) {
              return 1;
            } else if (payload === "D" && a.healthScore > b.healthScore) {
              return -1;
            }
          }
        });
        if (payload === "Reset") orderHealtScore = state.originRecipes;
        return {
          ...state,
          recipes: orderHealtScore,
        };

    default:
      return { ...state };
  }
}