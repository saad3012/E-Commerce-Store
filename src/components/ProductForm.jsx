
import React, { useState, useEffect } from "react";
import { api } from "../api/products";
import styles from "./ProductForm.module.css";

function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const nameOk = name.trim().length > 0;
    const priceOk = price.trim().length === 0 || /^\$?\d+(\.\d{1,2})?$/.test(price.trim());
    setIsValid(nameOk && priceOk);
  }, [name, price]);

  useEffect(() => {
    let t;
    if (success) {
      t = setTimeout(() => setSuccess(false), 2000);
    }
    return () => clearTimeout(t);
  }, [success]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const newProduct = {
        name: name.trim(),
        description: description.trim(),
        price: price.trim() || "$0",
      };
      
      await onAdd(newProduct, imageFile);
      
      setName("");
      setDescription("");
      setPrice("");
      setImageFile(null);
      setImagePreview("");
      setSuccess(true);
    } catch (err) {
      console.error("Error adding product:", err);
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
      
      <div className={styles.imageInput}>
        <label htmlFor="imageFile">Upload Image:</label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className={styles.preview}>
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
      </div>

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
