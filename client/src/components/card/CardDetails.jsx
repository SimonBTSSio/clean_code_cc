import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardService from "../../services/CardService.js";

const CardDetails = () => {
    const [card, setCard] = useState({});
    const [userAnswer, setUserAnswer] = useState("");
    const id = useParams().id;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        CardService.getCard(id).then((response) => {
            setCard(response);
        });
    }, [id]);

    const handleAnswerChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleSubmit = () => {
        if (userAnswer === card.answer) {
            setSuccess("Bonne réponse !");
            setError("")
            CardService.answerCard(id, true);
        } else {
            setError("Mauvaise réponse !");
            setSuccess("")
            CardService.answerCard(id, false);
        }
        setUserAnswer("");
    };

    return (
        <div className="card-details">
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
            <h3>Question: {card.question}</h3>
            <label>
                Réponse:
                <input
                    type="text"
                    value={userAnswer}
                    onChange={handleAnswerChange}
                />
            </label>
            <button onClick={handleSubmit}>Soumettre</button>
        </div>
    );
};

export default CardDetails;