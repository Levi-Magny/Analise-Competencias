import styles from "./item.module.css";

const MatrixItem = ({children, bgcolor, description, HHeader, VHeader, index, onItemClick, selectedIdx, id}) => {
    return (
        <div className={`${!(HHeader || VHeader) ? styles.itemBox : ''} ${(HHeader) ? styles.itemHHeader : ''} ${(VHeader) ? styles.itemVHeader : ''}`}
            style={{backgroundColor:bgcolor}}
            id={id}
            onClick={()=>{
                if(HHeader || VHeader) return
                
                if (selectedIdx) {
                    let previous_element = document.getElementById(`[${selectedIdx[0]}-${selectedIdx[1]}]`);
                    previous_element.style.border = 'none';
                }

                let element = document.getElementById(`[${index[0]}-${index[1]}]`);
                element.style.border = '4px solid #FFF';

                onItemClick(index);
            }}
        >
            <h4>{children}</h4>
            <p>{description}</p>
        </div>
    )
}

export default MatrixItem;