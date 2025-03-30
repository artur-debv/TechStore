import React from 'react';
import styles from '../css/Title.module.css';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { useCart } from '../components/Context/CartContext';
import handleCheckout from '../services/StripeChekout';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const isEmpty = cart.length === 0;
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <div className={styles.cart_content}>
        {isEmpty ? (
          <div className={styles.cartempty}>Your cart is empty</div>
        ) : (
          <div className={styles.cart_items}>
            {cart.map(({ id, image, name, quantity }) => (
              <div key={id} className={styles.cart_item}>
                <div className={styles.product_info}>
                  <img src={image} alt={name} className={styles.image} />
                  <h2 className={styles.product_name}>{name}</h2>
                  <div className={styles.quantity_controls}>
                    <button
                      onClick={() => updateQuantity(id, quantity - 1)}
                      className={styles.quantity_button}
                    >
                      <MinusCircle size={20} />
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button
                      onClick={() => updateQuantity(id, quantity + 1)}
                      className={styles.quantity_button}
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(id)}
                  className={styles.remove_button}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={styles.cart_total}>
          <h3>Total: ${total}</h3>
        </div>
        <button
          onClick={() => {
            console.log("Cart antes do checkout:", cart); // Verifica se os dados estão corretos
            handleCheckout(cart);
          }}
          className={styles.checkout_button}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}

export default Cart;
