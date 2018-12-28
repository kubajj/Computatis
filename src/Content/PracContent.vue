<template>
	<div>
	<b-row>
		<b-col cols='2'></b-col>
		<b-col cols='8'>
	  		<b-jumbotron class='content'>
	    		<selection></selection>
			</b-jumbotron>
		</b-col>
		<b-col cols='2'></b-col>
	</b-row>
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