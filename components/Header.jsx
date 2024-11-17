import { useCart } from '../components/Context/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from './UseraUthentication/UserAuhentication';
import styles from '../css/Header.module.css';

function Header() {
  const { total } = useCart();
  const { user, handleLogout, extractNameFromEmail } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title_total}>Total: ${total.toFixed(2)}</h1>
        {user ? (
          <div className={styles.userContainer}>
            <p className={styles.userName}>
              Olá, {user.displayName || extractNameFromEmail(user.email)}!
            </p>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Sair
            </button>
          </div>
        ) : (
          <p className={styles.loginText}>
            <Link to="/login" className={styles.login}>
              Fazer login
            </Link>
          </p>
        )}
      </div>
    </header>
  );
}

export default Header;
