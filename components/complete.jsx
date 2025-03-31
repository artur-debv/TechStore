import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Complete = () => {
  const [session, setSession] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");


  useEffect(() => {
    if (sessionId) {
      console.log("ID da sessão:", sessionId);
      console.log("Status da sessão:", sessionId.payment_status);
      fetch(`https://stripe-fwqc.onrender.com/complete?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) =>
          console.log("Dados da sessão:", data) ||
          setSession(data)
        )
        .catch((err) => console.error("Erro ao buscar sessão:", err));
    }
  }, [sessionId]);

  if (!session) return <p>Carregando...</p>;

  setTimeout(() => {
    window.location.href = "/"; // Redireciona para a página inicial após 5 segundos
  }, 1000); // 5 segundos)

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#f4f4f9"
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",  // Cor de fundo do container
          borderRadius: "10px",  // Bordas arredondadas
          padding: "30px",  // Espaçamento interno
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Sombra suave para destacar
          width: "80%",  // Largura do container
          maxWidth: "600px",  // Largura máxima para o container
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "black",  // Cor vibrante para o título
            marginBottom: "20px"
          }}
        >
          Pagamento Confirmado!
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "black",  // Cor vibrante para o valor total
            marginTop: "10px"
          }}
        >
          Valor total: <span style={{ color: "#2196F3" }}>${(session.amountTotal / 100)}</span>
        </p>
      </div>
    </div>
  );

};

export default Complete;
