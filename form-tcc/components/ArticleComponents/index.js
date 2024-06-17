import styled from "styled-components";

const Paragraph = styled.p`
  text-align: justify;
  text-indent: ${ (props) => props.changeFLine ? '1.2em' : '0'}; /* Espaçamento na primeira linha */
  font-family: "Roboto", helvetica, sans-serif;
  width: 60vw;
`;

const ArticleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
  justifyContent: center;
  margin: 2rem 0;
`;

const ArticleImg = styled.img`
  width: ${(props) => props.size || '40vw'};
`

export { Paragraph, ArticleBox, ArticleImg };
