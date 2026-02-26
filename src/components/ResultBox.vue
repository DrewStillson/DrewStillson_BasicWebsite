<template>
	<div class = "result">
		<div class = "top">
			<h3>{{ title }}</h3>
			<div class = "hint" v-if = "hint">{{ hint }}</div>
		</div>

		<pre class = "box"> {{ value || "..." }}</pre>
	</div>
</template>

<script setup>
defineProps({
	title: {type: String, required: true},
	hint: {type: String, default: ""},
	value: {type: String, default: ""}
})
</script>

<style scoped>
.result {
	margin-top: 16px;
	padding: 14px;
	border-radius: 16px;
	background: rgba(255, 255, 255, 0.06);
	border: 1px solid rgba(255, 255, 255, 0.14);
}

.top {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 12px;
	flex-wrap: wrap;
}

.hint {
	font-size: 12px;
	opacity: 0.8;
}

.box {
	margin-top: 10px;
	padding: 12px;
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.25);
	border: 1px solid rgba(255, 255, 255, 0.12);
	white-space: pre-wrap;
	word-break: break-word;
}
</style>