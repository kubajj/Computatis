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
	.heading {
		font-size: 150%;
	}
</style>