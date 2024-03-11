import styled from 'styled-components';
import styles from './header.module.css';

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    height: 100%;

    &:hover {
        background-color: #EDEDED;
    }
    span {
        font-family: 'Roboto', Helvetica, sans-serif;;
        font-size: 1.2rem;
        font-weight: 600;
        color: #423671;
    }
`;


const Header = () => {
    return (
        <>
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
                <label className={styles.hamburgerMenu}>
                    <input type='checkbox'/>
                </label>
                <section className={styles.sideBar}>
                    <MenuItem><span>Início</span></MenuItem>
                    <MenuItem><span>Sobre</span></MenuItem>
                    <MenuItem><span>Contato</span></MenuItem>
                </section>
            </header>
        </>
    );
}

export default Header;