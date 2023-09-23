'use client';

import { createContext, useContext, useState } from "react";

export const FormContext = createContext({});

export const FormProvider = ({children}) => {
    const [formData, setFormData] = useState({'materia': "0"})
    const [docente, setDocente] = useState("")

    return (
        <FormContext.Provider value={{formData, setFormData, docente, setDocente}}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => useContext(FormContext)