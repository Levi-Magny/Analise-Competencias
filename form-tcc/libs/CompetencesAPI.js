import dotenv from 'dotenv';
dotenv.config();

export default class CompetencesApi {
    constructor() {
        this.user = process.env.API_USER;
        this.password = process.env.API_PASSWORD;
    }

    async getToken() {
        let response = await fetch('https://web-production-9a4d.up.railway.app/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': this.user, 'password': this.password })
        });

        let data = await response.json();
        // console.log('Token:', data, "status:", response.status);
        return {
            responseStatus: response.status,
            tokens: data
        }

    }

    async get_competences(acessToken) {
        let response = await fetch('https://web-production-9a4d.up.railway.app/api/listar-competencias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acessToken}`
            }
        });

        let data = await response.json();
    }
}