<template>
	<div>
		<heading head='Adresy v paměti'></heading>
		<b-row>
			<b-col cols='12' sm='12' md='12' lg='10' xl='8'>
				<p>{{ intro }}</p><!-- this shows the intro of the task -->
			</b-col>
		</b-row>
		<b-row><p> </p></b-row>
		<b-row>
			<b-col cols='1' sm='1' md='1' lg='1' xl='1'>
				<b-col></b-col>
				<b-col><p>Adresa</p></b-col><!-- this shows the first part of the heading -->
				<b-col></b-col>
			</b-col>
			<b-col cols='2' sm='2' md='2' lg='2' xl='1'></b-col>
			<b-col cols='5' sm='5' md='4' lg='4' xl='4'><p>Obsah paměti</p></b-col><!-- this shows the second part of the heading -->
		</b-row>
		<b-row v-for='line in table' style='font-family: monospace;'>
			<b-col cols='12' sm='12' md='12' lg='10' xl='8'>
			<p>{{ line }}</p><!-- this renders all three lines of the addresses -->
			</b-col>
		</b-row>
		<b-row><p> </p></b-row><!-- this skips a line -->
		<div>
			<b-row>
				<b-col cols='12' sm='12' md='12' lg='10' xl='8'>
				<p>{{ task }}</p><!-- this shows the current task -->
				</b-col>
			</b-row>
			<b-row>
				<b-col cols='2' sm='3' md='4' lg='7' xl='8'></b-col>
				<b-col cols="3" v-if='lastTask == 3'>
			        <b-form-select 
                     	:value="null"
                     	:options="choices"
                     	v-model="selected"
                     	id="inlineFormCustomSelectPref"/><!-- this shows a drop down with choices for the third task -->
      			</b-col>
				<b-col cols="8" sm="7" md="6" lg="4" xl="3" v-else><!-- this renders a form for the insertion of the result -->
					<b-form-input
			                type="text"
			                placeholder="Výsledek"
			                v-model="usersResult"
			                @keyup.native.enter='check'
			                id="inputForm"
			                style='margin-bottom: 5px;'>                   	
			        </b-form-input>
			    </b-col>
		        <b-col cols="2" sm="2" md="2" lg="1" xl="1">
		        	<b-button @click="check">✔</b-button>
		        </b-col>
			</b-row>	
		</div>
		<ch-alerts :checked='checked' :result='correctResult'/><!-- this calls the ch-alerts component that shows the user the correct answer for the task or congratulates him for computing the correct result-->
	</div>
</template>

