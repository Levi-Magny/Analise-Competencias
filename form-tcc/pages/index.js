import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import { ContainerPurple } from '../components';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ContainerPurple>
          <h1 className={styles.title}>
            <Link href="/posts/first-post">Título da Ferramenta</Link>
          </h1>
        </ContainerPurple>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
