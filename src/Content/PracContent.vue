<template>
	<div class="obsah">	
		<selection></selection>
	</div>
</template>

<script>
	import Problem from './PracContentFiles/Problem.vue'
	import Selection from './PracContentFiles/Selection.vue'
	

	export default {
		components: {
			'selection': Selection,
			'problem': Problem
		}
	}
</script>