import { Link, useLocation } from "react-router-dom";
import style from './Recipe.module.css'

const Recipe = ({ name, image, dietTypes, id, healthScore, Diets }) => {
  let diet = []
  if(Diets){
    diet = Diets.map((e) => e.name)
  }
  const { pathname } = useLocation();
  return (
    <div className={style.cardDiv}>
      <h1 className={style.cardName}>{name}</h1>
      <img src={image} alt="" className={style.imgCard}/>
      <h3 className={style.hs}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heartbeat" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" /><path d="M3 13h2l2 3l2 -6l1 3h3" /></svg> {healthScore}%</h3>
      {dietTypes ? <h2 className={style.cardID}>{dietTypes.join(" ")} </h2> : <h2 className={style.cardID}>{diet.join(" ")} </h2>}
      
      <Link to={`/detail/${id}`} className={style.link} state={{background: pathname}}>
        <h3 className={style.masInfo}>Recipe</h3>
      </Link>

    </div>
  );
};

export default Recipe;