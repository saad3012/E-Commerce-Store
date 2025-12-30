const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
  async getProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async createProduct(product) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  async updateProduct(id, product) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  },

  async seedProducts() {
    const response = await fetch(`${API_URL}/products/seed`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to seed products');
    }
  },
};
