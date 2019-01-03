<template>
	<div>
		<heading head='Kvadratická rovnice'></heading>
		<b-row>
			<vue-mathjax :formula="task"></vue-mathjax>
		</b-row>
		<b-row>
			<b-col cols='8'></b-col>
			<b-col v-if='hint1 == false' cols="3">
				<b-form-input
		                type="text"
		                placeholder="x1"
		                v-model.trim="usersX1"
		                id="inputForm1">                   	
		        </b-form-input>
		    </b-col>
		</b-row>
		<b-row v-if='hint1 == false'>
			<b-col cols='8'>
				<p @click='hint1 = true;' class='hintstyle'>Nápovědu prosím</p>
			</b-col>
			<b-col cols='3'>
		        <b-form-input
		                type="text"
		                placeholder="x2"
		                v-model.trim="usersX2"
		                id="inputForm2">                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="1">
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>
		<b-row><hr></b-row>
		<span v-if='hint1'>
			<b-row>
				<p>Vše na levou stranu:</p>
			</b-row>
			<b-row>
				<b-col cols='10'>
					<vue-mathjax :formula="unmodtask"></vue-mathjax>
				</b-col>
				<b-col v-if='hint2 == false' cols='2' @click='hint2 = true' class='hintstyle'>OK ✔</b-col>
			</b-row>
		</span>			
		<span v-if='hint2 == true'><b-row><h6>Diskriminant:</h6></b-row>
			<b-row v-if='ok == false'>
				<b-col cols='8'>
					<vue-mathjax :formula="disc"></vue-mathjax>
				</b-col>				
				<b-col v-if='ok == false' cols='2' @click='discrime' class='hintstyle'>OK ✔</b-col>
			</b-row>
			<span v-if='ok'>
			<b-row>
				<b-col cols='3'></b-col>
				<b-col>
					<b-form-input class='minb' v-model='binval' placeholder='-b' :state='bstate' @keyup.native='checking(binval, minb, "bstate")'></b-form-input>
					<span style="display: inline-block; margin-right: -11px;">± √</span>
					<b-form-input class='disco' v-model='dinval' placeholder='b²-4ac' :state='dstate' @keyup.native='checking(dinval, discriminant, "dstate")'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols='2'>
					<vue-mathjax :formula="disc"></vue-mathjax>
				</b-col>
				<b-col cols='6'><hr class='frac'></b-col>
			</b-row>
			<b-row>
				<b-col cols='4'></b-col>
				<b-col>
					<b-form-input class='minb' v-model='ainval' placeholder='2a' :state='astate' @keyup.native='checking(ainval, twoa, "astate")'></b-form-input>
				</b-col>
			</b-row>
			</span>
		</span>
		<b-row>
			<b-col cols="8"></b-col>
			<b-col v-if='hint3' cols="3">
				<b-form-input
		                type="text"
		                placeholder="x1"
		                v-model.trim="usersX1"
		                id="inputForm1">                   	
		        </b-form-input>
		    </b-col>
		</b-row>
		<b-row v-if='hint3'>
			<b-col cols='8'>
			</b-col>
			<b-col cols='3'>
		        <b-form-input
		                type="text"
		                placeholder="x2"
		                v-model.trim="usersX2"
		                id="inputForm2">                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="1">
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>
		<ch-alerts :checked='checked' :result='"x1: " + rightx1 + ", x2: " + rightx2'></ch-alerts>
	</div>
</template>

