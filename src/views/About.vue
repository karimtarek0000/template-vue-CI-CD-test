<script setup>
import { useHead } from '@vueuse/head'

// Set page-specific metadata
useHead({
	title: 'About',
})
</script>

<template>
	<div class="about">
		<h1>About Page</h1>
		<p>This page issdsd prefetched after the initial load.</p>
	</div>
</template>

<style scoped>
.about {
	padding: 20px;
}
</style>
