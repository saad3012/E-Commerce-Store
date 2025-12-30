
import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import ProductDisplayPage from "./pages/ProductDisplayPage";
import AddProductPage from "./pages/AddProductPage";
import { api } from "./api/products";
import keyboard from "./assets/keyboard.jpg";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (product, imageFile) => {
    try {
      const sanitized = {
        name: product.name?.trim() || "Untitled Product",
        description: product.description?.trim() || "",
        price: product.price?.trim() || "$0",
      };
      const newProduct = await api.createProduct(sanitized, imageFile);
      setProducts((prev) => [newProduct, ...prev]);
    } catch (err) {
      console.error('Failed to add product:', err);
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.header}>E-Commerce Dashboard</h1>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : (
        <>
          <ProductDisplayPage products={products} />
          <AddProductPage onAdd={handleAdd} />
        </>
      )}
    </div>
  );
}

export default App;
