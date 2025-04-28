<<<<<<< HEAD
<script setup lang="ts"></script>
=======
<script setup lang="ts">
  console.log("testing");
  const testing = "dfdfdf";
</script>
>>>>>>> d6fbe8b7e88f232380d8c2246723f5d4679ee1fb

<template>
  <div>
    <RouterView />
    <p>testing</p>
  </div>
</template>

<style>
  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  nav {
    padding: 20px 0;
  }

  nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
  }

  nav a.router-link-active {
    font-weight: bold;
    color: #42b983;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
