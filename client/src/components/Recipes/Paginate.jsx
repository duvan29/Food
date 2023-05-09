import React from "react";
import style from './Paginate.module.css'
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../../redux/actions/actions"

export default function Paginate({ cantPages }) {
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  function next() {
    dispatch(nextPage());
  }
  function prev() {
    dispatch(prevPage());
  }

  return (
    <div className={style.contenedorPaginate}>
      {numPage > 1 ? (
        <div>
          <div onClick={prev} className={style.divArrow}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="15 6 9 12 15 18" /></svg></div>
        </div>
      ) : null}

      <h2>{numPage}</h2>
      {numPage < cantPages ? (
        <div>
          <div onClick={next} className={style.divArrow}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="9 6 15 12 9 18" /></svg></div>
        </div>
      ) : null}
    </div>
  );
}