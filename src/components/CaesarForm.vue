<template>
	<form class = "form" @submit.prevent>
		<label class = "label">
			Plaintext
			<textarea
			v-model = "plaintext"
			class = "input"
			rows = "4"
			placeholder = "Type your message"
			></textarea>
		</label>

		<label class = "label">
			Shift (0-25)
			<input
			v-model.number = "shift"
			class = "input"
			type = "number"
			min = "0"
			max = "25"
			/>
		</label>

		<div class = "row">
			<button class = "button clear" type = "button" @click = "reset">Reset</button>
		</div>
	</form>
</template>

<script setup>
import {ref, watch} from "vue"

const emit = defineEmits(["update"])

const plaintext = ref("")
const shift = ref(3)

watch([plaintext, shift], () => encrypt(), {immediate: true})

function caesarEncrypt(text, s) {
	const n = ((s % 26) + 26) % 26
	let out = ""
	for (const ch of text) {
		const code = ch.charCodeAt(0)

		if (code >= 26 && code <= 90) {
			const shifted = ((code - 65 + n) % 26) + 65
			out += String.fromCharCode(shifted)
			continue
		}

		if (code >= 97 && code <= 122) {
			const shifted = ((code - 97 + n) % 26) + 97
			out += String.fromCharCode(shifted)
			continue
		}

		out += ch
	}
	return out
}

function encrypt() {
	const s = Number.isFinite(shift.value) ? shift.value : 0
	const clipped = Math.max(0, Math.min(25, s))
	const result = caesarEncrypt(plaintext.value, clipped)

	emit("update", {
		ciphertext: result,
		hint: `Shift = ${clipped}`
	})
}

function reset() {
	plaintext.value = ""
	shift.value = 3
	encrypt()
}
</script>

<style scoped>
.form {
	display: grid;
	gap: 12px;
	font-weight: 600;
}

.input {
	border-radius: 12px;
	padding: 10px 12px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	color: white;
	outline: none
}

.input:focus {
	border-color: rgba(255, 255, 255, 0.32);
}

.row {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.button {
	padding: 10px 12px;
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	color: white;
	cursor: pointer;
}

.button:hover {background: blue}

.clear {
	background: transparent;
}
</style>