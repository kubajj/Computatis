<template>
	<div>
		<heading head='Násobení'></heading>
		<span v-if='begin == false'>
			<p>{{ number }} x {{ multiplier }} = </p>
			<p @click='giveHint' class='hintstyle'>Chci násobit pod sebou</p>
		</span>
		<span v-else>
			<div v-if='begin' class='first'>
				<nbsp :num='maxSpaces - 3'/>
				<span id="num">{{ number }}</span>
			</div>
			<div v-if='begin' class='second'>
				<nbsp :num='maxSpaces - 4'/>
				<span id="num" class="multi">x&nbsp{{ multiplier }}</span>
			</div>
			<b-row>	
				<b-col cols='8'>		
					<div>
						<span v-if='unitArray[0] != "x"' class='wws'>
							<nbsp :num='maxSpaces - unitArray.length'></nbsp>
							<span v-for='(correct, index) in correctUnit'>
								<hint-form 
									v-model='resultsOfUnitInputs[index]'
								  	:correctResult='correct'>							  		
								</hint-form>
							</span>
						</span>
						<span class="wws">
							<nbsp :num='maxSpaces - (decArray.length + 1)'/>
							<span v-for='(correct, index) in correctDec'>
								<hint-form 
									v-model='resultsOfDecInputs[index]'
									:correctResult='correct'>								
								</hint-form>
							</span>
							<span class='zero'>0</span>
						</span>
						<span>
							<hr v-if='maxSpaces == 4' class='secondLine4'>
							<hr v-else class='secondLine5'>
							<span v-for='(correct,index) in correctResultSpaces'>
									<hint-form 
										v-model='resultsOfResInputs[index]'
									  	:correctResult='correct'>							  		
									</hint-form>
								</span>
						</span>
					</div>				
				</b-col>
			</b-row>
		</span>
		<b-row>
			<b-col cols="8"></b-col>
			<b-col cols="3">
				<b-form-input						
		                type="text"
		                placeholder="Výsledek"
		                v-model="usersResult"
		                @keyup.native.enter='check'
		                id="inputRes">                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="1">
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>
		<b-row>
			<b-col>	
				<ch-alerts :checked='checked' :result='result'></ch-alerts>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import {bus} from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'
	import Nbsp from './../DevelopComponents/Nbsp.vue'	
	import HintFormBorder from '../DevelopComponents/HintFormBorder.vue'

	export default {
		data() {
			return {
				result: 0,
				usersResult: '',
				checked: '',
				multiplier: '',
				number: '',
				usersResult: '',
				hinted1: false,
				spacesNum: 0,
				resultBox: false,
				begin: false,
				current1: '',
				current2: '',
				current3: '',
				resultsOfUnitInputs: [],
				resultsOfDecInputs: [],
				resultsOfResInputs: [],
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
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			genTask() {	
				this.begin = false;
				this.resultBox = false;
				this.multiplier = this.randomNumber(11, 99);
				this.number = this.randomNumber(101, 999);
				this.result = this.number * this.multiplier;
				this.checked = '';
				this.hinted1 = false;
				this.$data.usersResult = '';				
			},
			changeStatus() {
				this.hinted1 = true;
				console.log('hint 1 true');
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
				this.$data.usersResult = '';
			}, 
			giveHint() {
				this.begin = true;
				for (let i = 0; i < this.resultsOfResInputs.length; i++) {					
					this.$data.resultsOfResInputs[i] = '';
					this.$data.resultsOfUnitInputs[i] = '';
					this.$data.resultsOfDecInputs[i] = '';
				} 
			},
			grade(givenNum) {
				return Math.ceil(Math.log10(givenNum));
			},
		},
		computed: {
			decimal() {
				var dec = (this.multiplier - (this.multiplier % 10)) / 10;
				return dec;
			},
			decres() {
				return this.decimal * this.number;
			},
			unit() {
				var uni = this.multiplier % 10;
				return uni;
			},
			unitres() {
				var ur = this.unit * this.number;
				return ur;
			},
			correctUnit() {
				var arr= [];
				var uni = '' + this.unitres;
				arr = uni.split("");
				return arr;
			},
			correctDec() {
				var arr= [];
				var dec = '' + this.decres;
				arr = dec.split("");
				return arr;
			},
			unitArray() {
				if (this.unit == 0) {
					return ['x'];
				}
				var arr = [];
				for (let i = 0; i < this.grade(this.unitres); i++) {
					arr[i] = i;
				}
				return arr;
			},
			decArray() {
				var arr = [];
				for (let i = 0; i < this.grade(this.decres); i++) {
					arr[i] = 'deccurrent' + i;
				}
				return arr;
			},
			correctResultSpaces() {
				var res = this.number * this.multiplier;
				res = '' + res;
				var arr = res.split("");
				return arr;
			},
			maxSpaces() {
				var arr = [this.decArray.length + 1, this.unitArray.length, this.correctResultSpaces.length];
				var max = 4;
				for (let i = 0; i < 3; i++) {
					if (arr[i] > max) {
						max = arr[i];
					}
				}
				return max;
			},
		},
		beforeMount() {
			this.genTask();
		},
		mounted() {
		    bus.$on('next', this.genTask);
		    this.resultsOfUnitInputs = this.correctUnit.map(() => '')
			this.resultsOfDecInputs = this.correctDec.map(() => '')
			this.resultsOfResInputs = this.correctResultSpaces.map(() => '')
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
	.inputWithBorder {
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
	}
</style>

