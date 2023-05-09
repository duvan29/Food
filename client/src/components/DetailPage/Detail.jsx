import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from './Detail.module.css'

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
          window.alert("Recipe not found");
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
    <div className={style.detail}>
      {recipe.name ? (
        <div className={style.container}>
          <div className={style.containerIIN}>
            <div onClick={() => navigate(-1)}> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="10" y1="12" x2="20" y2="12" /><line x1="10" y1="12" x2="14" y2="16" /><line x1="10" y1="12" x2="14" y2="8" /><line x1="4" y1="4" x2="4" y2="20" /></svg></div>
            <h1>ID: {id}</h1>
            <img src={recipe.image} alt="" />
            <h1>{recipe.name}</h1>
          </div>
          <div className={style.otros}>
            <h2>Diets: {recipe.dietTypes.join(" ")}</h2>
            <h2><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heartbeat" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" />
  <path d="M3 13h2l2 3l2 -6l1 3h3" />
</svg>{recipe.healthScore}%</h2>
            <h2>Summary: {removeTags(recipe.summary)}</h2>
            <div>Steps: </div>
            {recipe.steps.map((name) => {
            return (
              <div>
                <div> {name.number}. {name.step}</div>
              </div>        
            );
          })}
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Deatil;