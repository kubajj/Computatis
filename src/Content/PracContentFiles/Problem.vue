<template>
  <div>
  	<b-row>
  		<!--task></task-->
  	</b-row>
  	<b-row>
	    <b-form inline>
	      <label class="sr-only" for="inlineFormInputName2">Result</label>
	      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="1234" />
	    </b-form>
	</b-row>
  </div>
</template>


<script>
	import Task from './Task.vue'
	

	export default {
		components: {
			'task': Task
		}
	}
</script>