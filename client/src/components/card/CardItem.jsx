import {useEffect, useState} from "react";
import TagService from "../../services/TagService.js";
import {useNavigate} from "react-router-dom";

const CardItem = ({ cardData }) => {
    const { id, question, category } = cardData;
    const [tags, setTags] = useState([]);
    const tag = tags.find((tag) => tag.id === cardData.tagId)?.name;
    const navigate = useNavigate();

    useEffect(() => {
        TagService.getTags().then((response) => {
            setTags(response);
        });
    }, []);

    return (
        <div className="card-item" onClick={()=>navigate(`/cards/${id}`)}>
            <p>Question: {question}</p>
            <p>Category: {category}</p>
            {tag && <p>Tag: {tag}</p>}
        </div>
    );
};

export default CardItem;
