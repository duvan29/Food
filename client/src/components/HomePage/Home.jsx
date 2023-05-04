import Recipes from "../Recipes/Recipes";
import Nav from "../NavPage/NavPage";
import Exit from '../Exit/Exit'


const HomePage = () => {
    return (
      <div>
        <Exit/>
        <Nav/>
        <Recipes/>
      </div>
    );
  }; 

export default HomePage;