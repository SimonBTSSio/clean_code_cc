import AuthService from "../services/AuthService.js";
import {useNavigate} from "react-router-dom";

const HomeUser = () => {

    const handleLogout = () => {
        try {
            AuthService.logout();
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error.message);
        }
    }

    const navigate = useNavigate();

    return (
        <div>
            <div>
                <h1>Bienvenue sur votre espace personnel</h1>
                <button onClick={ ()=> navigate('/cards') }>Voir mes fiches</button>
                <button onClick={ () => navigate('/tags') }>Voir mes tags</button>
            </div>
            <button onClick={ handleLogout }>Se déconnecter</button>
        </div>
    );
}

export default HomeUser;