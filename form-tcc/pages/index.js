import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { ContainerPurple } from '../components';
import Header from '../components/header';
import UserInfo from '../components/formHome';
import Title from '../components/title';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Analise Competencias</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ContainerPurple height="50vh" className={isSubmitted ? 'on-submit' : ''}>
          <Header/>
          <Title
            title="Título da Ferramenta"
            subtitle="Ajude-nos a guiar estudantes em sua jornada acadêmica e profissional."
          />
          <div className={styles.arrow}>
            <img src="/arrow.svg"/>
          </div>
        </ContainerPurple>
        <UserInfo setSubmitted={setIsSubmitted}/>
      </main>

      <footer>
      </footer>
    </div>
  );
}
