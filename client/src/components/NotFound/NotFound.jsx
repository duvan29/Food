import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <div>
            <h1>Oops! parece que estas perdido.</h1>
            <Link to={"/home"}>
                <h3>Come back</h3>
            </Link>
        </div>
    )
}