<script setup>
import CipherCard from '../components/CipherCard.vue';

import img1 from '../assets/cipher1.png';
import img2 from '../assets/cipher2.png';
</script>

<template>
	<section class = "hero">
		<h1> Classic Ciphers</h1>
		<p>
			Pick a cipher to try out!
		</p>

		<div class = "image-row">
			<img :src = "img1" alt = "Cipher 1">
			<img :src = "img2" alt = "Cipher 2">
		</div>

		<div class = "cards">
			<CipherCard
				title = "Caesar Cipher"
				description = "Shift each letter by a fixed amount."
				to = "/caesar"
				buttonText = "Open Caesar"
			/>
			<CipherCard
				title = "Playfair Cipher"
				description = "Diagraph cipher using a 5x5 grid."
				to = "/playfair"
				buttonText = "Open Playfair"
			/>
		</div>
	</section>
</template>

<style scoped>
.hero {
	background: rgba(255, 255, 255, 0.06);
	border: 1px solid rgba(255, 255, 255, 0.14);
	border-radius: 16px;
	padding: 20px;
}

.image-row {
	display: flex;
	gap: 70px;
	margin: 16px 0 20px;
	flex-wrap: wrap;
}

.image-row img {
	width: 220px;
	height: 140px;
	object-fit: contain;
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.14);
}

.cards {
	display: grid;
	grid-template-columns: repeat(2, minmax(220px, 1fr));
	gap: 16px;
}

@media (max-width: 680px) {
	.cards {
		grid-template-columns: 1fr;
	}
}

</style>