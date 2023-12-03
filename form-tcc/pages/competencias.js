import { useEffect } from 'react';
import { ContainerPurple } from "../components";
import { useFormContext } from '../contexts/formcontext';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from "../components/header";
import Title from "../components/title";
import Questions from '../components/questions';
import docentes from '../data/docentes.json'
import { useRouter } from 'next/router';


const MainForm = () => {
    const {formData, setFormData, docente, setDocente} = useFormContext();
    const { push } = useRouter()
    useEffect(() => {
        const formS = JSON.parse(localStorage.getItem("form"))
        if(formS.docente && formS.materia){
            setFormData(formS)
            setDocente(formS.docente)
        } else {
            push('/')
        }
    }, [])

    return(
        <ContainerPurple height="95vh">
            <Head>
                <title>Competências</title>
            </Head>
            <Header/>
            <Title
            title={docente && `Olá, Prof. ${docentes.docentes[parseInt(docente-1)].nome.split(' ')[0]}`}
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