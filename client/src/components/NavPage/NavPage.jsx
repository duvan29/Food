import style from './Nav.module.css'
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  allDiets,
  dietsFilter,
  originFilter,
  dietOrder,
  resetPage,
  healtScoreOrder,
} from "../../redux/actions/actions";
import axios from "axios";

const Nav = () => {
  const dispatch = useDispatch();
  const [ aux, setAux ] = useState(false);
  const [ aux2, setAux2 ] = useState(false);
  const [ aux3, setAux3 ] = useState(false);
  const [ onOff, setOnOff ] = useState([]);
  
  
  const onClick = () => {
    setOnOff([])
    dispatch(resetPage());
  };

  useEffect(() => {
    dispatch(dietsFilter(onOff))
  }, [dispatch, onOff]);

  const handlefilter = (diets) => {
    if (onOff.includes(diets)) {
      let algo = onOff.filter(diet => diet !== diets)
      setOnOff(algo)
    }else{
      setOnOff([...onOff, diets])
    }
  };

  const handleOrigi = (caso) => {
    dispatch(originFilter(caso));
  };

  const hadleDiet = (caso) => {
    dispatch(dietOrder(caso));
  };

  const hadleHealt = (caso) => {
    dispatch(healtScoreOrder(caso));
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/diets`).then((results) => {
      dispatch(allDiets(results.data));
    });
  }, [dispatch]);

  const { Diets } = useSelector((state) => state);

  return (
    <>
    { aux3 ? <div className={style.container} >
      <div className={style.arrow2} onClick={() => {setAux3(!aux3)}}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="15 6 9 12 15 18" /></svg></div>
      <div className={style.input}>
        <SearchBar />
      </div>
      <div className={style.divOrder}> Diets </div>
      <div className={style.conteinerDiets}>
        {Diets.map(({ name, id }) => {
          return (
            <div key={id} value={name} className={`${style.diets}  ${onOff.includes(name) ? style.dietsActive : ""}`} onClick={() => handlefilter(name)}>
              {name}
            </div>
          );
        })}
      </div>

        <div className={style.divOrder}>Order</div>
      <div className={style.containerOrder}>
        <div className={style.order}>
        { aux ? <div onClick={() => {hadleHealt("A");setAux(!aux)}}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sort-ascending-numbers" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 15l3 3l3 -3" /><path d="M7 6v12" /><path d="M17 3a2 2 0 0 1 2 2v3a2 2 0 1 1 -4 0v-3a2 2 0 0 1 2 -2z" /><circle cx="17" cy="16" r="2" /><path d="M19 16v3a2 2 0 0 1 -2 2h-1.5" /></svg><h3>Healt Score</h3></div>
        : <div onClick={() => {hadleHealt("D");setAux(!aux)}}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sort-descending-numbers" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 15l3 3l3 -3" /><path d="M7 6v12" /><path d="M17 14a2 2 0 0 1 2 2v3a2 2 0 1 1 -4 0v-3a2 2 0 0 1 2 -2z" /><circle cx="17" cy="5" r="2" /><path d="M19 5v3a2 2 0 0 1 -2 2h-1.5" /></svg><h3>Healt Score</h3></div>}
  
        </div>
  
        <div className={style.order}>
        { aux2 ? <div onClick={() => {hadleDiet("A");setAux2(!aux2)}}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sort-ascending-letters" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" /><path d="M19 21h-4l4 -7h-4" /><path d="M4 15l3 3l3 -3" /><path d="M7 6v12" /></svg><h3>Name</h3></div>
        : <div onClick={() => {hadleDiet("D");setAux2(!aux2)}}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sort-descending-letters" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 21v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" /><path d="M19 10h-4l4 -7h-4" /><path d="M4 15l3 3l3 -3" /><path d="M7 6v12" /></svg><h3>Name</h3></div>}
          
        </div>
        </div>


        <div className={style.containerDb}>
          <div className={style.divDb} onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"/></svg><h3>ALL</h3></div>
          <div className={style.divDb} onClick={() => {handleOrigi("A")}}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12" /></svg> <h3>API</h3> </div>
          <div className={style.divDb} onClick={() => {handleOrigi("D")}}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-database" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><ellipse cx="12" cy="6" rx="8" ry="3"></ellipse><path d="M4 6v6a8 3 0 0 0 16 0v-6" /><path d="M4 12v6a8 3 0 0 0 16 0v-6" /></svg> <h3>DATA</h3></div>
        </div>

      <div className={style.buttonReset} onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg> <h3>Reset</h3></div>
    
    </div> : <div className={style.arrow} onClick={() => {setAux3(!aux3)}}> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="9 6 15 12 9 18" /></svg></div>}
    </>
  );
};

export default Nav;