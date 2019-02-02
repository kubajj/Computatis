<template>
	<div>
		<heading head='Převody mezi soustavami'></heading>
		<b-row>
			<b-col cols='8'>
				<vue-mathjax :formula="task"/>
			</b-col>
		</b-row>		
		<div v-if="hinted">
			<b-row><p> </p></b-row>
			<b-row>
				<b-col cols='8'>
					<vue-mathjax :formula="comment"/>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols='8'>
					<vue-mathjax :formula="hint"/>
				</b-col>
			</b-row>
		</div>
		<b-row v-if='specialHint' class='special'>
			<span v-for='(correct, index) in correctCalculation'>
				<hint-form 
					v-model='resultsInputs[index]'
					:placeHolder='placeHolders[index]'
				  	:correctResult='correct'>							  		
				</hint-form>
			</span>
		</b-row>
		<div class="result">
			<b-row v-if='hinted == false && specialHint == false'>
				<b-col cols='8'></b-col>
				<b-col cols='3'>
					<p @click='hints(from, number, to)' class='hintstyle'>Nápovědu prosím</p>
				</b-col>
			</b-row>
			<b-row v-if='hinted == true && placeHolders.length != 0'>
				<b-col cols='8'></b-col>
				<b-col cols='3'>
					<p @click='specialHintCommand' class='hintstyle'>Další nápovědu prosím</p>
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
				comment: '$$ boooom $$',
				hinted: false,
				from: '',
				number: '',
				to: '',
				correctCalculation: [],
				resultsInputs: [],
				specialHint: false,
				placeHolders: [],
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
			},
			genTask() {
				this.resetAll();
				this.task = "$$\\text {Převeďte číslo }";
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
				this.to = modeTo;
				var number = this.convertNumber(this.randomNumber(1, 10000), 10, modeFrom);
				this.number = number;
				this.task += number + "\\text { " + this.preposition(from) + " " + ArrayOfTexts[from] + " soustavě do " + ArrayOfTexts[to] + " soustavy.}"
				this.result = this.convertNumber(number, modeFrom, modeTo);
				this.task += "$$";
			},
			hints(modeFrom, number, modeTo) {
				if (modeFrom == 2 && modeTo == 16) {
					var positions = Math.ceil(Math.log10(number));
					var end = positions % 4;
					this.comment = "$$\\text {Každá část čísla ve dvojkové soustavě odpovídá jednomu číslu v šestnáctkové.}$$"
					var hint = "$$\\text{" + number.substr(0, end);
					number = number.slice(end);
					while(positions > 0)  {
						hint += " " + number.substr(0, 4);
						number = number.slice(4);
						positions -= 4;
					}
					hint += "}\\\\$$";
					this.hint = hint;
				}
				if (modeFrom == 16 && modeTo == 2) {
					this.comment = "$$\\text {Převeďte každou cifru zvlášť. Jedna cifra odpovídá čtyřem ve dvojkové soustavě.}$$"
				}
				if (modeFrom == 10 && modeTo == 16) {
					this.comment = "$$\\text {Opakujte dělení číslem 16, zapisujte si zbytky po dělení a nakonec otočte jejich pořadí.}$$"
				}
				if (modeFrom == 10 && modeTo == 2) {
					this.comment += "$$\\text {Opakujte dělení číslem 2, zapisujte si zbytky po dělení a nakonec otočte jejich pořadí.}$$"
				}
				if (modeTo == 10) {
					this.toTen(modeFrom, number);
				}
				this.hinted = true;
			},
			toTen(from, number) {
				this.comment = "$$\\text {Umocněte " + from + " na číslo pod čárou a vynásobte ho tím nad ní.}$$"
				var positions = number.length;
				this.hint = "$$";
				var index = 0;
				while(positions > 0) {
					var multiplier = this.convertNumber(number.substr(0, 1), from, 10)
					this.hint += "\\text {       } \\frac {" + multiplier + "}{" + (positions - 1) + "} \\text {     } ";
					this.placeHolders[index] = multiplier + "x" + from + "^" + (positions - 1);
					this.correctCalculation[index++] =  multiplier * Math.pow(from, positions - 1);
					number = number.slice(1);
					positions--;
				}
				this.hint += "$$";
			},
			specialHintCommand() {
				this.specialHint = true;
				this.hinted = false
			},
			check() {
				if (this.checked == 'right') {
					this.genTask();
					return;
				}
				if (this.usersResult.toLowerCase() == this.result) {
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