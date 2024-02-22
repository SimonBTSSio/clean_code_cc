import { useState } from 'react';
import TagService from "../../services/TagService.js";
import {useNavigate} from "react-router-dom";

const CreateTag = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            TagService.createTag( name );
            navigate('/tags');
        } catch (error) {
            console.error('Erreur lors de la création du tag :', error.message);
        }
        setName('');
    };

    return (
        <div className="create-tag-container">
            <h2>Create a New Tag</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <button type="submit">Create Tag</button>
            </form>
        </div>
    );
}

export default CreateTag;