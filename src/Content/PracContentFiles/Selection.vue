<template>
  	<b-card no-body>
	  <b-tabs pills vertical>
	    <b-tab title="Rovnice" active>
	    	<problem></problem>
	    </b-tab>
	    <b-tab title="Aritmetika">
	    	<problem></problem>
	    </b-tab>
	    <b-tab title="Funkce">
	    	<problem></problem>
	    </b-tab>
	  </b-tabs>
	</b-card>
</template>


<script>
	import Problem from './Problem.vue'
	

	export default {
		components: {
			'problem': Problem
		}
	}
</script>