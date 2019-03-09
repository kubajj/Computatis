<template>
	<div>
		<heading head='Převody mezi soustavami'></heading>
		<b-row>
			<b-col cols='8'>
				<p>{{ task }}</p><!-- this shows the task -->
			</b-col>
		</b-row>	
		<div v-if='fromHint'>
			<b-row v-for='line in usedHintLines'>
				<p>{{ line }}</p>
			</b-row>
		</div>
		<div v-if='hinted'><!-- this renders the hint forms and all the necessary text around it -->
			<b-row>
				<p>{{ currentLineHint }} =</p>
				<!-- v-model in two next forms is not supposed to be changed, it is unnecessary, so it is not binded-->
				<hint-form 
					style='margin-left: 15px; margin-right: 5px;'
					v-model='currentLinesInputs[0]'
					:placeHolder='placeHolders[0]'
					:correctResult='correctLinesInputs[0]'
					@change='checkHint'
					@keyup.native.enter='checkHint'/>
				<p v-if='rest'> zb.:</p>
				<p v-if='add'> => </p>
				<hint-form
					v-if='both' 
					style='margin-left: 5px;'
					v-model='currentLinesInputs[1]'
					:placeHolder='placeHolders[1]'
					:correctResult='correctLinesInputs[1]'
					@change='checkHint'
					@keyup.native.enter='checkHint'/><!-- in some modes, the second form is not used, so it has a dedicated variable, which says, if it is shown or not-->
			</b-row>
		</div>
		<div class="result">
			<b-row v-if='hinted == false'><!-- this shows the hint button and describes its function -->
				<b-col cols='8'/>
				<b-col v-if='end == false' cols='3'>
					<p @click='hints' class='hintstyle'>Nápovědu prosím</p>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="8"/>
				<b-col cols="3"><!-- this renders a form for the insertion of the result -->
					<b-form-input
			                type="text"
			                placeholder="Výsledek"
			                v-model="usersResult"
			                @keyup.native.enter='check'
			                id="inputForm"/>
			    </b-col>
		        <b-col cols="1">
		        	<b-button @click="check">✔</b-button>
		        </b-col>
			</b-row>	
		</div>
		<ch-alerts :checked='checked' :result='result'/><!-- this calls the ch-alerts component that shows the user the correct answer for the task or congratulates him for computing the correct result-->
	</div>
</template>

