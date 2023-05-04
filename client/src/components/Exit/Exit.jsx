import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <div>
            <Link to={"/"}>
                <h3>Exit</h3>
            </Link>
            <Link to={'/About'}>
                <h3>ME</h3>
            </Link>
        </div>
    )
}