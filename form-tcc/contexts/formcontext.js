'use client';
import CompetencesApi from '../libs/CompetencesAPI';

import { createContext, useContext, useState } from "react";

export const FormContext = createContext({});

export const FormProvider = ({children}) => {
    const [formData, setFormData] = useState({'materia': "0"})
    const [docente, setDocente] = useState("")
    const [authTokens, setAuthTokens] = useState({})
    
    const api = new CompetencesApi()

    let loadApi = async ()=>{
        try{

            let accessTokens = await api.getToken();
            
            if (accessTokens.responseStatus === 200) {
                setAuthTokens(accessTokens.tokens);
                localStorage.setItem('authTokens', JSON.stringify(accessTokens.tokens))
            } else {
                alert('Erro ao comunicar com a Base de dados.')
                throw new Error(`Erro de rede! Código: ${response.status}`);
            }
        } catch (error){
            console.error('Erro ao obter token:', error.message);
        }
    }

    let contextData = {
        loadApi,
        formData,
        setFormData,
        docente,
        setDocente,
        authTokens
    }

    return (
        <FormContext.Provider value={contextData}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => useContext(FormContext)