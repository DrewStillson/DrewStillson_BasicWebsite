<template>
	<article class = "card">
		<h3> {{ title }}</h3>
		<p class = "description">{{ description }}</p>

		<RouterLink class = "button" :to = "to">
			{{ buttonText }}
		</RouterLink>
	</article>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
	title: {type: String, required: true},
	description: {type: String, required: true},
	to: {type: String, required: true},
	buttonText: {type: String, default: 'Open'}
})
</script>

<style scoped>
.card {
	padding: 16px;
	border-radius: 16px;
	background: rgba(255, 255, 255, 0.06);
	border: 1px solid rgba(255, 255, 255, 0.14);
}

.description {
	opacity: 0.9;
}

.button {
	display: inline-block;
	margin-top: 10px;
	padding: 10px 12px;
	border-radius: 12px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.14);
}

.button:hover {
	background: rgba(255, 255, 255, 0.14);
}
</style>