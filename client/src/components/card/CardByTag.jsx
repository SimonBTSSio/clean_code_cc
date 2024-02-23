import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CardService from "../../services/CardService.js";
import CardItem from "./CardItem.jsx";

const CardByTag = () => {
    const [cards, setCards] = useState([]);
    const tagId = useParams().id;

    useEffect(() => {
        CardService.getCards().then((response) => {
            console.log(response.filter(card => card.tagId === parseInt(tagId)));
            setCards(response.filter(card => card.tagId === parseInt(tagId)));
        });
    }, [tagId]);

    if (!cards) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1> Cards by tag</h1>
            <div>
                {cards.length ? cards.map((card) => (
                    <CardItem key={card.id} cardData={card}/>
                )) : <p>Aucune carte pour le tag choisis</p>}
            </div>
        </div>
    )
}

export default CardByTag