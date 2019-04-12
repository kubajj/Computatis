<template>
	<div>
		<b-row>
			<heading head='Sčítání a odčítání do 100'></heading>
		</b-row>
		<b-row style='margin-top: 5px;'>
			<b-col cols="12" sm='12' md='10' lg='8' xl='8'>
				<vue-mathjax :formula="task"></vue-mathjax><!-- this shows the task -->
			</b-col>
		</b-row>
		<b-row>
	        <b-col cols='2' sm='2' md='4' lg='7' xl='8'/>
			<b-col cols="6" sm="6" md="6" lg="4" xl="3"><!-- this renders a form for the insertion of the result -->
				<b-form-input
		                type="text"
		                placeholder="Výsledek"
		                v-model="usersResult"
		                @keyup.native.enter='check'
		                id="inputForm"
		                style='margin: 5px 0px 5px 0px;'>                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="4" sm="4" md="2" lg="1" xl="1"><!-- this renders a button for the submission of the result -->
	        	<b-button @click="check" style='margin: 5px 0px 5px 0px;'>✔</b-button>
	        </b-col>
		</b-row>
		<ch-alerts :checked='checked' :result='result'/><!-- this calls the ch-alerts component that shows the user the correct answer for the task or congratulates him for computing the correct result-->
	</div>
</template>

<script>//the following lines of code import the necessary components, which are later specified in the components section and used in the template part
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
				max: 100,//maximal value
				maxQuantity: 8,//maximal quantity of terms
				modal: false,
			}
		},
		components: {
			'vue-mathjax': VueMathjax,
			'heading': Heading,
			'ch-alerts': CheckAlerts,
		},
		methods: {
			randomNumber(min, max) {//this method generates a random number in the interval that was specified in the parentheses
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			sign() {//this method simplifies the process of having numbers with negative value while not including 0
				var arr = [1, -1];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			genTask() {	//this method generates the task					
				this.$data.usersResult = '';
			    this.checked = ''
			    var quantity = this.randomNumber(3, this.maxQuantity);	
			    var first = this.randomNumber(1, this.max)*this.sign();
			    this.task = '$$' + first;
			    var currentValue = first;
			    for (let i = 1; i < quantity; i++) {
			    	var newNumber = this.randomNumber(-currentValue, (100 - currentValue) > 100 ? 100 : (100 - currentValue));
			    	currentValue += newNumber;
			    	if (newNumber > 0) {
			    		this.task += '+' + newNumber;
			    	} else if (newNumber == 0) {
			    		//skip
			    	} else {
				    	this.task += newNumber; 
				    }
			    }
			    this.result = currentValue;
			    this.task += ' = $$';
			},
			check() {
				if (this.checked == 'right') {//if the user result is right and user presses enter 2 times, it generates next task
					this.genTask();
					return;
				}
				if (this.usersResult == this.result) {//checks if the user result (inserted to input) is right
					this.checked = 'right';
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputForm").value = '';
				this.$data.usersResult = '';
			}, 
		},
		beforeMount() {//generates the task when the component loads
			this.genTask();
		},
		mounted() {//enables the usage of next method in PracContent.vue
		    bus.$on('next', this.genTask);
		},  
	}
</script>

