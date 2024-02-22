import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from '../services/AuthService.js';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await AuthService.register(email, password);
            setEmail('');
            setPassword('');
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error.message);
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} required />
                </label>
                <br />
                <label>
                    Mot de passe:
                    <input type="password" value={password} onChange={handlePasswordChange} required />
                </label>
                <br />
                <button type="submit">Créer votre compte</button>
            </form>
        </div>
    );
};

export default Register;
