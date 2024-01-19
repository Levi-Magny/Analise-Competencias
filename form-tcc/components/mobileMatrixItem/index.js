import styles from './mobileitem.module.css';

const MobileItemMatrix = ({ children, description, bgcolor }) => {

    return (
        <>
            <div className={styles.itemBox} style={{backgroundColor: bgcolor}}>
                <h4>{children}</h4>
            </div>
        </>
    );
}

export default MobileItemMatrix;