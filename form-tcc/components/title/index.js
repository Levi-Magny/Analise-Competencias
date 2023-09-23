import styles from './title.module.css';

const Title = ({ title, subtitle }) => {
    return (
        <h1 className={styles.title}>
            {title}
            <span>{subtitle}</span>
        </h1>
    );
}

export default Title;