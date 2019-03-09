<template>
	<b-row>
		<h3>{{head}}</h3>
	</b-row>
</template>

<script>
	export default {
		props: ['head'],
	}
</script>

<style scoped>
	h3 {
		margin-top: 5px;
	}
</style>