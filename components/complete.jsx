import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Complete = () => {
  const [session, setSession] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      console.log("ID da sessão:", sessionId); // Adicionei um log para verificar o ID da sessão
      fetch(`https://stripe-fwqc.onrender.com/complete?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setSession(data))
        .catch((err) => console.error("Erro ao buscar sessão:", err));
    }
  }, [sessionId]);

  if (!session) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Pagamento Confirmado!</h1>
      <p>ID da sessão: {session.id}</p>
      <p>Status: {session.payment_status}</p>
    </div>
  );
};

export default Complete;
