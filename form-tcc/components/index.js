import styles from './index.module.css'

function Layout({children}) {
    return <div className={styles.container}>{children}</div>
}

function ContainerPurple({children}) {
    return (
        <div className={styles.containerPurple}>{children}</div>
    )
}

function Header(props) {
    return (
        <div className={styles.containerHeader}>
            
        </div>
    )
}

export { Layout, ContainerPurple }