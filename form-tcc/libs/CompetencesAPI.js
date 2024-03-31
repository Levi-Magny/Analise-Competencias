
export default class CompetencesApi {
    constructor() {
        this.user = process.env.NEXT_PUBLIC_API_USER;
        this.password = process.env.NEXT_PUBLIC_API_PASSWORD;
    }

    async getToken() {
        let response = await fetch('http://ec2-18-228-24-54.sa-east-1.compute.amazonaws.com//token/', {
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

    async updateToken(refreshToken){
        let response = await fetch('http://ec2-18-228-24-54.sa-east-1.compute.amazonaws.com//token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': refreshToken })
        });

        let data = await response.json();

        return {
            responseStatus: response.status,
            tokens: data
        }
    }

    async get_competences(accessToken) {
        let response = await fetch('http://ec2-18-228-24-54.sa-east-1.compute.amazonaws.com//api/listar-competencias/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        let data = await response.json();
        // console.log("data:", data)
        return {
            responseStatus: response.status,
            competences: data
        }
    }

    async get_docentes(accessToken) {
        let response = await fetch('http://ec2-18-228-24-54.sa-east-1.compute.amazonaws.com//api/listar-docentes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        let data = await response.json();
        
        return {
            responseStatus: response.status,
            docentes: data
        }
    }

    convert_object(obj) {
        let listaConvertida = [];

        for (const [competencia, indices] of Object.entries(obj.compts)) {
            if (indices) {
                const [iIndex, jIndex] = indices;
                
                listaConvertida.push({
                    docente: obj.docente.id,
                    competencia: parseInt(competencia, 10)+1,
                    materia: obj.materia,
                    i_index: iIndex,
                    j_index: jIndex
                });
            }
        }

        return JSON.stringify(listaConvertida);
    }

    async insert_blooms(accessToken, object) {
        let req_body = this.convert_object(object);
        console.log(req_body);
        let response = await fetch('http://ec2-18-228-24-54.sa-east-1.compute.amazonaws.com//api/inserir-blooms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: req_body
        });
        let data = await response.json();
        console.log(data);
    }
}