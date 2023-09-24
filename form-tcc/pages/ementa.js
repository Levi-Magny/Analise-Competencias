import styles from '../styles/Home.module.css';
import { ContainerPurple } from "../components";
import Header from "../components/header";
import Title from "../components/title";
import { useFormContext } from '../contexts/formcontext';
import { useEffect } from 'react';
import Questions from '../components/questions';
import Head from 'next/head';


const MainForm = () => {
    const {formData, setFormData, docente, setDocente} = useFormContext()
    
    useEffect(() => {
        const formS = JSON.parse(localStorage.getItem("form"))
        if(formS){
            setFormData(formS)
            setDocente(formS.docente)
        }
    }, [])
    return(
        <ContainerPurple height="95vh">
            <Head>
                <title>Ementa</title>
            </Head>
            <Header/>
            <Title
            title={`Olá, ${docente}`}
            subtitle="Ajude-nos a guiar estudantes em sua jornada acadêmica e profissional."
            />
            <Questions/>
            <div className={styles.arrow}>
            <img src="/arrow.svg" className={styles.rotate}/>
            </div>
        </ContainerPurple>

    );
}

export default MainForm;