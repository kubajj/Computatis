<template>
	<div>
		<b-alert v-if="checked == 'right'" show variant="success">Správně</b-alert>
	    <b-alert v-else-if="checked == 'wrong'" show variant="danger" >Špatně. Správný výsledek je {{ result }}.</b-alert>
	</div>
</template>

<script>
	export default {
		props: ['checked', 'result'],
	}
</script> 

<style>
	.alert {
		margin-top: 6px;
	}
</style>