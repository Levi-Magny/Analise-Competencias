import { useState } from 'react';
import styles from './mobileitem.module.css';
import { ModalBox } from '..';

const MobileItemMatrix = ({ children, description, bgcolor, index, onItemClick, selectedIdx, id }) => {
    const [modal, setModal] = useState(false);
    
    const handleOutsideClick = (e)=>{
        if(e.target.id === "ModalBack"){
            setModal(false);
        }
    };

    return (
        <>
            <div className={styles.itemBox} 
            style={{backgroundColor: bgcolor}}
            id={id}
            onClick={()=>{                
                setModal(true);
                if (selectedIdx) {
                    let previous_element = document.getElementById(`[${selectedIdx[0]}-${selectedIdx[1]}]`);
                    previous_element.style.border = 'none';
                }

                let element = document.getElementById(`[${index[0]}-${index[1]}]`);
                element.style.border = '2px solid #FFF';
                onItemClick(index);
            }}
            >
                <h4>{children}</h4>
            </div>
            {modal && <div id="ModalBack" className={styles.modalContainer}
                onClick={handleOutsideClick}
            >
                <ModalBox>
                    <span className={styles.close}
                        onClick={()=>{setModal(false)}}
                    ><img src='/fechar.svg'/></span>
                    <h4 className={styles.modalTitle}>{children}</h4>
                    <p className={styles.modalDescription}>{description}</p>
                </ModalBox>
            </div>}
        </>
    );
}

export default MobileItemMatrix;