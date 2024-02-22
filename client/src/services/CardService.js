export default class CardService {

    static async getCards() {
        const response = await fetch('http://localhost:8000/cards', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    }

    static async getCard(id) {
        const response = await fetch(`http://localhost:8000/cards/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    }

    static async createCard(question, answer, category, tag) {

        const userId = localStorage.getItem('userId');
        const tagId = parseInt(tag);

        const response = await fetch('http://localhost:8000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ question, answer, category, userId, tagId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    }

    static async answerCard(cardId, isValid) {
        const response = await fetch(`http://localhost:8000/cards/${cardId}/answer`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ isValid }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    }
}