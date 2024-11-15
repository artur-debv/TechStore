import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../services/FirebaseConfig";
import styles from '../css/Register.module.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   

    const [createUserWithEmailAndPassword, user, loading, hookError] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage("");

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        await createUserWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) {
            setSuccessMessage("Cadastro realizado com sucesso!");
        }
    }, [user]);

    useEffect(() => {
        if (hookError) {
            setError(
                hookError.message.includes("email-already-in-use")
                    ? "Este e-mail já está em uso. Por favor, tente outro."
                    : "Erro no cadastro. Verifique as informações e tente novamente."
            );
        }
    }, [hookError]);

    return (
        <div className={styles.container}>
            <div className={styles.RegisterBox}>
                <form onSubmit={handleSignUp}>
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

                    <button type="submit" className={styles.button}>Cadastrar</button>
                    <p>já possui uma conta ? <Link to="/login">Fazer Login</Link></p>
                </form>

                {loading && <p>Carregando...</p>}
                {error && <p className={styles.error}>Erro: {error}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
            </div>


        </div>



    );
}

export default Register;
