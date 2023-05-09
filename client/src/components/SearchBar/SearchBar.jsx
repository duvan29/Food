import { searchRecipes } from "../../redux/actions/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetNumPage } from "../../redux/actions/actions";
import style from './Search.module.css'

const SearchBar = () => {
  const dispatch = useDispatch();

  const onSearch = async (event) => {
    try {
      const name = event.target.value
      const { data } = await axios(`http://localhost:3001/recipes?name=${name}`);
      if (data[0].name) {
        dispatch(searchRecipes(data));
        dispatch(resetNumPage())
      }
    } catch (error) {
      dispatch(searchRecipes([]));
    }
  };

  return (
    <div>
      <input className={style.input} type="search" onChange={onSearch} placeholder="Search Recipe..."/>
    </div>
  );
}; 

export default SearchBar;


