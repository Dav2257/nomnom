<script setup lang="ts">
import { ref } from 'vue'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
}

interface CartItem {
  product: Product
  quantity: number
}

const products = ref<Product[]>([
  { id: 1, name: 'Pizza', category: 'Food', price: 10.99, image: new URL('@/assets/images/pizza.jpg', import.meta.url).href },
  { id: 2, name: 'Burger', category: 'Food', price: 8.99, image: new URL('@/assets/images/burger.jpg', import.meta.url).href },
  { id: 3, name: 'Sushi', category: 'Food', price: 12.99, image: new URL('@/assets/images/sushi.jpg', import.meta.url).href },
  { id: 4, name: 'Laptop', category: 'Electronics', price: 999.99, image: new URL('@/assets/images/laptop.jpg', import.meta.url).href },
  { id: 5, name: 'Headphones', category: 'Electronics', price: 199.99, image: new URL('@/assets/images/headphones.jpg', import.meta.url).href },
  { id: 6, name: 'Smartphone', category: 'Electronics', price: 699.99, image: new URL('@/assets/images/smartphone.jpg', import.meta.url).href },
  { id: 7, name: 'T-shirt', category: 'Clothing', price: 15.99, image: new URL('@/assets/images/tshirt.jpg', import.meta.url).href },
  { id: 8, name: 'Jeans', category: 'Clothing', price: 39.99, image: new URL('@/assets/images/jeans.jpg', import.meta.url).href },
  { id: 9, name: 'Jacket', category: 'Clothing', price: 59.99, image: new URL('@/assets/images/jacket.jpg', import.meta.url).href },
  { id: 10, name: 'Apple', category: 'Food', price: 1.99, image: new URL('@/assets/images/apple.jpg', import.meta.url).href },
  { id: 11, name: 'Banana', category: 'Food', price: 0.99, image: new URL('@/assets/images/banana.jpg', import.meta.url).href },
  { id: 12, name: 'Orange', category: 'Food', price: 1.49, image: new URL('@/assets/images/orange.jpg', import.meta.url).href },
  { id: 13, name: 'Watch', category: 'Accessories', price: 149.99, image: new URL('@/assets/images/watch.jpg', import.meta.url).href },
  { id: 14, name: 'Backpack', category: 'Accessories', price: 49.99, image: new URL('@/assets/images/backpack.jpg', import.meta.url).href },
  { id: 15, name: 'Shoes', category: 'Clothing', price: 79.99, image: new URL('@/assets/images/shoes.jpg', import.meta.url).href },
  { id: 16, name: 'Tablet', category: 'Electronics', price: 499.99, image: new URL('@/assets/images/tablet.jpg', import.meta.url).href },
  { id: 17, name: 'Camera', category: 'Electronics', price: 899.99, image: new URL('@/assets/images/camera.jpg', import.meta.url).href },
  { id: 18, name: 'Milk', category: 'Food', price: 2.49, image: new URL('@/assets/images/milk.jpg', import.meta.url).href },
  { id: 19, name: 'Bread', category: 'Food', price: 1.99, image: new URL('@/assets/images/bread.jpg', import.meta.url).href },
  { id: 20, name: 'Eggs', category: 'Food', price: 3.49, image: new URL('@/assets/images/eggs.jpg', import.meta.url).href }
])

const cart = ref<CartItem[]>([])

function addToCart(product: Product) {
  const found = cart.value.find(item => item.product.id === product.id)
  if (found) {
    found.quantity++
  } else {
    cart.value.push({ product, quantity: 1 })
  }
}

function removeFromCart(productId: number) {
  cart.value = cart.value.filter(item => item.product.id !== productId)
}

function clearCart() {
  cart.value = []
}

function cartTotal() {
  return cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}
</script>

<template>
  <main class="shop-container">
    <header class="shop-header">
      <h1 class="shop-title">NomNom</h1>
      <p class="shop-subtitle">Pilih Pilihanmu disini</p>
    </header>

    <!-- Keranjang -->
    <section class="cart-section">
      <h2>Keranjang Belanja</h2>
      <div v-if="cart.length === 0">Keranjang kosong.</div>
      <ul v-else>
        <li v-for="item in cart" :key="item.product.id" class="cart-item">
          <img :src="item.product.image" :alt="item.product.name" class="cart-image" />
          {{ item.product.name }} ({{ item.quantity }}) - Rp{{ item.product.price.toFixed(2) }}
          <button @click="removeFromCart(item.product.id)">Hapus</button>
        </li>
      </ul>
      <div v-if="cart.length > 0" class="cart-total">
        Total: Rp{{ cartTotal().toFixed(2) }}
        <button @click="clearCart">Kosongkan Keranjang</button>
      </div>
    </section>

    <!-- Daftar Produk -->
    <section class="product-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-category">{{ product.category }}</p>
        <p class="product-price">Rp{{ product.price.toFixed(2) }}</p>
        <button class="add-to-cart" @click="addToCart(product)">Tambah ke Keranjang</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.shop-container {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.shop-header {
  text-align: center;
  margin-bottom: 30px;
}

.shop-title {
  font-size: 2.5rem;
  color: #4CAF50;
}

.shop-subtitle {
  font-size: 1.2rem;
  color: #666;
}

.cart-section {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.cart-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}
.cart-total {
  margin-top: 10px;
  font-weight: bold;
}
.cart-section button {
  margin-left: 10px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}
.cart-section button:hover {
  background: #b71c1c;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 5px;
}

.product-category {
  font-size: 1rem;
  color: #777;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.2rem;
  color: #4CAF50;
  margin-bottom: 15px;
}

.add-to-cart {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #45a049;
}
</style>