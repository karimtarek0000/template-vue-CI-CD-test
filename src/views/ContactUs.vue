<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";

const route = useRoute();

// Set page-specific metadata
useHead({
  title: "Contact us",
});
</script>

<template>
  <div class="contact-us">
    <h1>Contact Us</h1>
    <!-- Your existing contact page content -->
  </div>
</template>

<style scoped></style>
