<template>
	<div>
		<heading head='Sčítání a odčítání čísel do 100'></heading>
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
	import {bus} from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'

	export default {
		data() {
			return {
				result: 0,
				usersResult: '',
				checked: '',
				task: '',
			}
		},
		components: {
			'vue-mathjax': VueMathjax,
			'heading': Heading,
			'ch-alerts': CheckAlerts,
		},
		methods: {
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			genTask() {		/* počítat to za chodu, ne předgenerovat pole čísel */
				var notOK = true;
				var quantity = this.randomNumber(3, 8);				
				while (notOK) {	
					var	task = "$$";
					var result = 0;
					var previous = 0;
					var current = 0;
					var first = true;
					var min = 1;
					var max = 100;
					for (let i = 0; i < quantity; i++) {
						if (!first) {
							if (previous > 0) {								
								min = - previous;
								max = 100 - previous; 
							} else {
								min = previous;
								max = - 100 - previous; 
							}
						} 
						current = this.randomNumber(min, max);
						if (current < 0 || first == true) {
							task += current;
						} else {
							task += '+' + current
						}						
						first = false;
						result += current;
						previous = current;
					}
				    if (result >= 0 && result <= 100) {
				    	notOK = false;
				    } else {
				    	continue;
				    }
				}
			   	task += " = $$";
			    this.result = result;
			    this.task = task;
			    this.checked = '';
			    return task;
			},
			check() {
				if (this.checked == 'right') {
					this.genTask();
					return;
				}
				if (this.usersResult == this.result) {
					this.checked = 'right';
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputForm").value = '';
			}, 
		},
		beforeMount() {
			this.genTask();
		},
		mounted() {
		    bus.$on('next', this.genTask);
		},  
	}
</script>

