import {useEffect, useState} from 'react';
import CardService from "../../services/CardService.js";
import TagService from "../../services/TagService.js";
import {useNavigate} from "react-router-dom";

const CreateCard = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            TagService.getTags().then((response) => {
                setTags(response);
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des tags :', error.message);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            CardService.createCard( question, answer, 'FIRST', tag );
            navigate('/cards');
        } catch (error) {
            console.error('Erreur lors de la création de la carte :', error.message);
        }
        setQuestion('');
        setAnswer('');
        setTag('');
    };

    return (
        <div className="create-card-container">
            <h2>Create a New Card</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Question:</label>
                <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />

                <label htmlFor="answer">Answer:</label>
                <textarea
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                />
                <label htmlFor="tag">Tag:</label>
                {
                    tags.length ? <select
                        id="tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a Tag</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select> : <>
                        <p>No tags available</p>
                        <button onClick={() => navigate('/create-tag')}>Create a tag</button>
                    </>
                }
                <button type="submit">Create Card</button>
            </form>
        </div>
    );
};

export default CreateCard;