<script>
	import {bus} from './../../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'

	export default {
		data() {
			return {
				task: '',
				unmodtask: '',
				checked: '',
				usersX1: '',
				usersX2: '',
				rightx1: 0,
				rightx2: 0,
				hint1: false,
				ok: false,
				hint2: false,
				hint3: false,
				discriminant: '',
				disc: '$$x_{1;2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$',
				bstate: false,
				dstate: false,
				astate: false,
				binval: '',
				dinval: '',
				ainval: '',
				minb: '',
				twoa: '',
			}
		},
		components: {
			'ch-alerts': CheckAlerts,
			'heading': Heading,
		},		
		methods: {
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			znamenko() {
				var arr = [1, -1];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			genTask() {
				this.disc = '$$x_{1;2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$';
				var x1 = this.randomNumber(0, 19) * this.znamenko();
				var x2 = this.randomNumber(0, 19) * this.znamenko();
				this.rightx1 = x1;
				this.rightx2 = x2;
				var a = this.randomNumber(1, 5) * this.znamenko();	
				this.twoa = 2 * a;			
				var b = - a * (x1 + x2);
				this.minb = - b;
				var disc = Math.pow(b, 2);
				var bx = '';
				if (b > 0) {
					bx = '+ ' + b + 'x';
				} else if (b == 0) {
					bx = '';
				} else {
					bx = b + 'x';
				}	
				var c = a * (x1 * x2);
				disc -= 4 * a * c;
				this.discriminant = disc;
				var ax = a;
				if (a == 1) {
					ax = '';
				}
				var cx = c;
				if (c > 0) {
					cx = '+' + c;
				} else if (c == 0) {
					cx = '';
				}		
				var string = '$$' + ax + 'x^2' + bx + cx + '= 0$$';
				this.unmodtask = string;
				var amod = this.randomNumber(0, 99) * this.znamenko();
				var bmod = this.randomNumber(0, 99) * this.znamenko();
				var cmod = this.randomNumber(0, 99) * this.znamenko();
				var modia = a + amod;
				var modib = b + bmod;
				var modic = c + cmod;
				var bx2 = '';
				if (modib > 0) {
					bx2 = '+ ' + modib + 'x';
				} else if (modib == 0) {
					bx2 = '';
				} else {
					bx2 = modib + 'x';
				}	
				var ax2 = modia;
				if (modia == 1) {
					ax2 = '';
				} else if(modia == 0) {
					ax2 = '';
				}
				var cx2 = modic;
				if (modic > 0) {
					cx2 = '+' + modic;
				} else if (modic == 0) {
					cx2 = '';
				}
				if (bmod > 0) {
					bmod = ' + ' + bmod + 'x';
				} else if (bmod < 0) {
					bmod += 'x';
				} else {
					bmod = '';
				}
				if (cmod > 0) {
					cmod = ' + ' + cmod;
				} else if (cmod == 0) {
					cmod = '';
				}
				var modstring = '$$' + ax2 + 'x^2' + bx2 + cx2 + '= ' + amod +'x^2' + bmod + cmod + '$$';
				this.task = modstring;
				this.hint1 = false;
				this.hint2 = false;
				this.hint3 = false;
				this.ok = false;
				this.checked = '';
				console.log(x1 + " " + x2);

				document.getElementById("inputForm1").value = '';
				document.getElementById("inputForm2").value = '';
			},
			check() {
				if (this.rightx1 == this.usersX1 && this.rightx2 == this.usersX2 || this.rightx1 == this.usersX2 && this.rightx2 == this.usersX1) {
					this.checked = 'right';
					console.log('supr');
				} else {
					this.checked = 'wrong';
					console.log('meh');
				}
			},
			checking(inputvalue, right, state) {
				console.log('checking' + inputvalue + " " + right + " " + state);
				var value = false;
				if (inputvalue == right) {
					value = true;
				}
				if (state == 'bstate') {
					this.bstate = value;
				} else if (state == 'dstate') {
					this.dstate = value;
				} else {
					this.astate = value;
				}
				if (this.bstate && this.astate && this.dstate) {
					this.hint3 = true;
				}
			},
			discrime() {
				this.disc = '$$x_{1;2} = $$';
				this.ok = true;
			}
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
	.minb {
		max-height: 24px;
		max-width: 36px !important;
		padding: 0 0 0 0;
		display: inline !important;
	}
	.disco {
		max-height: 24px;
		max-width: 68px !important;
		padding: 0 0 0 0;
		display: inline !important;	
		border-top: 1px solid black !important;
	}
	.bigger {
		font-size: 24px;
	}
	.frac {
		background-color: black;
	}
	.hintstyle {
		color: #aaa;
	}
</style>