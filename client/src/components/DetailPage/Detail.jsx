import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Deatil = () => {
  const { id } = useParams();
  const [recipe, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios(`http://localhost:3001/recipes/${id}`).then(
      ({ data }) => {
        if (data.name) {
            setRecipes(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setRecipes([]);
  }, [id]);

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
}


  return (
    <div >
      {recipe.name ? (
        <div>
          <div onClick={() => navigate(-1)}> HOME</div>
          <h1>{id}</h1>
          <h1>{recipe.name}</h1>
          <img src={recipe.image} alt="" />
          <h2>{recipe.dietTypes.join(" ")}</h2>
          <h2>{recipe.healthScore}</h2>
          <h2>{recipe.summary && removeTags(recipe.summary)}</h2>
          {recipe.steps.map((name) => {
          return (
            <div>
              <div>{name.number}. {name.step}</div>
            </div>
            
          );
        })}
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Deatil;