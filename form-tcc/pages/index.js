import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ContainerPurple } from '../components';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import UserInfo from '../components/formHome';
import Title from '../components/title';
import { FormContext, useFormContext } from '../contexts/formcontext';
import TermModal from '../components/TermModal';
import { useRouter } from 'next/router';

export default function Home() {
  const rotas = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTerm, setShowTerm] = useState([false,null]);
  const {loadApi, authTokens, api} = useFormContext();
  useEffect(()=> {
    loadApi();
  }, [])

  const submitClicked = (isTermAccepted) => {
    if(isTermAccepted[0]){
      setIsSubmitted(true);
      setTimeout(() => {
        rotas.push('/competencias');
      }, 500);
    } else {
      setShowTerm([true, isTermAccepted[1]]);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Análise de Competências</title>
        <link rel="icon" href="/Logo-Verde.svg" />
      </Head>
      {showTerm[0] && <TermModal setSubmitted={submitClicked} id={showTerm[1]}/>}
      <main>
        <ContainerPurple height="50vh" className={isSubmitted ? 'on-submit' : ''}>
          <Header/>
          <Title
            title="Análise de Competências"
            subtitle="Ajude-nos a guiar estudantes em sua jornada acadêmica e profissional."
          />
          <div className={styles.arrow}>
            <img src="/arrow.svg" className={isSubmitted ? styles.rotate : ''}/>
          </div>
        </ContainerPurple>
        {authTokens && <UserInfo setSubmitted={submitClicked}/>}
      </main>

      <footer>
      </footer>
    </div>
  );
}
