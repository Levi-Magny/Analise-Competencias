import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from "../components/header";
import Title from "../components/title";
import docentes from '../data/docentes.json'
import { ContainerPurple } from "../components";
import { useRouter } from 'next/router';
import { useFormContext } from '../contexts/formcontext';

import { Box, Button } from "@mui/material"
import { useEffect } from 'react';

const Obrigado = () => {
    const {docente, setDocente, setFormData, formData} = useFormContext();
    const rotas = useRouter();

    return (
        <ContainerPurple height="95vh">
            <Head>
                <title>Obrigado</title>
            </Head>
            <Header/>
            <Title
            title={docente && `Obrigado, Prof. ${formData.docente.nome.split(' ')[0]}!`}
            subtitle="Sua contribuição será de grande valia."
            />
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent:"center",
                alignItems: "center",
                gap: '1rem',
                }}
            >

            <Button
                sx={{
                padding: '.5rem 2rem',
                borderRadius: '.5rem',
                width: '50%',
                minHeight: '10vh',
                minWidth: '8rem',
                color: "#FFF",
                backgroundColor: "#7A5DAB",
                ":hover": {
                    backgroundColor: "#52FDDE",
                    color: "#7A5DAB"
                }
                }}
                onClick={() => {
                    setDocente(null);
                    setFormData({});
                    localStorage.removeItem("form");
                    rotas.push('/')
                }
                }
                >
                Voltar ao início.
            </Button>
            </Box>
            <div className={styles.arrow}>
            <img src="/arrow.svg" className={styles.rotate}/>
            </div>
        </ContainerPurple>
    )
}
export default Obrigado;