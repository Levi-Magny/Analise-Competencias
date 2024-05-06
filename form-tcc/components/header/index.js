import styled from 'styled-components';
import styles from './header.module.css';
import Link from 'next/link';

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
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/sobre">Sobre</Link></li>
                        <li><Link href="#">Contato</Link></li>
                    </ul>
                </nav>
                <label className={styles.hamburgerMenu}>
                    <input type='checkbox'/>
                </label>
                <section className={styles.sideBar}>
                    <MenuItem><Link href="/"><span>Início</span></Link></MenuItem>
                    <MenuItem><Link href="/sobre"><span>Sobre</span></Link></MenuItem>
                    <MenuItem><Link href="#"><span>Contato</span></Link></MenuItem>
                </section>
            </header>
        </>
    );
}

export default Header;