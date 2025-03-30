import axios from 'axios';

const handleCheckout = async (cart) => { // <- Apenas cart, sem destructuring
    console.log("Iniciando checkout com os itens:", cart); // Adicionei um log para verificar os itens do carrinho
    try {
        const response = await axios.post('https://stripe-fwqc.onrender.com/checkout', {
            items: cart.map(item => ({
                id: item.id,
                quantity: item.quantity,
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
    }
};

export default handleCheckout;
