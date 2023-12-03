import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ContainerPurple } from '../components';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import UserInfo from '../components/formHome';
import Title from '../components/title';
import { FormContext, useFormContext } from '../contexts/formcontext';

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {loadApi} = useFormContext()
  useEffect(()=> {
    loadApi();
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Análise de Competências</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
        <UserInfo setSubmitted={setIsSubmitted}/>
      </main>

      <footer>
      </footer>
    </div>
  );
}
