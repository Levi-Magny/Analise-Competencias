import styles from './index.module.css'
import styled from 'styled-components'

function Layout({children}) {
    return <div className={styles.container}>{children}</div>
}

const QuestionText = styled.h4`
  font-family: 'Roboto', helvetica, sans-serif;
  color: ${(props) => props.color || '#FFF'};
  margin: 0;
  padding: .5rem;
`

const ContainerPurple = styled.div`
  width: 100%;
  height: ${(props) => props.height || '50vh'}; /* Altura personalizável */
  border-radius: 0px 0px 80px 80px;
  background: linear-gradient(180deg, #7A5DAB 0%, #423671 100%);
  box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem 1rem 1rem;
  transition: .5s;

  &.on-submit {
    height: 95vh;
  }
`;

export { Layout, ContainerPurple, QuestionText }