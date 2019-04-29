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
		<div style='font-family: monospace'>
			<b-row>
				<b-col v-if='firstHint == false' cols='12' sm='12' md='12' lg='10' xl='8'>
					{{ firstLineAddress }} | <span v-for='byte in firstValues'>{{byte}} </span>
				</b-col>
				<b-col v-else cols='12' sm='12' md='12' lg='10' xl='8'>
					{{ firstLineAddress }} | <span v-for='(byte, index) in firstValues'><span :style='firstLineStyling[index]'>{{byte}} </span></span>
				</b-col>
			</b-row>
			<b-row>
				<b-col v-if='secondHint == false' cols='12' sm='12' md='12' lg='10' xl='8'>
					{{ secondLineAddress }} | <span v-for='byte in secondValues'><span>{{byte}} </span></span>
				</b-col>
				<b-col v-else cols='12' sm='12' md='12' lg='10' xl='8'>
					{{ secondLineAddress }} | <span v-for='(byte, index) in secondValues'><span :style='secondLineStyling[index]'>{{byte}} </span></span>
				</b-col>
			</b-row>
			<b-row>
				<b-col v-if='thirdHint == false' cols='12' sm='12' md='12' lg='10' xl='8'>
					{{ thirdLineAddress }} | <span v-for='byte in thirdValues'><span>{{byte}} </span></span>
				</b-col>
				<b-col v-else cols='12' sm='12' md='12' lg='10' xl='8'>
					{{ thirdLineAddress }} | <span v-for='(byte, index) in thirdValues'><span :style='thirdLineStyling[index]'>{{byte}} </span></span>
				</b-col>
			</b-row>
		</div>
		<b-row><p> </p></b-row><!-- this skips a line -->
		<div>
			<b-row>
				<b-col cols='12' sm='12' md='12' lg='10' xl='8'>
				<p>{{ task }}</p><!-- this shows the current task -->
				</b-col>
			</b-row>
			<b-row>
				<b-col v-if='verbalHint == false' cols='4' sm='4' md='6' lg='7' xl='8'/>
				<b-col v-else cols='4' sm='4' md='6' lg='7' xl='8'>
					Nápovědy tohoto příkladu zvýrazní bajty, kterých se týká zadání.
				</b-col>
				<b-col cols='8' sm='8' md='6' lg='5' xl='4'>
					<p v-if='lastHint == false' @click='giveHint' class='hintstyle'>Nápovědu prosím</p>
				</b-col>
			</b-row>
			<b-row>
      			<b-col cols='2' sm='2' md='3' lg='6' xl='7'/>
				<b-col cols="8" sm="8" md="7" lg="5" xl="4" v-if='lastTask == 3'>
			        <b-form-select 
                     	:value="null"
                     	:options="choices"
                     	v-model="selected"
                     	id="inlineFormCustomSelectPref"/><!-- this shows a drop down with choices for the third task -->
      			</b-col>
				<b-col cols="8" sm="8" md="7" lg="5" xl="4" v-else>
					<!-- this renders a form for the insertion of the result -->
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
	// This  task was coded to practice computing, twos complement, sign extension and endianness.
	// @group Tasks
	export default {
		name: 'addresses-in-memory',
		introduction: 'Addresses in memory component',
		description: `
			Task to practice computing, twos complement, sign extension and endianness.
		`,
		token: "<addresses-in-memory/>",
		data() {
			return {
				intro: '', //introduction to the task
				usersResult: '',
				checked: '',
				correctResult: '',
				values: [],//array with all 24 bytes
				firstValues: [],//array with first 8 bytes
				secondValues: [],//array with second line of bytes
				thirdValues: [],//array with third line of bytes
				firstHint: false, //booleans used for hints
				secondHint: false,
				thirdHint: false,
				lastHint: false,
				verbalHint: false,
				firstLineStyling: [],//arrays used for binding the style of hinted address
				firstHintAddress: '',//address that is supposed to be hinted
				secondLineStyling: [],
				secondHintAddress: '',
				thirdLineStyling: [],
				task: '',
				lastTask: 0,//stores number of last task, so the application knows, which is going to be next
				firstAddress: '',//address that is in the first task				
				secondAddress: '',//address that is in the second task	
				thirdAddress: '',//address that is in the third task	
				correctFirst: '',//correct result for the first task
				correctSecond: '',//correct result for the second task
				correctThird: '',//correct result for third the task
				thirdVal: '',
				bits: '',//stores number of bits that the number in the third task has
				choices: [],//stores possible answers for he third task - they show as options in the drop down
				firstLineAddress: "",
				secondLineAddress: "",
				thirdLineAddress: "",
				thirdHintAddress: "",
			}
		}, 
		components: {
			'heading': Heading,
			'ch-alerts': CheckAlerts,
		},
		methods: {
			//@vuese
			//this method generates a random number in the interval that was specified in the parentheses
			//@arg minimal value;&nbsp;
			//@arg maximal value
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			// @vuese
			//this method converts numbers from one system to another - (number, from, to)
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
			// @vuese
			//this method resets all variables that have been changed and will be used in the next call of genTask
			resetAll() {
				this.hinted = false;
				this.checked = '';
				this.intro = '';
				this.lastTask = 0;
				this.$data.usersResult = '';
				this.thirdVal = '';
				this.selected = '';
				this.firstLineStyling = [];
				this.secondLineStyling = [];
				this.thirdLineStyling = [];
				this.firstHint = false;
				this.secondHint = false;
				this.thirdHint = false;
				this.lastHint = false;
				this.thirdHintAddress = '';
			},			
			// @vuese		
			//this method generates the task
			genTask() {
				this.resetAll();
				var beginning = this.randomNumber(2097152,33554431)*8;
				this.firstLineAddress = "0" + this.convertNumber(beginning, 10, 16).toUpperCase();
				this.intro = 'Pomocí nějakého ladícího nástroje jsme získali následující výpis obsahu 24 bajtů paměti od adresy 0x' + this.firstLineAddress +':'
				this.secondLineAddress = "0" + this.convertNumber(beginning + 8, 10, 16).toUpperCase();
				this.thirdLineAddress = "0" + this.convertNumber(beginning + 16, 10, 16).toUpperCase();

				var firstPos = this.randomNumber(0, 7);
				this.firstHintAddress = firstPos; //index of the hint in firstLineStyling
				var secondPos = this.randomNumber(8, 15);
				this.secondHintAddress = secondPos - 8; //index of the hint in secondLineStyling
				
				this.firstAddress = "0" + this.convertNumber(beginning + firstPos, 10, 16).toUpperCase();
				this.secondAddress = "0" + this.convertNumber(beginning + secondPos, 10, 16).toUpperCase();//generate addresses that are used in tasks				

				var firstline = this.firstLineAddress + " | ";
				var secondline = this.secondLineAddress + " | ";
				var thirdline = this.thirdLineAddress + " | ";

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
				this.thirdHintAddress = thirdPos;
				this.thirdAddress = "0" + this.convertNumber(beginning + thirdPos, 10, 16).toUpperCase();
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
					this.firstValues[i] = this.values[i];
					this.secondValues[i] = this.values[i + 8];
					this.thirdValues[i] = this.values[i + 16];
				}
				this.giveTask();
			},			
			// @vuese	
			//this method computes the number in two's complement in decimal
			firstResult(firstVal) {
				var val = this.convertNumber(firstVal, 16, 10);
				if (val <= 127) {
					return val;
				} else {
					return val - 256;
				}
			},
			// @vuese
			//this method extends the number to 16 bits with sign extension
			secondResult(secondVal) {
				var val = this.convertNumber(secondVal, 16, 10);
				if (val <= 127) {
					return "00" + secondVal;
				} else {
					return "ff" + secondVal;
				}
			},
			// @vuese
			//this method changes the value of the task variable for the next task
			giveTask() { 
				if (this.lastTask == 0) {
					this.task = '8-bitové číslo uložené na adrese 0x' + this.firstAddress + ' interpretujte jako celé číslo ve dvojkovém doplňku a napište jeho hodnotu v desítkové soustavě.';
				} else if (this.lastTask == 1) {
					this.firstLineStyling = [];
					this.firstHint = false;
					this.task = '8-bitové číslo uložené na adrese 0x' + this.secondAddress + ' považujte za celé číslo ve dvojkovém doplňku a v šestnáctkové soustavě napište hodnotu, která vznikne jeho znaménkovým rozšířením na 16 bitů.';
				} else if (this.lastTask == 2) {
					this.secondLineStyling = [];
					this.secondHint = false;
					var choices = this.bits == 16 ? "(little-endian nebo big-endian)" : "(little-endian, big-endian nebo pdp-endian)";
					this.task = 'V jakém uspořádání ' + choices + ' bylo do paměti na adresu 0x' + this.thirdAddress + ' uloženo ' + this.bits +'-bitové číslo 0x' + this.thirdVal + '?'
				}
				this.taskGiven = true;
				this.lastTask++;
			},
			// @vuese
			//give hints in the form of making the current address red and bold
			giveHint() {
				if (this.verbalHint == false) {
					this.verbalHint = true;
				}
				if (this.lastTask == 1) {
					this.firstLineStyling[this.firstHintAddress] = 'font-weight: bold; color: red;';
					this.firstHint = true;
				} else if (this.lastTask == 2) {
					this.secondLineStyling[this.secondHintAddress] = 'font-weight: bold; color: red;';
					this.secondHint = true;	
				} else if (this.lastTask == 3) {
					this.lastHint = true;
					var quantity = this.bits / 8;
					var position = this.thirdHintAddress;
					if (this.thirdHintAddress < 8) {
						for (let i = this.thirdHintAddress; i < 8; i++) {
							this.firstLineStyling[i] = 'font-weight: bold; color: red;';
							position++;
							quantity--;
							if (quantity == 0) {
								break;
							}
						}
						this.firstHint = true;
						if (quantity > 0) {
							for (let i = position; i < 16; i++) {
							this.secondLineStyling[i - 8] = 'font-weight: bold; color: red;';
							quantity--;
								if (quantity == 0) {
									break;
								}
							}
							this.secondHint = true;
						}
					} else if (this.thirdHintAddress < 16) {
						for (let i = this.thirdHintAddress; i < 16; i++) {
							this.secondLineStyling[i - 8] = 'font-weight: bold; color: red;';
							position++;
							quantity--;
							if (quantity == 0) {
								break;
							}
						}
						this.secondHint = true;
						if (quantity > 0) {
							while (quantity != 0) {
								this.thirdLineStyling[position - 16] = 'font-weight: bold; color: red;';
								position++;
								quantity--;
							}
							this.thirdHint = true;
						}
					} else {
						while (quantity != 0) {
							this.thirdLineStyling[position - 16] = 'font-weight: bold; color: red;';
							position++;
							quantity--;
						}
						this.thirdHint = true;
					}
				}
			},
			// @vuese
			//this method handles results submitted by user and their evaluation and correction
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
				this.$data.usersResult = '';
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