<template>
	<div>
		<heading head='Násobení'></heading>
		<span v-if='begin == false'><!-- this shows the task in normal mode - not using long multiplication-->
			<p>{{ number }} x {{ multiplier }} = </p>
			<p @click='giveHint' class='hintstyle'>Chci násobit pod sebou</p><!-- this adds a button that switches the mode to the one with long multiplication -->
		</span> 
		<span v-else>
			<div v-if='begin' class='first'><!-- this shows the first line of the task -->
				<nbsp :num='maxSpaces - 3'/>
				<span id="num">{{ number }}</span>
			</div>
			<div v-if='begin' class='second'><!-- this shows the second line of the task -->
				<nbsp :num='maxSpaces - 4'/>
				<span id="num" class="multi">x&nbsp{{ multiplier }}</span>
			</div>
			<b-row>	
				<b-col cols='8'>		
					<div>
						<span v-if='correctUnit[0] != "x"' class='wws'><!-- this shows the first line of the hint inputs -->
							<nbsp :num='maxSpaces - correctUnit.length'></nbsp><!-- spaces -->
							<span v-for='(correct, index) in correctUnit'>
								<hint-form 
									style='width: 12px; height: 24px;'
									v-model='resultsOfUnitInputs[index]'
								  	:correctResult='correct'/>
							</span>
						</span>
						<span class="wws"><!-- this shows the second line of the hint inputs -->
							<nbsp :num='maxSpaces - (correctDec.length + 1)'/><!-- spaces -->
							<span v-for='(correct, index) in correctDec'>
								<hint-form 
									style='width: 12px; height: 24px;'
									v-model='resultsOfDecInputs[index]'
									:correctResult='correct'/>
							</span>
							<span class='zero'>0</span>
						</span>
						<span><!-- this shows the last line of the hint inputs -->
							<hr v-if='maxSpaces == 4' class='secondLine4'><!-- horizontal line -->
							<hr v-else class='secondLine5'>
							<span v-for='(correct,index) in correctResultNumbers'>
								<hint-form 
									style='width: 12px; height: 24px;'
									v-model='resultsOfResInputs[index]'
								  	:correctResult='correct'
								  	@keyup.native='checkHint'
		                			@keyup.native.enter='check'/>
							</span>
						</span>
					</div>				
				</b-col>
			</b-row>
		</span>
		<b-row>
			<b-col cols='2' sm='2' md='4' lg='7' xl='8'/>
			<b-col cols="6" sm="6" md="6" lg="4" xl="3"><!-- this renders a form for the insertion of the result -->
				<b-form-input
		                type="text"
		                placeholder="Výsledek"
		                v-model="usersResult"
		                @keyup.native.enter='check'
		                id="inputRes"
		                style='margin: 5px 0px 5px 0px;'>                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="4" sm="4" md="2" lg="1" xl="1"><!-- this renders a button for the submission of the result -->
	        	<b-button @click="check" style='margin: 5px 0px 5px 0px;'>✔</b-button>
	        </b-col>
		</b-row>
		<b-row>
			<b-col>	
				<ch-alerts :checked='checked' :result='result'/><!-- this calls the ch-alerts component that shows the user the correct answer for the task or congratulates him for computing the correct result-->
			</b-col>
		</b-row>
	</div>
</template>

