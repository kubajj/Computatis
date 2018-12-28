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
							  	:correctResult='correct'
							  	@correction='correction'>							  		
							</hint-form>
						</span>
					</span>
					<span class="wws">
						<nbsp :num='maxSpaces - (decArray.length + 1)'/>
						<span v-for='(correct, index) in correctDec'>
							<hint-form 
								v-model='resultsOfDecInputs[index]'
								:correctResult='correct'
							  	@correction='correction'>								
							</hint-form>
						</span>
					</span>
				</div>
				<span v-if='hinted2'><hr>{{hinted2}}</span>
			</b-col>
			<b-col>
				<p @click='giveHint' v-if='hinted1 == false'>Prosím o nápovědu.</p>
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
			hintProp: {
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
				hinted1: this.hintProp,
				hinted2: false,
				current1: '',
				current2: '',
				current3: '',
				index: -1,
				resultsOfUnitInputs: [],
				resultsOfDecInputs: [],
				tmpArray: [],
				correctInputs: 0,
			}
		},
		watch: {
			hintProp (newValue) {
				this.hinted1 = newValue;
			},
		},
		components: {
			'hint-form': HintForm,
			'nbsp': Nbsp,
		},
		methods: {
			giveHint() {
				this.hinted1 = true; 
				this.$emit('changeStatus');
				this.$emit('spaces', this.maxSpaces);
				this.correctInputs = 0;
				this.hinted2 = false;
			},
			grade(givenNum) {
				return Math.ceil(Math.log10(givenNum));
			},
			correction() {
				this.correctInputs++;
				console.log(this.correctInputs);
				if (this.correctInputs == (this.correctUnit.length + this.correctDec.length)) {
					this.hinted2 = true;
					console.log('show hint 2');
				}
			}
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
		},
		mounted () {
			this.resultsOfUnitInputs = this.correctUnit.map(() => '')
			this.resultsOfDecInputs = this.correctDec.map(() => '')
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
</style>