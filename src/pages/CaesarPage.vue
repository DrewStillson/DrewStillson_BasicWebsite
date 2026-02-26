<template>
	<section class = "panel">
		<h2>Caesar Cipher</h2>
		<p>Enter plaintext and the shift amount (0-25)</p>

		<CaesarForm @update = "handleUpdate" />

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
	import CaesarForm from '../components/CaesarForm.vue';
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