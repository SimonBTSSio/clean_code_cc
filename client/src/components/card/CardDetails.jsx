import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState} from "react";
import CardService from "../../services/CardService.js";
import moment from "moment";

const CardDetails = () => {
    const [card, setCard] = useState({});
    const [userAnswer, setUserAnswer] = useState("");
    const id = useParams().id;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        CardService.getCard(id).then((response) => {
            setCard(response);
        });
    }, [id]);

    const updatedAtMoment = moment(card.updatedAt);
    const currentMoment = moment();

    const isOneDayPassed = useMemo(() => {
        return currentMoment.diff(updatedAtMoment, 'days') > 0;
    }, [currentMoment, updatedAtMoment]);

    const isCardAnswered = useMemo(() => {
        return card.category !== "FIRST" && !isOneDayPassed;
    }, [card.category, isOneDayPassed]);

    const handleAnswerChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleSubmit = () => {
        if (isCardAnswered) {
            if (userAnswer === card.answer) {
                setSuccess("Bonne réponse !");
                setError("")
                CardService.answerCard(id, true);
            } else {
                setError("Mauvaise réponse ! La bonne réponse est : " + card.answer);
                setSuccess("")
                CardService.answerCard(id, false);
            }
            setUserAnswer("");
            setSubmitted(true);
        } else {
            setError("Vous avez déjà répondu à cette question aujourd'hui !");
        }
    };

    const handleForceSubmit = () => {
        CardService.answerCard(id, true);
        setSuccess("Votre fiche est passé à la catégorie supérieur !");

    }

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
            {
                submitted ? (
                    <div>
                        <p>
                            Vous voulez quand même valider la fiche ?
                        </p>
                        <button onClick={handleForceSubmit}>Forcer validation</button>
                    </div>
                ) : null
            }
        </div>
    );
};

export default CardDetails;