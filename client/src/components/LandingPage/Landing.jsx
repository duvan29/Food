import style from './Linding.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'



const Lading = () => {
    return (
        <div className={style.bg}>
            <div className={style.Text}>
                <a href="https://www.linkedin.com/in/duvan-serrano/" target="_blank" rel="noopener noreferrer">
                    <div> By Duvan Serrano </div>
                </a>
                <h1>Welcome</h1>
                <hr/>
                <h2>Make your favorite recipe</h2>  
                <div>
                    <Link to="/home"><div class={style.botton}> <FontAwesomeIcon icon={faUtensils}/> LET'S GO</div></Link>
                </div>
            </div>         
        </div>
    );
};

export default Lading;
