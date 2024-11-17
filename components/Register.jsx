import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../services/FirebaseConfig";
import styles from '../css/Register.module.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importando useNavigate para redirecionamento após cadastro

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Estado para erro
    const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagem de sucesso

    const [createUserWithEmailAndPassword, user, loading, hookError] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate(); // Hook para navegação

    console.log(user)

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage("");

        // Verifica se a senha tem pelo menos 6 caracteres
        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Tenta criar o usuário com email e senha
        await createUserWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) {
            setSuccessMessage("Cadastro realizado com sucesso!"); // Mensagem de sucesso

            // Redireciona para a página de login após o cadastro bem-sucedido
            setTimeout(() => {
                navigate("/login");
            }, 2000); // Tempo para mostrar a mensagem antes de redirecionar
        }
    }, [user, navigate]);

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
                    <p>Já possui uma conta? <Link to="/login">Fazer Login</Link></p>
                </form>

                {loading && <p>Carregando...</p>}
                {error && <p className={styles.error}>Erro: {error}</p>} {/* Exibe erro */}
                {successMessage && <p className={styles.success}>{successMessage}</p>} {/* Exibe sucesso */}
            </div>
        </div>
    );
}

export default Register;
