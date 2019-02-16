<template>
	<div>
		<heading head='Převody mezi soustavami'></heading>
		<b-row>
			<b-col cols='8'>
				<p>{{ task }}</p>
			</b-col>
		</b-row>		
		<div v-if='hinted'>
			<b-row>
				<p>{{ comment }}</p>
			</b-row>
			<b-row>
				<p>{{ hint }}</p>
			</b-row>
		</div>
		<div v-if='fromHint'>
			<b-row v-for='line in usedHintLines'>
				<p>{{ line }}</p>
			</b-row>
		</div>
		<div  v-if='hintWithInputs'>
			<b-row>
				<p>{{ currentLineHint }} =</p>
				<!-- v-model in two next forms is not supposed to be changed, it is unnecessary, so it is not binded-->
				<hint-form 
					style='margin-left: 15px; margin-right: 5px;'
					v-model='currentLinesInputs[0]'
					:placeHolder='place1'
					:correctResult='correctLinesInputs[0]'
					@change='checkHint'
					@keyup.native.enter='checkHint'>		
					<!--
				  	:correctResult='correct' -->					  		
				</hint-form>
				<p v-if='rest'> zb.:</p>
				<p v-if='add'> => </p>
				<hint-form
					v-if='both' 
					style='margin-left: 5px;'
					v-model='currentLinesInputs[1]'
					:placeHolder='place2'
					:correctResult='correctLinesInputs[1]'
					@change='checkHint'
					@keyup.native.enter='checkHint'>							  		
				</hint-form>
			</b-row>
		</div>
		<div class="result">
			<b-row v-if='hinted == false && specialHint == false'>
				<b-col cols='8'></b-col>
				<b-col cols='3'>
					<p @click='hints' class='hintstyle'>Nápovědu prosím</p>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="8"></b-col>
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
		</div>
		<ch-alerts :checked='checked' :result='result'></ch-alerts>
	</div>
</template>

<script>
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
				hint: '',
				comment: '',
				hinted: false,
				from: 0,
				to: 0,
				correctCalculation: [],
				resultsInputs: [],
				specialHint: false,
				placeHolders: [],
				usedHintLines: [], //string of used lines of decHint
				fromHint: false, //hint that shows up with dec to hex or binary conversion	
				currentLinesInputs: [],
				correctLinesInputs: [],
				currentLineHint: '',
				currentLineValues: '',
				lineNumber: 0,
				numberForHints: 0,
				BaseForHints: 0,
				hintWithInputs: false,
				both: false,
				rest: false,
				add: false,
				currentArray: [],
				currentString: '',
				place1: 'podíl',
				place2: 'zbytek',
				added: 0,
			}
		}, 
		components: {
			'heading': Heading,
			'ch-alerts': CheckAlerts,
			'hint-form': HinForm,
		},
		methods: {
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			convertNumber(n, fromBase, toBase) {
			  	if (fromBase === void 0) {
			  	  fromBase = 10;
			 	}
			 	if (toBase === void 0) {
			 	   toBase = 10;
				}
			 	return parseInt(n.toString(), fromBase).toString(toBase);
			},
			preposition(mode) {
				if (mode == 0) {
					return "ve";
				} else {
					return "v";
				}
			},
			resetAll() {
				this.hinted = false;
				this.checked = '';
				this.hint = '';
				this.comment = '';
				this.correctCalculation = [];
				for (let i = 0; i < this.resultsInputs.length; i++) {					
					this.$data.resultsInputs[i] = '';
				}
				this.specialHint = false;
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
				this.BaseForHints = 0;
				this.hintWithInputs = false;
				this.both = false;
				this.rest = false;
				this.add = false;
				this.place1 = 'podíl';
				this.place2 = 'zbytek';
				this.added = 0;
			},
			genTask() {
				this.resetAll();
				this.task = "Převeďte číslo ";
				var ArrayOfModes = [2, 10, 16];
				var ArrayOfTexts = ["dvojkové", "desítkové", "šestnáctkové"];
				var from = this.randomNumber(0, 2);
				var modeFrom = ArrayOfModes[from];
				this.from = modeFrom;
				var to = this.randomNumber(0, 2);
				while (to == from) {
					to = this.randomNumber(0, 2);
				}
				var modeTo = ArrayOfModes[to];
				this.BaseForHints = modeTo;
				this.to = modeTo;
				var number = this.convertNumber(this.randomNumber(1, 10000), 10, modeFrom).toUpperCase();
				this.numberForHints = number;
				this.task += number + " " + this.preposition(from) + " " + ArrayOfTexts[from] + " soustavě do " + ArrayOfTexts[to] + " soustavy."
				this.result = this.convertNumber(number, modeFrom, modeTo).toUpperCase();
			},
			hints() {
				if (this.from == 2 && this.to == 16 || this.from == 16 && this.to == 2) {
					this.hintWithInputs = true;
					this.fromHint = true;
					this.hexBin();
					this.place1 = 'převod';
				}
				if (this.to == 10) {
					this.hintWithInputs = true;
					this.fromHint = true;
					this.correctLinesInputs[1] = 0;
					this.toTen();
					this.place1 = 'převod';
					this.place2 = 'součet';
					this.both = true;
					this.add = true;
				}
				if (this.from == 10) {
					this.hintWithInputs = true;
					this.fromHint = true;
					this.fromTen();
					this.both = true;
					this.rest = true;
				}
			},
			fromTen() {		
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
			hexBin() {
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
			toTen() {
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
				console.log(equals + '  ' + this.numberForHints);
				this.correctLinesInputs[0] = "" + equals;
				console.log('this.added = ' + this.added);
				console.log(this.added + ' += ' + equals);
				this.added = Number(equals) + Number(this.added);	
				console.log('this.added = ' + this.added);			
				this.correctLinesInputs[1] = "" + this.added;
				this.currentLineValues = conversion + ' = ' + equals + ' => ' + this.added; 
			},
			checkHint() {
				if (this.currentLinesInputs[0].toUpperCase() == this.correctLinesInputs[0]) {		
					if (this.numberForHints == 0 || this.from != 10 && this.currentArray.length == this.lineNumber || this.from != 10 && this.currentArray[this.lineNumber+1] == undefined) {
						this.usedHintLines[this.lineNumber] = this.currentLineValues;
						this.hintWithInputs = false;
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
				if (this.checked == 'right') {
					this.genTask();
					return;
				}
				if (this.usersResult.toUpperCase() == this.result) {
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

<style>
	.result {
		margin-top: 50px;
	}
	.special {
		margin-top: 20px;
	}
	.inputWithBorder {
		max-height: 24px;
		max-width: 80px !important;
		padding: 0 0 0 0;
		display: inline !important;
	}
</style>