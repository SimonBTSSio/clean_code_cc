import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import TagService from "../../services/TagService.js";

const TagList = () => {

    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        try {
            TagService.getTags().then((response) => {
                setTags(response);
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des tags :', error.message);
        }
    }, []);

    if (!tags) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <button onClick={() => navigate('/create-tag')}>Créer un tag</button>
            <button onClick={() => navigate('/create-card')}>Créer une fiche</button>
            <h2>Tag List</h2>
            {tags.length ? tags.map((tag) => (
                <p className='tag' key={tag.id} onClick={ ()=> navigate(`/cards-by-tag/${tag.id}`) }>{tag.name}</p>
            )) : <p>Aucun tag</p>}
        </div>
    );
}

export default TagList;