import React from 'react';
import styles from '../css/image.module.css';  // Assuming this is the correct path for your CSS module.
import { useCart } from '../components/Context/CartContext'; // Assuming this is the correct path for your cart context.

function ProductList({ products }) {
  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.product}>
            <img src={product.image} alt={product.name} />
            <div className={styles.productInfo}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className={styles.price}>${product.price}</p>
              <button onClick={() => addToCart(product)}>
                 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
