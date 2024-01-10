import Head from "next/head";
import '../styles/global.css'
import { FormProvider } from "../contexts/formcontext";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Análise de Competências</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Analise de Competencias" key="title" />
                <meta property="og:description" content="Ajude-nos a guiar estudantes em sua jornada acadêmica e profissional." />
                <meta property="og:url" content="https://analise-competencias.vercel.app/" />
                <link rel="shortcut icon" href="/Logo.svg" />
            </Head>
            <FormProvider>
                <Component {...pageProps} />
            </FormProvider>
        </>
    );
}