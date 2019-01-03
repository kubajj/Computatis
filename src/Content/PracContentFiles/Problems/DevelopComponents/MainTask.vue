<template>
	<div>
		<b-row>
			<b-col cols="8">
				<vue-mathjax :formula="task"></vue-mathjax>
			</b-col>
			<b-col cols="3">
				<b-form-input
		                type="text"
		                placeholder="Výsledek"
		                v-model="usersResult"
		                @keyup.native.enter='check'
		                id="inputForm">                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="1">
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>	
		<ch-alerts :checked='checked' :result='result'></ch-alerts>
	</div>
</template>

<script>
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'
	import { VueMathjax } from 'vue-mathjax'

	export default {
		data() {
			return {
				usersResult: '',
			}
		},
		props: ['task', 'result', 'checked'],
		components: {			
			'ch-alerts': CheckAlerts,
		},
		methods: {			
			check() {
				if (this.usersResult == this.result) {
					this.checked = 'right';
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputForm").value = '';
			}, 
		}
	}
</script> 