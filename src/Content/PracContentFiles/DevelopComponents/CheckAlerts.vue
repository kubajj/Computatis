<template>
	<div>
		<b-alert v-if="checked == 'right'" show variant="success">Správně <b-button @click='next' class='right'><strong>></strong></b-button></b-alert>
	    <b-alert v-else-if="checked == 'wrong'" show variant="danger" >Špatně. Správný výsledek je {{ result }}. <b-button @click='next' class='wrong'><strong>></strong></b-button></b-alert>
	</div>
</template>

<script>
	import {bus} from './../../../main.js'

	export default {
		name: 'ch-alerts',
		introduction: 'Alert that shows user whether his result is correct or not',
		description: `
			Shows an alert green alert with 'Správně' when users result is right and red alert with 'Špatně' when it is not.
		`,
		token: "<ch-alerts :checked='checked' :result='result'/>",
		props: {
			checked: {
				type: String,
				default: '',
				note: 'Whether users result is right or wrong'
			},
			result: {
				type: String,
				default: '',
				note: 'Correct result'
			}
		},
		methods: {			
			next() {
				bus.$emit('next');
			}
		}
	}
</script> 

<style>
	.alert {
		margin-top: 6px;
	}
	.btn.btn-secondary.right {
		font-size: 15px;
		background-color: #87e59d;
	}
	.btn.btn-secondary.wrong {
		font-size: 15px;
		background-color: #ed5c5c;
	}
</style>