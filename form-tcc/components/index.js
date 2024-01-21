import styles from './index.module.css'
import styled from 'styled-components'

function Layout({children}) {
    return <div className={styles.container}>{children}</div>
}

const QuestionText = styled.h4`
  font-family: 'Roboto', helvetica, sans-serif;
  font-size: 15pt;
  font-weight: 550;
  color: ${(props) => props.color || '#FFF'};
  margin: 0;
  padding: .5rem;
`

const BoxItemMobile = styled.div`
  height: inherit;
  max-width: 90vh;
  display: ${(props) => props.visible ? 'none' : 'flex'} ;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  gap: .2rem;
`

const Description = styled.div`
  position: absolute;
  z-index: 100;
  background: #f2f2f2;
  border-radius: .3rem;
  width: 6rem;
  min-height: 8rem;
  font-size: .8rem;
  font-weight: 800;
  
  display: flex;
  flex-direction: column;
  alignItems: center;

  padding: .5rem;
  transition: .5s;

  &.disabled {
    opacity: 0;
    visibility: hidden;
  }

  p {
    line-height: 1rem;
    font-weight: 400;
  }

  `;

const ModalBox = styled.div`
  z-index: 100;
  position: absolute;
  margin: auto;
  border: none;
  border-radius: 1.5rem;
  width: 90vw;
  height: 60vh;
  background: linear-gradient(90deg, #7A5DAB 0%, #423671 100%);

  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 15rem; 

  p {
    font-family: 'Roboto', Helvetica, sans-serif;
    color: snow;
  }
`;

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

  /* Estilos para telas menores (exemplo: até 768px de largura) */
  @media (max-width: 768px) {
    height: 100%;
    padding: 0 .5rem .5rem .5rem;

    &.on-submit {
      height: 100vh;
    }
  }
  @media (max-height: 600px) {
    height: fit-content;
  }
`;


export { Layout, ContainerPurple, BoxItemMobile, QuestionText, Description, ModalBox }