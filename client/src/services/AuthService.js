export default class AuthService {
  static async login(email, password) {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);

      if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  }

    static async register(email, password) {
        const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
        throw new Error(data.message);
        }
        return data;
    }

    static async logout() {
        localStorage.removeItem('token');
    }
}