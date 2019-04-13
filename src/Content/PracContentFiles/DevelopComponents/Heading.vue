<template>
	<b-row>
		<h3>{{head}}</h3>
	</b-row>
</template>

<script>
	export default {
		name: 'heading',
		introduction: 'United heading',
		description: `
			Renders a heading of a component with the same styling for all.
		`,
		token: "<heading head='Lineární rovnice'/>",
		props: {
			head: {
				type: String,
				default: '',
				note: 'Heading of the component'
			},
		},
	}
</script>

<style scoped>
	h3 {
		margin-top: 5px;
	}
</style>