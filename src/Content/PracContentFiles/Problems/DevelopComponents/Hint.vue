<template>
	<div>
		<b-row>	
			<b-col cols='8'>		
				<div v-if='hinted1'>
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
						<span v-if='hinted2' class='zero'>0</span>
					</span>
				</div>
				<span v-if='hinted2'>
					<hr v-if='maxSpaces == 4' class='secondLine4'>
					<hr v-else class='secondLine5'>
					<span v-for='(correct,index) in correctResultSpaces'>
							<hint-form 
								v-model='resultsOfResInputs[index]'
							  	:correctResult='correct'>							  		
							</hint-form>
						</span>
				</span>
			</b-col>
			<b-col>
				<p @click='giveHint' v-if='hinted1 == false'>Prosím o nápovědu.</p>
				<p v-else-if='hinted2 == false' @click='summarise'>OK ✔</p>
				<p v-else-if='hinted2 && resBox == false' @click='showResultBox'><br>OK ✔</p>
			</b-col>
		</b-row>
	</div>
</template>


<script>
	import {bus} from './../../../../main.js'
	import HintForm from './HintForm.vue'
	import Nbsp from './Nbsp.vue'
	export default {
		props: {
			hintProp1: {
				type: Boolean
			},
			hintProp2: {
				type: Boolean
			},
			number: {
				type: Number
			},
			multiplier: {
				type: Number
			}, 
		},
		data() {
			return {
				hinted1: this.hintProp1,
				hinted2: false,
				current1: '',
				current2: '',
				current3: '',
				index: -1,
				resultsOfUnitInputs: [],
				resultsOfDecInputs: [],
				resultsOfResInputs: [],
				tmpArray: [],
				correctInputs: 0,
				resBox: false,
			}
		},
		watch: {
			hintProp2 (newValue) {
				this.hinted2 = newValue;
			},
			hintProp1 (newValue) {
				this.hinted1 = newValue;
			},
		},
		components: {
			'hint-form': HintForm,
			'nbsp': Nbsp,
		},
		methods: {
			giveHint() {
				this.resBox = false;
				this.hinted1 = true; 
				this.$emit('changeStatus');
				this.$emit('spaces', this.maxSpaces);
				this.correctInputs = 0;
				console.log('hinted1 ' + this.hinted1);
				console.log('hinted2 ' + this.hinted2);
			},
			grade(givenNum) {
				return Math.ceil(Math.log10(givenNum));
			},
			summarise() {
				this.hinted2 = true;
			},
			makeItFalse() {
				this.hinted2 = false;				
			},
			showResultBox() {
				this.resBox = true;
				this.$emit('showResultBox');
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
			maxSpaces() {
				var d = this.decArray.length + 1;
				var u = this.unitArray.length;
				var mul = 4;
				if (d >= u && d >= mul) {
					return d;
				} else if (u >= d && u >= mul){
					return u;
				} else if (mul >= u && mul >= d) {
					return mul;
				}
			},
			correctResultSpaces() {
				var res = this.number * this.multiplier;
				res = '' + res;
				var arr = res.split("");
				console.log(arr);
				return arr;
			},
		},
		mounted () {
			this.resultsOfUnitInputs = this.correctUnit.map(() => '')
			this.resultsOfDecInputs = this.correctDec.map(() => '')
			this.resultsOfResInputs = this.correctResultSpaces.map(() => '')
			bus.$on('repair', this.makeItFalse);
		}
	}
</script>

<style>
	.int {
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