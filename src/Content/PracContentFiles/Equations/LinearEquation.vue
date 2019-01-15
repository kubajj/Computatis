<template>
	<div>
		<heading head='Lineární rovnice'></heading>
		<b-row>
			<b-col cols='8'>
				<vue-mathjax :formula="task"/>
			</b-col>
		</b-row>
		<b-row>&nbsp</b-row>
		<b-row>
			<b-col cols='8'>
				<span v-if='!hinted' @click='hint' class='hintstyle'>Nápovědu prosím</span>
				<span v-else><vue-mathjax :formula="hintValue1"/></span>
			</b-col>
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
		<ch-alerts :checked='checked' :result='result'></ch-alerts>
	</div>
</template>

<script>
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'

	export default {
		data() {
			return {
				task: '',
				usersResult: '',
				checked: '',
				result: '',
				hinted: false,
				hintValue1: '',
			}
		}, 
		components: {
			'heading': Heading,
			'ch-alerts': CheckAlerts,
		},
		methods: {
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			sign() {
				var arr = [1, -1];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			variants() {
				var arr = ['x', 'n'];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			position() {				
				var arr = ['b', 'a'];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			resetAll() {
				this.checked = '';
				this.usersResult = '';				
				this.task = '';
				this.result = '';
				this.hinted = false;
			},
			hint() {
				this.hinted = true;
			},
			genTask() {
				this.resetAll();
				var quantity = this.randomNumber(1, 5);
				var rationalResult = false;
				while (!rationalResult) {
					var xs = this.randomNumber(-50, 50);
					var firstx = this.controlX(xs);
					var firstnum = this.randomNumber(-50, 50);
					var tmpstringb = '$$' + firstx + 'x';
					var tmpstringa = '=' + firstnum;
					var numbers = firstnum;
					for (let i = 1; i < quantity; i++) {
						var tmpnumber = this.randomNumber(-50, 50);
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
					var x = (numbers / xs);
					if ((x % 1 == 0 || x % 1 == 0.5 || x % 1 == 0.25) && numbers != 0) {
						rationalResult = true;
						this.task = tmpstringb + tmpstringa + '$$'
						if (xs < 0) {
							xs = - xs;
							numbers = -numbers;
						}
						if (xs == 1) {xs = ''} 
							if (xs == -1) {xs = '-'}
						this.hintValue1 = '$$' + xs + 'x = ' + numbers + '$$';
						break;
					} else {
						continue;
					}
				}
				this.result = x;
			},
			controlX(x) {
				if (x == 1) {
					return '';
				} else if (x == -1) {
					return '-';
				} 
				return x;
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
