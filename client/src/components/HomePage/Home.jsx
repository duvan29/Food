import Recipes from "../Recipes/Recipes";
import Nav from "../NavPage/NavPage";
import Exit from '../Exit/Exit'
import style from './Home.module.css'


const HomePage = () => {
    return (
      <div className={style.bg}>
        <div className={style.Text}>
          <Exit/>
          <div className={style.flex}>
              <Nav/>
              <Recipes/>
          </div>
        </div>
      </div>
    );
  }; 

export default HomePage;