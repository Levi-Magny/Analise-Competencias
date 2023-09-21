import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import { ContainerPurple } from '../components';
import Header from '../components/header';
import UserInfo from '../components/formHome';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ContainerPurple>
          <Header/>
          <h1 className={styles.title}>
            Título da Ferramenta
            <span>Ajude-nos a guiar estudantes em sua jornada acadêmica e profissional.</span>
          </h1>
          <div className={styles.arrow}>
            <img src="/arrow.svg"/>
          </div>
        </ContainerPurple>
        <UserInfo/>
      </main>

      <footer>
      </footer>
    </div>
  );
}
