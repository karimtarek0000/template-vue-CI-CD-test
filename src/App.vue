<script setup></script>

<template>
	<div>
		<RouterView />
		<h6>tags new</h6>
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
