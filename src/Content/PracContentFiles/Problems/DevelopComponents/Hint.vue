<template>
	<div>
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
	</div>
</template>


<script>
	import {bus} from './../../../../main.js'
	import HintForm from './HintFormBorder.vue'
	import Nbsp from './Nbsp.vue'
	export default {
		props: {
			number: {
				type: Number
			},
			multiplier: {
				type: Number
			}, 
		},
		data() {
			return {
				current1: '',
				current2: '',
				current3: '',
				resultsOfUnitInputs: [],
				resultsOfDecInputs: [],
				resultsOfResInputs: [],
			}
		},
		components: {
			'hint-form': HintForm,
			'nbsp': Nbsp,
		},
		methods: {
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
				this.$emit('spaces', max);
				return max;
			},
		},
		mounted () {
			this.resultsOfUnitInputs = this.correctUnit.map(() => '')
			this.resultsOfDecInputs = this.correctDec.map(() => '')
			this.resultsOfResInputs = this.correctResultSpaces.map(() => '')
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