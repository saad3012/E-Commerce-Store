
import React from "react";
import ProductForm from "../components/ProductForm";
import styles from "./AddProductPage.module.css";

function AddProductPage({ onAdd }) {
  return (
    <section className={styles.container}>
      <div className={styles.heroSection}>
        <h2 className={styles.title}>Add New Product</h2>
        <p className={styles.subtitle}>
          Fill out the details below to add a new product to your store.
        </p>
      </div>

      <div className={styles.card}>
        {}
        <ProductForm onAdd={onAdd} />
      </div>
    </section>
  );
}

export default AddProductPage;
