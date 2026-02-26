<template>
	<section class = "panel">
		<h2>Playfair Cipher</h2>
		<p>Enter the plaintext and a key</p>
		
		<PlayfairForm @update = "handleUpdate" />

		<ResultBox
			title = "Ciphertext Result"
			:value = "ciphertext"
			:hint = "hint"
		/>
	</section>

	<router-link to = "/" class = "back-button">
		Back to Home
	</router-link>
</template>

<script setup>
	import {ref} from 'vue';
	import PlayfairForm from '../components/PlayfairForm.vue';
	import ResultBox from '../components/ResultBox.vue';

	const ciphertext = ref('');
	const hint = ref('');

	function handleUpdate(text) {
		ciphertext.value = text.ciphertext;
		hint.value = text.hint;
	}
</script>

<style scoped>
.panel {
	background: rgba(255, 255, 255, 0.06);
	border: 1px solid rgba(255, 255, 255, 0.14);
	border-radius: 16px;
	padding: 20px;
}
</style>