
import styles from '../css/Homepage.module.css';

import Pcgamer from '../assets/Pc_gamer.png'

function HomePage() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.Container_information}>
                    <h1 className={styles.title_NameStore}>TechStore</h1>
                    <p className={styles.paragraphDDescription}>
                        Os melhores produtos
                        <br />
                        do mundo Tech é aqui
                    </p>
                    <button className={styles.ButtonseeMore}>Veja mais</button>
                </div>
                <div className={styles.container_image_pc}>
                    <img className={styles.image_pc} src={Pcgamer} alt="" />
                </div>
            </div>
        </>
    )
}

export default HomePage