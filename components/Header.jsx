import { useCart } from '../components/Context/CartContext';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';

import styles from '../css/Header.module.css'
import { useState } from 'react';


function Header() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const { total } = useCart();

  useEffect(() => {
    // Verifica se há um usuário logado
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpeza do listener
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("Erro ao sair:", error));
  };

  const extractNameFromEmail = (email) => {
    if (!email) return "Usuário";
    const match = email.match(/^[a-zA-Z]+/); // Captura apenas as letras no início
    return match ? match[0] : "Usuário"; // Retorna o nome ou "Usuário" caso não encontre
  };

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