import styles from './index.module.css'

function Layout({children}) {
    return <div className={styles.container}>{children}</div>
}

function ContainerPurple({children}) {
    return (
        <div className={styles.containerPurple}>{children}</div>
    )
}

export { Layout, ContainerPurple }