<script>//the following lines of code import the necessary components, which are later specified in the components section and used in the template part
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'

	export default {
		data() {
			return {
				intro: '', //introduction to the task
				usersResult: '',
				checked: '',
				correctResult: '',
				table: [], //array with all three lines of bytes
				values: [],//array with 
				task: '',
				lastTask: 0,//stores number of last task, so the application knows, which is going to be next
				firstAdress: '',//address that is in the first task				
				secondAdress: '',//address that is in the second task	
				thirdAdress: '',//address that is in the third task	
				correctFirst: '',//correct result for the first task
				correctSecond: '',//correct result for the second task
				correctThird: '',//correct result for third the task
				thirdVal: '',
				bits: '',//stores number of bits that the number in the third task has
				choices: [],//stores possible answers for he third task - they show as options in the drop down
			}
		}, 
		components: {
			'heading': Heading,
			'ch-alerts': CheckAlerts,
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
				var ret = '';
				if (n <= 15 && fromBase == 10) {
			 		ret = "0" + parseInt(n.toString(), fromBase).toString(toBase);
			 	} else {
					ret = parseInt(n.toString(), fromBase).toString(toBase);
			 	}
			 	return ret;
			},
			resetAll() {//this method resets all variables that have been changed and will be used in the next call of genTask
				this.hinted = false;
				this.checked = '';
				this.intro = '';
				this.table = [];
				this.lastTask = 0;
				this.$data.usersResult = '';
				this.thirdVal = '';
				this.selected = '';
			},			
			genTask() {//this method generates the task
				this.resetAll();
				var beginning = this.randomNumber(2097152,33554431)*8;
				var firstlineadress = "0" + this.convertNumber(beginning, 10, 16).toUpperCase();
				this.intro = 'Pomocí nějakého ladícího nástroje jsme zíkali másledující text výpis obsahu 24 bajtů paměti od adresy 0x' + firstlineadress +':'
				var secondlineadress = "0" + this.convertNumber(beginning + 8, 10, 16).toUpperCase();
				var thirdlineadress = "0" + this.convertNumber(beginning + 16, 10, 16).toUpperCase();

				var firstPos = this.randomNumber(0, 7);
				var secondPos = this.randomNumber(8, 15);
				
				this.firstAdress = "0" + this.convertNumber(beginning + firstPos, 10, 16).toUpperCase();
				this.secondAdress = "0" + this.convertNumber(beginning + secondPos, 10, 16).toUpperCase();//generate addresses that are used in tasks				

				var firstline = firstlineadress + " | ";
				var secondline = secondlineadress + " | ";
				var thirdline = thirdlineadress + " | ";

				for (let i = 0; i < 24; i++) {
					this.values[i] = this.convertNumber(this.randomNumber(0, 255), 10, 16).toUpperCase();
				}
				//generate first result
				var firstVal = this.values[firstPos];
				this.correctFirst = this.firstResult(firstVal); 
				//generate second result
				var secondVal = this.values[secondPos];
				this.correctSecond = this.secondResult(secondVal).toUpperCase();
				//generate third result and third task
				var bytes = 1 << this.randomNumber(1, 3);
				this.bits = bytes * 8;
				this.choices = bytes == 2 ? ['little-endian', 'big-endian'] : ['little-endian', 'big-endian', 'pdp-endian'];
				var thirdPos = this.randomNumber(0, 24 - bytes);
				this.thirdAdress = "0" + this.convertNumber(beginning + thirdPos, 10, 16).toUpperCase();
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
					firstline += "  " + this.values[i];
					secondline += "  " + this.values[i + 8];
					thirdline += "  " + this.values[i + 16];
				}
				this.table = [firstline, secondline, thirdline];
				this.giveTask();
			},
			firstResult(firstVal) {//this method computes the number in two's complement in decimal
				var val = this.convertNumber(firstVal, 16, 10);
				if (val <= 127) {
					return val;
				} else {
					return val - 256;
				}
			},
			secondResult(secondVal) {//this method extends the number to 16 bits with sign extension
				var val = this.convertNumber(secondVal, 16, 10);
				if (val <= 127) {
					return "00" + secondVal;
				} else {
					return "ff" + secondVal;
				}
			},
			giveTask() { //this method changes the value of the task variable for the next task
				if (this.lastTask == 0) {
					this.task = '8-bitové číslo uložené na adrese 0x' + this.firstAdress + ' interpretujte jako celé číslo ve dvojkovém doplňku a napište jeho hodnotu v desítkové soustavě.';
				} else if (this.lastTask == 1) {
					this.task = '8-bitové číslo uložené na adrese 0x' + this.secondAdress + ' považujte za celé číslo ve dvojkovém doplňku a v šestnáctkové soustavě napište hodnotu, která vznikne jeho znaménkovým rozšířením na 16 bitů.';
				} else if (this.lastTask == 2) {
					var choices = this.bits == 16 ? "(little-endian nebo big-endian)" : "(little-endian, big-endian nebo pdp-endian)";
					this.task = 'V jakém uspořádání ' + choices + ' bylo do paměti na adresu 0x' + this.thirdAdress + ' uloženo ' + this.bits +'-bitové číslo 0x' + this.thirdVal + '?'
				}
				this.taskGiven = true;
				this.lastTask++;
			},
			check() {
				if (this.checked == 'right' && this.lastTask == 3) {//if the user result is right, the last task was given and user presses enter 2 times, it generates next task
					this.genTask();
					return;
				} else if (this.checked == 'right' && this.lastTask != 3) {//if the result is right, but the task was not the third one, it gives the next task
					this.checked = '';
					this.giveTask();
					return;
				} 
				//following if statements are checking each result with its dedicated correct one
				if (this.lastTask == 1) {
					this.correctResult = this.correctFirst;
				} else if (this.lastTask == 2) {
					this.correctResult = this.correctSecond;
				} else if (this.lastTask == 3) {
					this.correctResult = this.correctThird;
				} 
				if (this.lastTask != 3 && this.usersResult.toUpperCase() == this.correctResult || this.lastTask == 3 && this.selected == this.correctResult) {//checks if the user result (inserted to input) is right
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