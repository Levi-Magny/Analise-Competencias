import styles from './header.module.css';

const Header = () => {
    return (
        <header className={styles.headerNav}>
            <div className={styles.logo}>
            <img src='/logo_marca.svg'/>
            </div>
            <nav className={styles.mainNav}>
                <ul>
                    <li><a href="/">Início</a></li>
                    <li><a href="#">Sobre</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;