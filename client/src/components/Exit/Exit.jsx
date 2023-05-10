import { Link, useLocation } from "react-router-dom";
import style from './Exit.module.css';


export default function NotFound() {
    const { pathname } = useLocation();
    return (
        <div className={style.contendor}>
            <div className={style.link}>
                <Link to={"/formPage"} state={{background: pathname}}>
                    <div  className={style.rutas}>CREATE RECIPE</div>
                </Link>
            </div>
            
            <div className={style.link}>
                <Link to={"/"}>
                    <div  className={style.rutas}>EXIT</div>
                </Link>
            </div>
            
        </div>
    )
}