<script>//the following lines of code import the necessary components, which are later specified in the components section and used in the template part
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'
	import HinForm from './../DevelopComponents/HintFormBorder.vue'
	
	export default {
		data() {
			return {
				task: '',
				usersResult: '',
				checked: '',
				result: '',
				hinted: false,
				from: 0,//base from
				to: 0,//base to
				usedHintLines: [], //string of used lines of decHint
				fromHint: false, //hint that shows up with dec to hex or binary conversion	
				currentLinesInputs: [],//user inputs on the last line with inputs
				correctLinesInputs: [],//correct values for the ćurrentLinesInputs
				currentLineHint: '',//the prefix for the current line
				currentLineValues: '', //whole current line including values which should be inserted by user
				lineNumber: 0, //line of number - it is used as an index for the usedHintLines array
				numberForHints: 0,//number generated in the genTask method stored for other methods
				both: false,//show both inputs in line
				rest: false,//show "zb.:"
				add: false,//show "=>"
				currentArray: [],//array that is used in toTen and hexBin conversions - it is currentString split to chars
				currentString: '',//string that is used in toTen and hexBin conversions - it is the numberForHints as a string
				placeHolders: ['podíl', 'zbytek'],//placeholders of the line inputs
				added: 0,//sum of the previous results
				end: false,
			}
		}, 
		components: {
			'heading': Heading,
			'ch-alerts': CheckAlerts,
			'hint-form': HinForm,
		},
		methods: {
			randomNumber(min, max) {//this method generates a random number in the interval that was specified in the parentheses
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			convertNumber(n, fromBase, toBase) {//this method converts numbers from one system to another - (number, from, to)
			  	if (fromBase === void 0) {
			  	  fromBase = 10;
			 	}
			 	if (toBase === void 0) {
			 	   toBase = 10;
				}
			 	return parseInt(n.toString(), fromBase).toString(toBase);
			},
			preposition(mode) {//this method returns correct preposition ("v/ve" equals to the preposition "in" in English)
				if (mode == 0) {
					return "ve";
				} else {
					return "v";
				}
			},
			resetAll() { //this method resets all variables that have been changed and will be used in the next call of genTask
				this.hinted = false;
				this.checked = '';
				this.task = "Převeďte číslo ";
				this.placeHolders = [];
				this.lastIndex = 0;
				this.usedHintLines= [];
				this.fromHint = false;
				this.currentLinesInputs = [];
				this.correctLinesInputs = [];
				this.currentLineHint = '';
				this.currentLineValues = '';
				this.lineNumber = 0;
				this.numberForHints = 0;
				this.hinted = false;
				this.both = false;
				this.rest = false;
				this.add = false;
				this.placeHolders = ['podíl', 'zbytek'];
				this.added = 0;
				this.end = false;
			},
			genTask() {//this method generates the task
				this.resetAll();//calls resetAll method
				var ArrayOfModes = [2, 10, 16];
				var ArrayOfTexts = ["dvojkové", "desítkové", "šestnáctkové"];
				var from = this.randomNumber(0, 2);//chooses 'from' base
				var modeFrom = ArrayOfModes[from];
				this.from = modeFrom;
				var to = this.randomNumber(0, 2);
				while (to == from) {
					to = this.randomNumber(0, 2);//chooses 'to' base
				}
				var modeTo = ArrayOfModes[to];
				this.to = modeTo;
				var number = this.convertNumber(this.randomNumber(1, 10000), 10, modeFrom).toUpperCase();//generate a random dec number and converts it to the base from which the user is supposed to convert
				this.numberForHints = number;
				this.task += number + " " + this.preposition(from) + " " + ArrayOfTexts[from] + " soustavě do " + ArrayOfTexts[to] + " soustavy."//finishes the task
				this.result = this.convertNumber(number, modeFrom, modeTo).toUpperCase();//the assign correct result to this.result
			},
			hints() { //this method chooses the proper method fro the hint and set variable to correct values, so everything works properly
				if (this.from == 2 && this.to == 16 || this.from == 16 && this.to == 2) { //calls hexBin -> from hexadecimal to binary or reversed
					this.hinted = true;
					this.fromHint = true;
					this.hexBin();
					this.placeHolders[0] = 'převod';
				}
				if (this.to == 10) { //calls toTen - this.to is 10
					this.hinted = true;
					this.fromHint = true;
					this.correctLinesInputs[1] = 0;
					this.toTen();
					this.placeHolders[0] = 'převod';
					this.placeHolders[1] = 'součet';
					this.both = true;
					this.add = true;
				}
				if (this.from == 10) { //calls fromTen - this.from is 10
					this.hinted = true;
					this.fromHint = true;
					this.fromTen();
					this.both = true;
					this.rest = true;
				}
			},
			fromTen() {		//shows the user inputs and lets him divide numbers and fill in the rest of the divisions - user is then supposed to read them bottom-up and fill this in the result input
				var division = this.numberForHints + ' / ' + this.to;
				this.currentLineHint = division;
				var times = Math.floor(this.numberForHints / this.to);
				var modulo = this.numberForHints % this.to;
				console.log(times + '  ' + modulo + ' ' + this.numberForHints);
				this.numberForHints = times;
				this.correctLinesInputs[0] = "" + times;
				this.correctLinesInputs[1] = "" + modulo;
				if (this.to == 16 && modulo > 9) {
					var simplifier = this.convertNumber(modulo, 10, 16).toUpperCase();
					this.currentLineValues = division + ' = ' + times + ' zb.: ' + modulo + ' (' + simplifier + ')'; 
				} else {
					this.currentLineValues = division + ' = ' + times + ' zb.: ' + modulo; 
				}
			},
			hexBin() { //either 4 numbers in bin equals 1 in hex or one in hex equals 4 in bin
				if (this.lineNumber == 0 && this.to == 2) {
					this.currentString = "" + this.numberForHints;
					this.currentArray = this.currentString.split(""); //this command makes an array of chars from the numberForHints
				} else if (this.lineNumber == 0 && this.to == 16) {
					var positions = this.numberForHints.length;
					var end = positions % 4;
					positions -= end;
					var i = 0;
					this.currentString = "" + this.numberForHints;
					if (end != 0) {
						this.currentArray[i++] = this.currentString.substr(0, end);
						this.currentString = this.currentString.slice(end);
					}
					while(positions > 0)  {
						this.currentArray[i++] = this.currentString.substr(0, 4);
						this.currentString = this.currentString.slice(4);
						positions -= 4;
					}
				}
				var current = this.currentArray[this.lineNumber];
				var conversion = current + ' -> ' + this.to;
				this.currentLineHint = conversion;
				var equals = this.convertNumber(current, this.from, this.to).toUpperCase();
				console.log(equals + '  ' + this.numberForHints);
				this.correctLinesInputs[0] = "" + equals;
				if (this.lineNumber != 0 && this.from == 16) {
					if (equals.length == 1) {
						equals = "000" + equals;
					}
					if (equals.length == 1) {
						equals = "00" + equals;
					}
					if (equals.length == 3) {
						equals = "0" + equals;
					}
				}
				this.currentLineValues = conversion + ' = ' + equals; 
			},
			toTen() { //this method lets the user convert each number independently and then compute the result
				if (this.lineNumber == 0) {
					this.currentString = "" + this.numberForHints;
					this.currentArray = this.currentString.split(""); //this command makes an array of chars from the numberForHints
					this.correctLinesInputs[1] = 0;
				}
				if(this.from == 2) {
					var current = this.currentArray[this.lineNumber]*Math.pow(10, this.numberForHints.length - 1 - this.lineNumber);
				} else {
					var dec = this.convertNumber(this.currentArray[this.lineNumber], 16, 10);
					var decVal = dec*Math.pow(16, this.numberForHints.length - 1 - this.lineNumber);
					var decValHex = this.convertNumber(decVal, 10, 16).toUpperCase();

					var current = decValHex;
				}
				var conversion = current + ' -> ' + 10;
				this.currentLineHint = conversion;
				var equals = this.convertNumber(current, this.from, this.to);
				this.correctLinesInputs[0] = "" + equals;
				this.added = Number(equals) + Number(this.added);		
				this.correctLinesInputs[1] = "" + this.added;
				this.currentLineValues = conversion + ' = ' + equals + ' => ' + this.added; 
			},
			checkHint() { //this method checks whether the correctResults of the inputs are at least similar (upper/lower case does not matter) and reacts to this information
				if (this.currentLinesInputs[0].toUpperCase() == this.correctLinesInputs[0]) {		
					if (this.numberForHints == 0 || this.from != 10 && this.currentArray.length == this.lineNumber || this.from != 10 && this.currentArray[this.lineNumber+1] == undefined) {
						this.usedHintLines[this.lineNumber] = this.currentLineValues;
						this.hinted = false;
						this.end = true;
						return;
					}
					if (this.from == 10 && this.currentLinesInputs[1] != this.correctLinesInputs[1] || this.to == 10 && this.currentLinesInputs[1] != this.correctLinesInputs[1]) {
						return;
					}
					var line = this.lineNumber++;
					this.usedHintLines[line] = this.currentLineValues;
					console.log('tak jsem tu');
					if (this.from == 10) {
						this.fromTen();	
					} else if (this.to != 10) {
						this.hexBin();
					} else {
						this.toTen();
					}
					this.currentLinesInputs[0] = '';
					this.currentLinesInputs[1] = '';			
				}
			},
			check() {
				if (this.checked == 'right') {//if the user result is right and user presses enter 2 times, it generates next task
					this.genTask();
					return;
				}
				if (this.usersResult.toUpperCase() == this.result) {//checks if the user result (inserted to input) is right
					this.checked = 'right';
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputForm").value = '';
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

<style>
	.result {
		margin-top: 50px;
	}
	.special {
		margin-top: 20px;
	}
	.inputWithBorder { /*this fixes the size of hint inputs*/
		max-height: 24px;
		max-width: 80px !important;
		padding: 0 0 0 0;
		display: inline !important;
	}
</style>
