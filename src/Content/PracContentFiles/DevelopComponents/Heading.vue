<template>
	<b-col cols='4'>
		<vue-mathjax :formula="heading" class="heading"></vue-mathjax>
	</b-col>
</template>

<script>
	export default {
		props: ['head'],
		data() {
			return {
				heading: '$$\\text{' + this.head + '}$$',
			}
		}
	}
</script>

<style scoped>
	.heading {
		font-size: 150%;
	}
</style>