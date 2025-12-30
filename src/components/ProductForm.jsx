
import React, { useState, useEffect } from "react";
import styles from "./ProductForm.module.css";

function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    
    const nameOk = name.trim().length > 0;
    const priceOk = price.trim().length === 0 || /^\$?\d+(\.\d{1,2})?$/.test(price.trim());
    setIsValid(nameOk && priceOk);
  }, [name, price]);

  useEffect(() => {

    console.log("ProductForm fields:", { name, description, price, image });
  }, [name, description, price, image]);

  useEffect(() => {
    let t;
    if (success) {
      t = setTimeout(() => setSuccess(false), 2000);
    }
    return () => clearTimeout(t);
  }, [success]);

  const handleAdd = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const newProduct = {
        name: name.trim(),
        description: description.trim(),
        price: price.trim() || "$0",
        image: image.trim() || "",
      };
      if (typeof onAdd === "function") {
        onAdd(newProduct);
      } else {
        console.log("Added product (no onAdd provided):", newProduct);
      }
    
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd();
      }}
    >
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Price (e.g. $199)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <div className={styles.actions}>
        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Adding…" : "Add Product"}
        </button>
        {success && <span className={styles.success}>Product added</span>}
      </div>
    </form>
  );
}

export default ProductForm;
