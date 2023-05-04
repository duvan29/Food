import { Link } from "react-router-dom";

const Recipe = ({ name, image, dietTypes, id }) => {
  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt="" />
      <h2>{dietTypes.join(" ")} </h2>
      <Link to={`/detail/${id}`}>
        <h3>Detail</h3>
      </Link>
    </div>
  );
};

export default Recipe;