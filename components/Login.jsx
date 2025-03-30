import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/FirebaseConfig";
import styles from '../css/Login.module.css';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInWithEmailAndPassword, loading, error] = useSignInWithEmailAndPassword(auth);
    const [unsubscribe, setUnsubscribe] = useState(null);

    

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is logged in:", user);
            } else {
                console.log("No user is logged in.");
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const navigate = useNavigate();


    async function handleSignIn(e) {
        e.preventDefault();

        const result = await signInWithEmailAndPassword(email, password);

        if (result) {
            navigate("/");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <form onSubmit={handleSignIn}>
                    <label htmlFor="email" className={styles.labelEmail}>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="yourname@example.com"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password" className={styles.labelPassword}>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className={styles.options}>
                        <p>Não possui conta? <Link to="/register">Crie a sua conta aqui</Link></p>
                    </div>

                    <button type="submit" className={styles.button}>Sign In</button>
                </form>
                {loading && <p>carregando...</p>}
                {error && <p>Erro no login: {error.message}</p>}
            </div>
        </div>
    );
}

export default Login;

