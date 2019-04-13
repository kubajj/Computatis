<template>
	<span>
		<span v-if='num == 1' class="num">&nbsp</span>
		<span v-if='num == 2' class="num">&nbsp&nbsp</span>
		<span v-if='num == 3' class="num">&nbsp&nbsp&nbsp</span>
		<span v-if='num == 4' class="num">&nbsp&nbsp&nbsp&nbsp</span>
		<span v-if='num == 5' class="num">&nbsp&nbsp&nbsp&nbsp&nbsp</span>
	</span>
</template>

<script>
	export default {		
		name: 'nbsp',
		introduction: 'Renders one to five times nbsp',
		description: `
			Renders non-breakable spaces.
		`,
		token: "<nbsp :num='maxSpaces - correctUnit.length'/>",
		props: {
			num: {
				type: Number,
				default: '',
				note: 'Number that says how many times &nbsp should be rendered'
			},
		},
	}
</script>

<style>
	.num {
		font-size: 20px;
	}
</style>