import { useEffect, useLayoutEffect, useState } from 'react';
import { ContainerPurple } from "../components";
import { useFormContext } from '../contexts/formcontext';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from "../components/header";
import Title from "../components/title";
import Questions from '../components/questions';
import { useRouter } from 'next/router';


const MainForm = () => {
    const { formData, setFormData, docente, setDocente } = useFormContext();
    const [showQuestions, setShowQuestions] = useState(false)
    const { push } = useRouter();

    useEffect(() => {
        const formS = JSON.parse(localStorage.getItem("form"))
        if(formS.docente && formS.materia){
            setShowQuestions(true);
            setFormData(formS);
            setDocente(formS.docente);
        } else {
            push('/');
        }
    }, [])

    return(
        showQuestions && <ContainerPurple height="95vh">
            <Head>
                <title>Competências</title>
            </Head>
            <Header/>
            <Title
            title={docente && `Olá, Prof. ${formData.docente.nome.split(' ')[0]}`}
            subtitle="Apenas para as competências abordadas na disciplina, selecione o nível cobrado do aluno."
            />
            <Questions/>
            <div className={styles.arrow}>
            <img src="/arrow.svg" className={styles.rotate}/>
            </div>
        </ContainerPurple>

    );
}

export default MainForm;