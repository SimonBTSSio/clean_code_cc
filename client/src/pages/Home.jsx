import {useNavigate} from "react-router-dom";
import HomeUser from "./HomeUser.jsx";

const Home = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        !token ? (
            <>
                <div>
                    <h1>Welcome to the Home Page!</h1>
                </div>
                <button onClick={() => navigate('/register')}>Créer un compte</button>
                <button onClick={() => navigate('/login')}>Connectez-vous</button>
            </>) : <HomeUser />
    );
};

export default Home;
