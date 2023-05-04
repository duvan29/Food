import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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

  const onClick = () => {
    dispatch(resetPage());
  };

  const handlefilter = (event) => {
    dispatch(dietsFilter(event.target.value));
  };

  const handleOrigi = (event) => {
    dispatch(originFilter(event.target.value));
  };

  const hadleDiet = (event) => {
    dispatch(dietOrder(event.target.value));
  };

  const hadleHealt = (event) => {
    dispatch(healtScoreOrder(event.target.value));
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/diets`).then((results) => {
      dispatch(allDiets(results.data));
    });
  }, [dispatch]);

  const { Diets } = useSelector((state) => state);

  return (
    <div>
      <div>
        <select onChange={hadleHealt}>
          <option value="Reset">Order by healtScore:</option>
          <option value="A">Upward</option>
          <option value="D">Falling</option>
        </select>
      </div>
      <div>
        <select onChange={hadleDiet}>
          <option value="Reset">Order by Name:</option>
          <option value="A">Upward</option>
          <option value="D">Falling</option>
        </select>
      </div>
      <div>
        <select onChange={handleOrigi}>
          <option value="Reset">Filter by origin:</option>
          <option value="A">Api</option>
          <option value="B">DataBase</option>
        </select>
      </div>
      <select onChange={handlefilter}>
        <option value="Reset">Filter by Diets:</option>
        {Diets.map(({ name, id }) => {
          return (
            <option key={id} value={name}>
              {name}
            </option>
          );
        })}
      </select>
      <Link to="/formPage" ><button>FormPage</button></Link>
      <SearchBar />
      <button onClick={onClick}>Reset</button>
    </div>
  );
};

export default Nav;