<script>//the following lines of code import the necessary components, which are later specified in the components section and used in the template part
	import {bus} from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'
	import Nbsp from './../DevelopComponents/Nbsp.vue'	
	import HintFormBorder from '../DevelopComponents/HintFormBorderSmall.vue'

	export default {
		data() {
			return {
				result: 0,
				usersResult: '',
				checked: '',
				multiplier: '',//second row
				number: '',//first row
				usersResult: '',
				begin: false,//boolean that stores information about mode (normal/long multiplication) - name is from begin multiplication
				resultsOfUnitInputs: [],//user inputs from first line of inputs
				resultsOfDecInputs: [],//user inputs from second line of inputs
				resultsOfResInputs: [],//user inputs from the last line of inputs
			}
		},
		components: {
			'vue-mathjax': VueMathjax,
			'heading': Heading,
			'ch-alerts': CheckAlerts,
			'hint-form': HintFormBorder,
			'nbsp': Nbsp,
		},
		methods: {
			randomNumber(min, max) {//this method generates a random number in the interval that was specified in the parentheses
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			genTask() {	//this method generates the task (more of a resetAll method)
				this.begin = false;
				this.multiplier = this.randomNumber(11, 99);
				this.number = this.randomNumber(101, 999);
				this.result = this.number * this.multiplier;
				this.checked = '';
				this.$data.usersResult = '';				
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
				this.$data.usersResult = '';
			}, 
			checkHint() {
				var allCorrect = true;
				var index = 0;
				for (let i = 0; i < this.maxSpaces; i++) {
					if (this.correctResultNumbers[i] != this.resultsOfResInputs[i]) {
						allCorrect = false;
					}
				}
				if (allCorrect == true) {
					this.checked = 'right';
				}
			},
			giveHint() {//shows the inputs
				this.begin = true;
				for (let i = 0; i < this.resultsOfResInputs.length; i++) {					
					this.$data.resultsOfResInputs[i] = '';
					this.$data.resultsOfUnitInputs[i] = '';
					this.$data.resultsOfDecInputs[i] = '';
				} 
			},
			grade(givenNum) {//shows the maximal grade of the number
				return Math.ceil(Math.log10(givenNum));
			},
		},
		computed: {
			decimal() {//the decimal part of multiplier
				var dec = (this.multiplier - (this.multiplier % 10)) / 10;
				return dec;
			},
			decRes() {//the result of the multiplication between number and decimal
				return this.decimal * this.number;
			},
			unit() {//the unit part of multiplier
				var uni = this.multiplier % 10;
				return uni;
			},
			unitRes() {//the result of the multiplication between number and unit
				var ur = this.unit * this.number;
				return ur;
			},
			correctUnit() {//an array of numbers of the unitRes
				var arr= [];
				var unit = '' + this.unitRes;
				arr = unit.split("");
				if (this.unitRes == 0) {
					return ['x'];
				}
				return arr;
			},
			correctDec() {//an array of numbers of the decRes
				var arr= [];
				var dec = '' + this.decRes;
				arr = dec.split("");
				return arr;
			},
			correctResultNumbers() {//digits of the result
				var res = this.number * this.multiplier;
				res = '' + res;
				var arr = res.split("");
				return arr;
			},
			maxSpaces() {//number of digits of the result
				return this.correctResultNumbers.length;
			},
		},
		beforeMount() {//generates the task when the component loads
			this.genTask();
		},
		mounted() {//enables the usage of next method in PracContent.vue
		    bus.$on('next', this.genTask);
		    //resets all three input arrays
		    this.resultsOfUnitInputs = this.correctUnit.map(() => '')
			this.resultsOfDecInputs = this.correctDec.map(() => '')
			this.resultsOfResInputs = this.correctResultNumbers.map(() => '')
		},  
	}
</script>

<style>
	#num {
		margin-bottom: 0px !important;
		font-size: 20px;
		font-family: monospace;
	}
	.multi {
		text-decoration: underline;
	}
	.hint {
		margin-bottom: 6px;
	}
	p {
		margin-bottom: none;
	}
	#text {
		display: none;
	}
	span {
	  padding: 0 0 0 0;
	  margin: 0;
	}
	.first {
		display: flex;
		flex-direction: row;
	}
	.second {
		display: flex;
		flex-direction: row;
	}
	.inputWithBorderSmall {
		max-height: 24px;
		max-width: 12px !important;
		padding: 0 0 0 0;
		display: inline !important;
	}
	.wws { /*without weird space*/
		display: flex;
		flex-direction: row;
	}
	.secondLine4 {
		background-color: black;
		margin: 0 0 0 0;
		display: flex;
		width: 48px;
	}
	.secondLine5 {
		background-color: black;
		margin: 0 0 0 0;
		display: flex;
		width: 60px;
	}
	.zero {
		font-size: 20px;
		font-family: monospace;
	}
</style>

