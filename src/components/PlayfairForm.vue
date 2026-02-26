<template>
	<form class = "form" @submit.prevent>
		<label class = "label">
			<textarea
				v-model = "plaintext"
				class = "input"
				rows = "4"
				placeholder = "Type your message"
			></textarea>
		</label>

		<label class = "label">
			Key
			<input
				v-model = "key"
				class = "input"
				type = "text"
				placeholder = "Example: CHICKEN"
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
const key = ref("CHICKEN")

watch([plaintext, key], () => encrypt(), {immediate: true})

function normalizeLetters(str) {
	return (str || "").toUpperCase().replace(/[^A-Z]/g, "").replace(/J/g, "I")
}

function buildMatrix(k) {
	const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
	const seen = new Set()
	const chars = []

	const normalizedKey = normalizeLetters(k)
	for (const ch of normalizedKey + alphabet) {
		if (!seen.has(ch)){
			seen.add(ch)
			chars.push(ch)
		}
	}

	const grid = []
	for (let r = 0; r < 5; r++) {
		grid.push(chars.slice(r * 5, r * 5 + 5))
	}

	const pos = new Map()
	for (let r = 0; r < 5; r++) {
		for (let c = 0; c < 5; c++) {
			pos.set(grid[r][c], {r, c})
		}
	}

	return {grid, pos}
}

function makeDiagraphs(text) {
	const s = normalizeLetters(text)
	const pairs = []
	let i = 0

	while (i < s.length) {
		const a = s[i]
		const b = s[i + 1] || "X"

		if (a === b) {
			pairs.push([a, "X"])
			i += 1
		} else {
			pairs.push([a, b])
			i += 2
		}
	}

	if (pairs.length > 0) {
		const last = pairs[pairs.length - 1]
		if (!last[1]) {
			last[1] = "X"
		}
	}
	return pairs
}

function playfairEncrypt(text, k) {
	const {grid, pos} = buildMatrix(k)
	const pairs = makeDiagraphs(text)

	let out = ""
	for (const [a, b] of pairs) {
		const pa = pos.get(a)
		const pb = pos.get(b)

		if (pa.r === pb.r) {
			out += grid[pa.r][(pa.c + 1) % 5]
			out += grid[pb.r][(pb.c + 1) % 5]
			continue
		}

		if (pa.c === pb.c) {
			out += grid[(pa.r + 1) % 5][pa.c]
			out += grid[(pb.r + 1) % 5][pb.c]
			continue
		}

		out += grid[pa.r][pb.c]
		out += grid[pb.r][pa.c]
	}

	return {
		ciphertext: out,
		matrix: grid,
		pairs
	}
}

function encrypt() {
	const result = playfairEncrypt(plaintext.value, key.value)

	const matrixText = result.matrix.map(row => row.join(" ")).join(" | ")
	const pairsText = result.pairs.map(p => p.join("")).join(" ")

	emit("update", {
		ciphertext: result.ciphertext,
		hint: `Pairs: ${pairsText}  Matrix: ${matrixText}`
	})
}

function reset() {
	plaintext.value = ""
	key.value = "CHICKEN"
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