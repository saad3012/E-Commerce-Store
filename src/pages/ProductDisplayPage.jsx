
import React, { useState, useEffect } from "react";
import styles from "./ProductDisplayPage.module.css";

function ProductDisplayPage({ products }) {
  const [localProducts, setLocalProducts] = useState(products || []);

  useEffect(() => {
    // sync local state when parent products prop changes
    setLocalProducts(products || []);
  }, [products]);

  useEffect(() => {
    // example side-effect when displayed products change
    console.log("Displaying products:", localProducts);
  }, [localProducts]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Available Products</h2>
        <p className={styles.subtitle}>
          Browse your collection below — all neatly displayed in a good manner.
        </p>

        <div className={styles.grid}>
          {localProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDisplayPage;
