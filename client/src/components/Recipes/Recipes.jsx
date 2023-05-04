import Recipe from '../Recipe/Recipe'
import { useSelector } from "react-redux";
import Paginate from "./Paginate";

const Recipes = () => {
  const { numPage, recipes } = useSelector((state) => state);
  let desde = (numPage - 1) * 9;
  let hasta = numPage * 9;

  let cantPages = Math.floor(recipes.length / 9);

  let viewCharacters = recipes?.slice(desde, hasta);

  return (
    <div>
      <div>
        {viewCharacters.map(({ id, name, image, dietTypes }) => {
          return (
            <Recipe
              key={id}
              id={id}
              name={name}
              dietTypes={dietTypes}
              image={image}
            />
          );
        })}
      </div>
      <Paginate cantPages={cantPages}></Paginate>
    </div>
  );
};

export default Recipes;