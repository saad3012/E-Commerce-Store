import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

function ProductList({ products }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
