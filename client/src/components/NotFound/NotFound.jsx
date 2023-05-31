import { Link } from "react-router-dom";
import style from "./notFound.module.css"


export default function NotFound() {
    return (
        <div className={style.contenedor}>
            <h1>404</h1>
            <h2>Opps you left the restaurant.....</h2>
            <Link to={"/home"}>
                <div class={style.botton}>COME BACK</div>
            </Link>
        </div>
    )
}