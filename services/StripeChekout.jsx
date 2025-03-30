import axios from 'axios';


const handleCheckout = async (cart, setLoading, user) => { // <- Apenas cart, sem destructuring
    console.log("Iniciando checkout com os itens:", cart); // Adicionei um log para verificar os itens do carrinho
    setLoading(true)
    if (user === null) {
        alert("Você precisa estar logado para finalizar a compra")
        setLoading(false)
        return
    }
    try {
        const response = await axios.post('https://stripe-fwqc.onrender.com/checkout', {
            items: cart.map(item => ({
                name: item.name,
                id: item.id,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
            })),
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.url) {
            window.location.href = response.data.url;
        } else {
            console.error("Erro: URL do checkout não encontrada.");
        }
    } catch (error) {
        console.error('Erro ao iniciar o checkout:', error);
        setLoading(false)
    }
};

export default handleCheckout;
