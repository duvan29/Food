import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from './Detail.module.css'

const Deatil = ({ showDetail }) => {
  const { id } = useParams();
  const [recipe, setRecipes] = useState([]);

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

  let diet = []
  if(recipe.Diets){
    diet = recipe.Diets.map((e) => e.name)
  }
  return (
    <div className={style.conteiner}>
    <div className={style.capa}>
      {recipe.name ? (
        <div className={style.conteinerCard}>
          <div className={style.titleAndX}>
          <Link to="/home" onClick={() => showDetail()} className={style.equisX}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="10" y1="12" x2="20" y2="12" /><line x1="10" y1="12" x2="14" y2="16" /><line x1="10" y1="12" x2="14" y2="8" /><line x1="4" y1="4" x2="4" y2="20" /></svg></Link>
          </div>  
          <div className={style.propiedades}>
              <div className={style.propiedad2}>
                <h1>ID: {id}</h1>
                <img src={recipe.image} alt="" />
                <h1 className={style.titleId}>{recipe.name}</h1>
              </div>
            <div className={style.otrasProps}>
            <h2 className={style.titleSumaryAndSteps}> Diets </h2>
            {recipe.dietTypes ? <h2 className={style.dietsAndHs} >{recipe.dietTypes.join(" ")}</h2> : <h2 className={style.dietsAndHs}>{diet.join(" ")} </h2>}
            <h2 className={style.dietsAndHs} ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heartbeat" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" /><path d="M3 13h2l2 3l2 -6l1 3h3" />
            </svg> {recipe.healthScore}%</h2>
            <h2 className={style.titleSumaryAndSteps}> Summary </h2>
            <h2 className={style.summary}>{removeTags(recipe.summary)}</h2>
            <h2 className={style.titleSumaryAndSteps}>Steps </h2>
            { recipe.steps ? recipe.steps.map((name) => {
            return (
              <div>
                <div className={style.step}> {name.number}. {name.step}</div>
              </div>        
            );
          }) : <div className={style.step}> {recipe.stepByStep}</div> } 
          </div>
          </div>
          </div>
      ) : (
        <h3><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="12" y1="6" x2="12" y2="3" />
  <line x1="16.25" y1="7.75" x2="18.4" y2="5.6" />
  <line x1="18" y1="12" x2="21" y2="12" />
  <line x1="16.25" y1="16.25" x2="18.4" y2="18.4" />
  <line x1="12" y1="18" x2="12" y2="21" />
  <line x1="7.75" y1="16.25" x2="5.6" y2="18.4" />
  <line x1="6" y1="12" x2="3" y2="12" />
  <line x1="7.75" y1="7.75" x2="5.6" y2="5.6" />
</svg></h3>
      )}
      </div>
      </div>
  );
};

export default Deatil;