import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Criação do contexto
const AuthContext = createContext();

// Provider para encapsular o estado do usuário
export function UserAuthenticationProvider({ children }) {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [auth]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => setUser(null))
            .catch((error) => console.error("Erro ao sair:", error));
    };

    const extractNameFromEmail = (email) => {
        if (!email) return "Usuário";
        const match = email.match(/^[a-zA-Z]+/);
        return match ? match[0] : "Usuário";
    };

    return (
        <AuthContext.Provider value={{ user, handleLogout, extractNameFromEmail }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para acessar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
