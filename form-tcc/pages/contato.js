import Head from "next/head";
import { ContainerPurple } from "../components";
import Header from "../components/header";
import Title from "../components/title";
import styles from "../styles/Home.module.css";
import { ArticleBox, Paragraph, ArticleImg } from "../components/ArticleComponents";
import { Article } from "@mui/icons-material";

const sobre = () => {
  return (
    <>
      <ContainerPurple height="25vh">
        <Head>
          <title>Taxonomia de Bloom</title>
        </Head>
        <Header />
        <Title
          title={"Taxonomia de Bloom"}
          subtitle="Contato para dúvidas e/ou sugestões."
        />
        <div className={styles.arrow}>
          <img src="/arrow.svg" />
        </div>
      </ContainerPurple>
      <ArticleBox>
        <img src="/images/pesquisador.png" className={styles.contatoImg}/>
        <Paragraph  changeFLine={false}>
          <b>Aluno responsável:</b> <i>Levi Medeiros Magny</i> - 2019008642 .
          <br />
          <b>Contato:</b> (31) 99603-3378.
          <br />
          <b>E-mail:</b> levi_mgy@unifei.edu.br.
          <br />
          <b>Orientador:</b> Giovani Bernardes Vitor.
        </Paragraph>
      </ArticleBox>
    </>
  );
};

export default sobre;