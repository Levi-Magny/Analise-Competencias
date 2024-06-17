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
          subtitle="Entenda mais um pouco sobre essa taxonomia que revolucionou a educação."
        />
        <div className={styles.arrow}>
          <img src="/arrow.svg" />
        </div>
      </ContainerPurple>
      <ArticleBox>
        <Paragraph changeFLine={false}>
        A <b>Taxonomia de Bloom original</b> foi criada em 1956 por Bloom e seus colegas. Seu objetivo era fornecer uma classificação dos objetivos do sistema educacional, especialmente para ajudar professores, administradores, especialistas profissionais e pesquisadores a discutir problemas curriculares e de avaliação com maior precisão. Ela também foi frequentemente usada para classificar objetivos curriculares e itens de teste, a fim de mostrar a abrangência, ou falta dela, dos objetivos e itens em relação às categorias da taxonomia.
        </Paragraph>
        <Paragraph changeFLine={true}>
        Entretanto, a Taxonomia de Bloom original apresentava <b>limitações</b>, como a suposição de que os processos cognitivos se organizam em uma única dimensão, variando de comportamento simples a complexo, e a concepção de categorias não sobrepostas. Ela seguia uma hierarquia cumulativa, sugerindo que o domínio de uma categoria mais complexa demandava o domínio prévio de todas as categorias menos complexas. Essa abordagem já não era consistente com a complexidade das demandas de conhecimento encontradas na prática, muitas vezes requerendo níveis avançados de análise e avaliação.
        </Paragraph>
        <Paragraph changeFLine={true}>
        A Taxonomia Revisada abordou essas fraquezas, introduzindo duas dimensões, a Dimensão do Conhecimento e a Dimensão do Processo Cognitivo, e adicionando a categoria de <b>Conhecimento Metacognitivo</b>, que podem ser melhor visualizadas na figura a seguir. Essas mudanças resultaram em uma estrutura mais precisa e bem definida para classificar objetivos educacionais, facilitando a conexão entre avaliação, objetivos e instrução.
        </Paragraph>
        <ArticleImg src="/images/TRB.png"/>
        <Paragraph changeFLine={true}>
        Uma característica dessa Taxonomia é que a progressão de habilidades é <b>geralmente considerada cumulativa</b>, o que significa que é esperado que um aluno domine as habilidades de um nível antes de avançar para o próximo. Por exemplo, para adquirir uma nova habilidade no nível "Entender", é recomendado que o aluno já tenha dominado as habilidades do nível anterior, "Lembrar". No entanto, é importante ressaltar que essa progressão <b>não é estritamente rígida</b> e algumas habilidades podem ser desenvolvidas simultaneamente ou em diferentes ordens, dependendo do contexto educacional e das necessidades dos alunos.
        </Paragraph>
      </ArticleBox>
    </>
  );
};

export default sobre;
