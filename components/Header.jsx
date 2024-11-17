import { useCart } from '../components/Context/CartContext';
import { Link } from 'react-router-dom';

import styles from '../css/Header.module.css'

function Header() {
  const { total } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title_total}>Total: ${total.toFixed(2)}</h1>
        <p className={styles.login}><Link to="/login" className={styles.link}>Fazer login</Link></p>
      </div>
    </header>

  );
}

export default Header;