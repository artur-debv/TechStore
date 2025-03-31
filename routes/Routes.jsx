import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import HomePage from "../components/HomePage";
import { CartProvider } from '../components/Context/CartContext'; // Certifique-se de que a importação é nomeada
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import styles from '../css/App.module.css';
import Complete from "../components/complete";



const products = [
  { id: 1, name: "Premium Wireless Headphones", description: "High-quality wireless headphones with noise cancellation and premium sound quality.", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60" },
  { id: 2, name: "Smart Watch Pro", description: "Advanced smartwatch with health tracking and seamless connectivity.", price: 199.99, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60" },
  { id: 3, name: "Ultra HD Camera", description: "Professional-grade camera with 4K video capabilities and advanced features.", price: 899.99, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60" },
  { id: 4, name: "Portable Speaker", description: "Waterproof portable speaker with incredible sound quality and long battery life.", price: 149.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60" }
];

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete" element={<Complete />} />
        <Route
          path="/"
          element={
            <CartProvider>
              <div>
                <Header />
                <HomePage />
              </div>
              <h1 className={styles.title_products}>Produtos</h1>
              <div>
                <ProductList products={products} />
                <Cart />
              </div>
            </CartProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
