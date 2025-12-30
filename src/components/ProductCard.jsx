import React from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ name, description, price, image }) {
  return (
    <div className={styles.card}>
      {image ? (
        <img src={image} alt={name} className={styles.image} />
      ) : (
        <div className={styles.image} aria-hidden="true"></div>
      )}
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>{description}</p>
        <span className={styles.price}>{price}</span>
      </div>
    </div>
  );
}

export default ProductCard;