<template>
	<div>
		<heading head='Adresy v paměti'></heading>
		<b-row>
			<b-col cols='8'>
				<vue-mathjax :formula="intro"/>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols='1'></b-col>
			<b-col cols='1'>
				<b-col></b-col>
				<b-col><vue-mathjax formula="$$Adresa$$"/></b-col>
				<b-col></b-col>
			</b-col>
			<b-col cols='1'></b-col>
			<b-col cols='2'>
				<vue-mathjax :formula="secondHalfOfHeading"/>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols='8'>
				<vue-mathjax :formula="table"/>
			</b-col>
		</b-row>
		<b-row><p> </p></b-row>
		<b-row v-if='taskGiven == false'>
			<b-col cols='8'></b-col>
			<b-col cols='3'>
				<p @click='giveTask' class='hintstyle'>Úkol</p>
			</b-col>
		</b-row>
		<div v-if='taskGiven == true'>
			<b-row>
				<b-col cols='8'>
					<vue-mathjax :formula="task"/>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols='8'></b-col>
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
		<ch-alerts :checked='checked' :result='correctResult'></ch-alerts>
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
				intro: '',
				usersResult: '',
				checked: '',
				correctResult: '',
				table: '',
				values: [],
				secondHalfOfHeading: '$$\\text{Obsah paměti}$$',
				taskGiven: false,
				task: '',
				lastTask: 0,
				firstAdress: '',				
				secondAdress: '',
				thirdAdress: '',
				correctFirst: '',
				correctSecond: '',
				correctThird: '',
				thirdVal: '',
				bits: '',
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
			convertNumber(n, fromBase, toBase) {
			  	if (fromBase === void 0) {
			  	  fromBase = 10;
			 	}
			 	if (toBase === void 0) {
			 	   toBase = 10;
				}
				var ret = '';
				if (n <= 15 && fromBase == 10) {
			 		ret = "0" + parseInt(n.toString(), fromBase).toString(toBase);
			 	} else {
					ret = parseInt(n.toString(), fromBase).toString(toBase);
			 	}
			 	return ret;
			},
			resetAll() {
				this.hinted = false;
				this.checked = '';
				this.intro = '';
				this.table = '$$';
				this.lastTask = 0;
				this.taskGiven = false;
				this.$data.usersResult = '';
				this.thirdVal = '';
			},			
			genTask() {
				this.resetAll();
				var beginning = this.randomNumber(2097152,33554431)*8;
				var firstlineadress = "0" + this.convertNumber(beginning, 10, 16);
				this.intro = '$$\\text {Pomocí nějakého ladícího nástroje jsme zíkali másledující} \\\\ \\text {výpis obsahu 24 bajtů paměti od adresy 0x' + firstlineadress +':}$$'
				var secondlineadress = "0" + this.convertNumber(beginning + 8, 10, 16);
				var thirdlineadress = "0" + this.convertNumber(beginning + 16, 10, 16);

				var firstPos = this.randomNumber(0, 7);
				var secondPos = this.randomNumber(8, 15);
				
				this.firstAdress = this.convertNumber(beginning + firstPos, 10, 16);
				this.secondAdress = this.convertNumber(beginning + secondPos, 10, 16);				

				var firstline = firstlineadress + "\\text{ | }";
				var secondline = secondlineadress + "\\text{ | }";
				var thirdline = thirdlineadress + "\\text{ | }";

				for (let i = 0; i < 24; i++) {
					this.values[i] = this.convertNumber(this.randomNumber(0, 255), 10, 16);
				}
				//generate first result
				var firstVal = this.values[firstPos];
				this.correctFirst = this.firstResult(firstVal); 
				//generate second result
				var secondVal = this.values[secondPos];
				this.correctSecond = this.secondResult(secondVal);
				//generate third result and third task
				var bytes = 1 << this.randomNumber(1, 3);
				this.bits = bytes * 8;
				var thirdPos = this.randomNumber(0, 24 - bytes);
				this.thirdAdress = this.convertNumber(beginning + thirdPos, 10, 16);
				var endianMode = this.randomNumber(0, bytes == 2 ? 1 : 2);
				for (let i = 0; i < bytes; i++) {
					if (endianMode == 0) {
						this.thirdVal += this.values[thirdPos + bytes - 1 - i];
						this.correctThird = 'little-endian';
					} else if (endianMode == 1) {
						this.thirdVal += this.values[thirdPos + i];
						this.correctThird = 'big-endian';
					} else if (endianMode == 2) {
						this.thirdVal += this.values[thirdPos + (i ^ 1)];
						this.correctThird = 'pdp-endian';
					}
				}

				for (let i = 0; i < 8; i++) {
					firstline += "\\text{ }" + "\\text{ }" + this.values[i];
					secondline += "\\text{ }" + "\\text{ }" + this.values[i + 8];
					thirdline += "\\text{ }" + "\\text{ }" + this.values[i + 16];
				}
				this.table += firstline + "\\\\" + secondline + "\\\\" + thirdline + "$$";
			},
			firstResult(firstVal) {
				var val = this.convertNumber(firstVal, 16, 10);
				if (val <= 127) {
					return val;
				} else {
					return val - 256;
				}
			},
			secondResult(secondVal) {
				var val = this.convertNumber(secondVal, 16, 10);
				if (val <= 127) {
					return "00" + secondVal;
				} else {
					return "ff" + secondVal;
				}
			},
			giveTask() {
				if (this.lastTask == 0) {
					this.task = '$$\\text {8-bitové číslo uložené na adrese 0x' + this.firstAdress + ' interpretujte} \\\\ \\text{jako celé číslo ve dvojkovém doplňku a napište jeho} \\\\ \\text{hodnotu v desítkové soustavě.}$$';
				} else if (this.lastTask == 1) {
					this.task = '$$\\text {8-bitové číslo uložené na adrese 0x' + this.secondAdress + ' považujte za} \\\\ \\text{celé číslo ve dvojkovém doplňku a v šestnáctkové soustavě} \\\\ \\text{napište hodnotu, která vznikne jeho znaménkovým} \\\\ \\text{rozšířením na 16 bitů.}$$';
				} else if (this.lastTask == 2) {
					var choices = this.bits == 16 ? "(little-endian nebo big-endian)" : "(little-endian, big-endian nebo pdp-endian)";
					this.task = '$$\\text {V jakém uspořádání ' + choices + '} \\\\ \\text {bylo do paměti na adresu 0x' + this.thirdAdress + ' uloženo ' + this.bits +'-bitové} \\\\ \\text {číslo 0x' + this.thirdVal + '?}$$'
				}
				this.taskGiven = true;
				this.lastTask++;
			},
			check() {
				if (this.checked == 'right' && this.lastTask == 3) {
					this.genTask();
					return;
				} else if (this.checked == 'right' && this.lastTask != 3) {
					this.checked = '';
					this.giveTask();
					return;
				} 
				if (this.lastTask == 1) {
					this.correctResult = this.correctFirst;
				} else if (this.lastTask == 2) {
					this.correctResult = this.correctSecond;
				} else if (this.lastTask == 3) {
					this.correctResult = this.correctThird;
				} 
				if (this.usersResult == this.correctResult) {
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