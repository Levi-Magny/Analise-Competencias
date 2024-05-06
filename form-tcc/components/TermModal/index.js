import { Button, Checkbox, FormControlLabel } from "@mui/material";
import styled from "styled-components";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { useFormContext } from "../../contexts/formcontext";
import Title from "../title";

const ModalBox = styled.div`
  z-index: 100;
  margin: auto;
  border: none;
  border-radius: 1.5rem;
  width: 70vw;
  height: 80%;
  background: linear-gradient(90deg, #7a5dab 0%, #423671 100%);

  padding: 1.5rem;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar {
      width: 1rem;
      transition: 1s;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #f4f4f4;
      border-radius: 0 18px 18px 0;
      visibility: hidden;
      transition: 1s ease;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: #f4f4f4;
      opacity: 1;
      visibility: visible;
    }

    &::-webkit-scrollbar-track {
      background-color: #C8B3E9;
      transition: 1s;
      border-radius: 0 18px 18px 0;
    }
  p {
    font-family: "Roboto", Helvetica, sans-serif;
    color: snow;
    text-align: justify;
    /*text-indent: 1em;  Espaçamento na primeira linha */
    line-height: 1.4rem;
    width: 80%;

    margin-top: 0.5rem;
  }
`;

const FullModalBox = styled.section`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #33333355;
`;

const TermModal = ({setSubmitted, id}) => {
    const [accepted, setAccepted] = useState(false);
    const {authTokens, api} = useFormContext();
  return (
    <FullModalBox>
      <ModalBox>
        <Title
            title="Termo de Consentimento"
        />
        <p>
          Seguindo as recomendações da Resolução 466/12 do CNS e 510/16, que
          versam sobre a ética em pesquisa, você está sendo convidado (a) para
          participar da pesquisa intitulada:{" "}
          <b>
            “Mapeamento de competências com Taxonomia de Bloom: uma solução para
            a quantificação da profundidade cognitiva”
          </b>
          . Esta pesquisa tem como objetivo propor, analisar e validar um modelo
          matemático que possa ser usado para gerar um perfil detalhado de
          alunos egressos do curso de graduação em engenharia.
        </p>
        <p>
          Sua participação não é obrigatória, e, a qualquer momento, você poderá
          desistir de participar e retirar seu consentimento. O questionário
          apenas será disponibilizado após seu acordo com esse termo e sua
          recusa não trará nenhum prejuízo em sua relação com o pesquisador(a)
          ou com a instituição. Salientamos que não haverá gastos de sua parte
          para a participação desta pesquisa. Finalizada a pesquisa, serão
          disponibilizados aos participantes, os resultados obtidos.
        </p>
        <p>
          O questionário contém questões de múltipla escolha onde poderá
          selecionar a profundidade do conhecimento abordado em disciplinas. Os
          benefícios da sua participação contam com a contribuição com a
          pesquisa acadêmica. Também se espera que, futuramente, ajude os
          discentes e as instituições de ensino a visualizarem com mais exatidão
          o perfil do aprendizado, de modo que possam elaborar estratégias para
          aprimorar tanto o desempenho individual do discente quanto a estrutura
          dos cursos ofertados pela instituição.
        </p>
        <p>
          Quanto aos possíveis riscos ou danos à sua participação, esses são
          considerados mínimos e relacionados ao preenchimento de questionários,
          tais como: tomar o tempo do respondente, provocar cansaço, gerar
          desconforto, causar sentimento de insegurança quanto à opção de
          resposta que melhor reflete sua opinião diante das afirmativas
          relacionadas ao produto. Havendo quaisquer danos decorrentes desta
          pesquisa, será fornecida assistência integral e imediata deforma
          gratuita.
        </p>
        <p>
          Por razões éticas, todas as respostas serão tratadas de forma única e
          confidencial, preservando assim a privacidade de todos os
          respondentes. As respostas deste questionário são mantidas em uma base
          de dados em nuvem e podem ser acessados apenas a partir do IP
          específico de um dos pesquisadores, que também deve entrar com login e
          senha para acessá-la.
        </p>
        <hr />
        <p>
          <b>PESQUISADORES:</b>
          <br />
        </p>
        <p>
          <b>Levi Medeiros Magny.</b>
          <br />
          Endereço: Rua Mato Grosso, 624 - Apto 201, Amazonas, Itabira-MG. CEP:
          35900-372. E-mail: levi_mgy@unifei.edu.br.
        </p>
        <p>
          <b>Giovani Bernardes Vitor.</b>
          <br />
          Rua Célio Guerra, nº 56 - Apto 401, Bairro Santo Antônio, Itabira-MG.
          CEP: 35900-649. E-mail: giovanibernardes@unifei.edu.br
        </p>
        <p>
          <b>Rodrigo Aparecido da Silva Braga.</b>
          <br />
          Endereço: Rua Irmã Ivone Drumond, nº 200, Sala 2405. Distrito
          Industrial II. Itabira – MG. CEP: 35903-087. Tel.: (31) 3839-0846.
          Email: rodrigobraga@unifei.edu.br
        </p>
        <p>
          <b>CEP Unifei:</b> Anne Noelle Silve
          <br />
          Endereço: Av. BPS, 1303, Bairro Pinheirinho, Itajubá/MG, Caixa Postal
          50, CEP: 37500-903, Bloco ADC, 2º anda. E-mail: cep@unifei.edu.br
        </p>
        <hr />
        <p>
          <br />
          <b>AUTORIZAÇÃO:</b> Eu, participante da pesquisa, após a leitura desse
          documento, estou suficientemente informado, ficando claro que minha
          participação é voluntária e que posso desistir a qualquer momento sem
          penalidades. Estou ciente também dos objetivos da pesquisa, dos
          procedimentos que serei submetido, dos possíveis danos ou riscos deles
          provenientes e da garantia da confidencialidade. Diante do exposto e
          de espontânea vontade, expresso minha concordância em participar desta
          pesquisa.
        </p>
        <br/>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: pink[200],
                padding: "5px",
                "&.Mui-checked": { color: pink[100] },
                "& .MuiSvgIcon-root": { fontSize: 20 },
              }}
              onChange={() => {
                setAccepted(!accepted);
              }}
            />
          }
          label="Declaro que concordo em participar dessa pesquisa."
          sx={{
            color: "#f2f2f2",
            marginTop: "-.6rem",
            marginBottom: "1rem",
            "& .MuiTypography-root": { fontSize: 16 },
            justifyContent: "center",
          }}
        />
        <Button
            fullWidth
            variant="contained"
            disabled={!accepted}
            sx={{
                mb: 2,
                backgroundColor: '#7A5DAB',
                width: '50%'
            }}
            onClick={async (event) =>{
                let resp = await api.term_accepted(authTokens.access, id);
                setSubmitted([true]);
            }}
        >
            Prosseguir
        </Button>
      </ModalBox>
    </FullModalBox>
  );
};

export default TermModal;
