export default class TagService {
    static async getTags() {
        const response = await fetch('http://localhost:8000/tags', {
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

    static async createTag(name) {
        console.log(name);
        const response = await fetch('http://localhost:8000/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    }
}