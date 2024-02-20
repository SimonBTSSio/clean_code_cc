import { useState } from 'react';
import {useNavigate} from "react-router-dom";

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
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête.');
            }

            const data = await response.json();

            console.log('Réponse du serveur:', data);

            setEmail('');
            setPassword('');
            navigate('/login')
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
