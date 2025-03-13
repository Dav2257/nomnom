<script setup>
import { ref, onMounted } from 'vue'
import { getUsers } from './services/api'

const users = ref([])

onMounted(async () => {
  try {
    const response = await getUsers()
    console.log(response) // Debugging
    users.value = response.results // Ensure this matches the API response
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
})
</script>

<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in produk" :key="user.id">{{ user.nama }}</li>
    </ul>
  </div>
</template>
