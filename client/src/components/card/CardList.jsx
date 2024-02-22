import CardItem from './CardItem';
import {useEffect, useState} from "react";
import CardService from "../../services/CardService.js";
import {useNavigate} from "react-router-dom";

const CardList = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);

    useEffect( () => {
        CardService.getCards().then((response) => {
            setCards(response);
        });
    }, []);

    if (!cards) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <button onClick={() => navigate('/create-card')}>Créer une fiche</button>
            <h2>Card List</h2>
            {cards.length ? cards.map((card) => (
                <CardItem key={card.id} cardData={card}/>
            )) : <p>Aucune carte</p>}
        </div>
    );
};

export default CardList;