import { useNavigate } from "react-router-dom";


export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <div onClick={() => navigate(-1)}>A seguir cocinando</div>
            <h2>Hola soy Duvan</h2>
        </div>
    )
}