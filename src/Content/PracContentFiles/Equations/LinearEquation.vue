<template>
	<div>
		<heading head='Lineární rovnice'></heading>
		<b-row>
			<b-col cols='12' sm="10" md="9" lg="8" xl="8">
				<vue-mathjax :formula="task"/> <!-- this shows the task in the mathjax format -->
			</b-col>
		</b-row>
		<b-row>&nbsp</b-row>
		<b-row>
			<b-col v-if='same' cols='12' sm="10" md="9" lg="8" xl="8"/>
			<b-col v-else cols='12' sm="10" md="9" lg="7" xl="8"><!-- this shows the hint button and describes its function -->
				<span v-if='!hinted' @click='hint' class='hintstyle'>Nápovědu prosím</span>
				<span v-else><vue-mathjax :formula="hintValue"/></span>
			</b-col>
			<b-col cols="8" sm="7" md="6" lg="4" xl="3"><!-- this renders a form for the insertion of the result -->
				<b-form-input
		                type="text"
		                placeholder="Výsledek"
		                v-model="usersResult"
		                @keyup.native.enter='check'
		                id="inputForm"
		                style='margin-bottom: 5px;'>                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="4" sm="3" md="2" lg="1" xl="1"><!-- this renders a button for the submission of the result -->
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>	
		<ch-alerts :checked='checked' :result='result'></ch-alerts><!-- this calls the ch-alerts component that shows the user the correct answer for the task or congratulates him for computing the correct result-->
	</div>
</template>

<script>//the following lines of code import the necessary components, which are later specified in the components section and used in the template part
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'

	export default {
		name: 'linear-equation',
		introduction: 'Linear equation component',
		description: `
			Task to practice the solution of liear equations.
		`,
		token: "<linear-equation/>",
		data() {
			return {
				task: '',
				usersResult: '',
				checked: '',
				result: '',
				hinted: false,
				hintValue: '',//this variable consists of number of xs = number of values
				theSame: '',//this boolean stores true if the task and hintValue are completely same
			}
		}, 
		components: {
			'heading': Heading,
			'ch-alerts': CheckAlerts,
		},
		methods: {
			randomNumber(min, max) { //this method generates a random number in the interval that was specified in the parentheses
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			sign() { //this method simplifies the process of having numbers with negative value while not including 0
				var arr = [1, -1];
				var rnd = this.randomNumber(0,1);
				return arr[rnd]; //it returns 1 or -1
			},
			variants() { //this method decide whether the number, which was generated will be number of xs or just number
				var arr = ['x', 'n'];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			position() {	//b == before "=", a == after "="			
				var arr = ['b', 'a'];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			resetAll() { //this method resets all variables that have been changed and will be used in the next call of genTask
				this.checked = '';
				this.usersResult = '';				
				this.task = '';
				this.result = '';
				this.hinted = false;
				this.same = false;
			},
			hint() { //shows hint
				this.hinted = true;
			},
			genTask() { //this method generates the task
				this.resetAll();
				var quantity = this.randomNumber(1, 5);
				var rationalResult = false; //the result should be only k, k/2 or k/4, so it is easier to be inserted in the result input
				while (!rationalResult) { //if the final result is not rational it renders again with different number
					var xs = this.randomNumber(1, 50)*this.sign();
					var firstx = this.controlX(xs);
					var firstnum = this.randomNumber(1, 50)*this.sign();
					var tmpstringb = '$$' + firstx + 'x'; //assigning two variables for before = and after it
					var tmpstringa = '=' + firstnum;
					var numbers = firstnum;
					for (let i = 1; i < quantity; i++) { //generates random numbers and includes them to tmp string
						var tmpnumber = this.randomNumber(1, 50)*this.sign();
						var tmpvalue = '';
						var variant = this.variants()
						if (variant == 'x') {
							var currentX = this.controlX(tmpnumber);
							if (tmpnumber < 0) {
								tmpvalue += tmpnumber + 'x';
							} else {
								tmpvalue += '+' + tmpnumber + 'x';
							}
						} else {
							if (tmpnumber < 0) {
								tmpvalue += tmpnumber;
							} else {
								tmpvalue += '+' + tmpnumber;
							}						
						}
						if (this.position() == 'b') {
							if (variant == 'x') {
								xs += tmpnumber;
							} else {
								numbers -= tmpnumber;
							}
							tmpstringb += tmpvalue;
						} else {
							if (variant == 'x') {
								xs -= tmpnumber;
							} else {
								numbers += tmpnumber;								
							}
							tmpstringa += tmpvalue;
						}
					}
					var x = (numbers / xs); //counts the ratio of the result if it is not whole number, half or a quarter, it has to be computed again
					if ((x % 1 == 0 || x % 1 == 0.5 || x % 1 == 0.25) && numbers != 0) {
						rationalResult = true;
						this.task = tmpstringb + tmpstringa + '$$'
						if (xs < 0) {
							xs = - xs;
							numbers = -numbers;
						}
						if (xs == 1) {
							xs = '';
						} 
						if (xs == -1) {
							xs = '-';
						}
						this.hintValue = '$$' + xs + 'x=' + numbers + '$$';
						if (this.task == this.hintValue) {
							this.same = true;
						}
						break;
					} else {
						continue;
					}
				}
				this.result = x;
			},
			controlX(x) { //this method handles the avoidance of having 1x and -1x, which are substituted by only x and -x
				if (x == 1) {
					return '';
				} else if (x == -1) {
					return '-';
				} 
				return x;
			},
			check() {
				if (this.checked == 'right') { //if the user result is right and user press enter 2 times, it generates next task
					this.genTask();
					return;
				}
				if (this.usersResult == this.result) { //checks if the user result (inserted to input) is right
					this.checked = 'right';
					this.same = true; //if the hint was not used and user answered correctly, the hint button hides
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputForm").value = '';
			}, 
		},
		beforeMount() { //generates the task when the component loads
			this.genTask();
		},
		mounted() { //enables the usage of next method in PracContent.vue
		    bus.$on('next', this.genTask);
		},  
	}
</script>