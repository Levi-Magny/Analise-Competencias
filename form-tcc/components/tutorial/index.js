import { useState } from 'react';
import styles from './tutorial.module.css';
import { ModalBox } from '..';

const Tutorial = ({ children, modal, setModal }) => {
    
    const handleOutsideClick = (e)=>{
        if(e.target.id === "ModalBack"){
            setModal(false);
        }
    };

    return (
        <>
            {modal && <div id="ModalBack" className={styles.modalContainer}
                onClick={handleOutsideClick}
            >
                <ModalBox height='80vh' width='70vw'>
                    <span className={styles.close}
                        onClick={()=>{setModal(false)}}
                    ><img src='/fechar.svg'/></span>
                    <h4 className={styles.modalTitle}>{children}</h4>
                    <span className={styles.gif}>
                        <img src='/images/analise_competencias.gif'/>
                    </span>
                    <div className={styles.tips}>
                        <ul>
                            <li>
                                <p className={styles.modalDescription}>
                                    A caixa de seleção <b>À ESQUERDA</b> contém as competências da pesquisa, você pode selecionar <b>APENAS</b> aquelas que se aplicam à disciplina.
                                </p>
                            </li>
                            <li>
                                <p className={styles.modalDescription}>
                                    Ao selecionar uma competência, escolha a posição da matriz que melhor descreve o nível abordado, dessa competência, ao longo da disciplina.
                                </p>
                            </li>
                        </ul>
                    </div>
                </ModalBox>
            </div>}
        </>
    );
}

export default Tutorial;