<template>
	<div>
		<heading head='Kvadratická rovnice'></heading>
		<b-row>
			<vue-mathjax :formula="task"></vue-mathjax>
		</b-row>		
		<b-row v-if='hint1 == false'>
			<b-col cols='8'></b-col>
			<b-col cols='3'>
				<p @click='hint1 = true;' class='hintstyle'>Nápovědu prosím</p>
			</b-col>
		</b-row>
		<span v-if='hint1'>
			<b-row>
				<p>Vše na levou stranu:</p>
			</b-row>
			<b-row>
				<b-col cols='10'>
					<vue-mathjax :formula="unmodtask"/>
				</b-col>
				<b-col 
					cols='2'
					v-if='hint2 == false' 
					@click='hint2 = true' 
					class='hintstyle'>
						OK ✔
				</b-col>
			</b-row>
		</span>			
		<span v-if='hint2 == true'>
			<span v-if='mode == "disc"'>
				<b-row><h6>Diskriminant:</h6></b-row>
				<b-row v-if='ok == false'>
					<b-col cols='8'>
						<vue-mathjax :formula="disc"/>
					</b-col> <!-- vysvětlit, proč z tohohle  nedělat component-->				
					<b-col 
						cols='2'
						v-if='ok == false'  
						@click='discrime' 
						class='hintstyle'>
							OK ✔
					</b-col>
				</b-row>
				<span v-if='ok'>
					<b-row>
						<b-col cols='3'></b-col>
						<b-col>
							<b-form-input 
								class='minb' 
								v-model='binval' 
								placeholder='-b' 
								:state='bstate' 
								@keyup.native='checkOfTheDiscForm(binval, minb, "bstate")'>								
							</b-form-input>
							<span style="display: inline-block; margin-right: -11px;">± √</span>
							<b-form-input 
								class='disco' 
								v-model='dinval' 
								placeholder='b²-4ac' 
								:state='dstate' 
								@keyup.native='checkOfTheDiscForm(dinval, discriminant, "dstate")'>								
							</b-form-input>
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
							<b-form-input 
								class='minb' 
								v-model='ainval' 
								placeholder='2a' 
								:state='astate' 
								@keyup.native='checkOfTheDiscForm(ainval, twoa, "astate")'>								
							</b-form-input>
						</b-col>
					</b-row>
				</span>
			</span>
			<span v-else-if='mode == "fact"'>
				<b-row><h6>Rozklad na součin:</h6></b-row>
				<b-row>
					<b-col cols='8'>
						<vue-mathjax :formula="fact"/>
					</b-col>
				</b-row>
			</span>
			<span v-else-if='mode == "sqrt"'>
				<b-row><h6>Odmocnění:</h6></b-row>
				<b-row>
					<b-col cols='8'>
						<vue-mathjax :formula="sqrt"/>
					</b-col>
				</b-row>
			</span>
		</span>		
		<b-row>
			<b-col cols='8'></b-col>
			<b-col cols="3">
				<b-form-input
	                type="text"
	                placeholder="x1"
	                v-model.trim="usersX1"
	                @keyup.native.enter='check'
	                id="inputForm1">                   	
		        </b-form-input>
		    </b-col>
		</b-row>
		<b-row>
			<b-col cols='8'></b-col>
			<b-col cols='3'>
		        <b-form-input
	                type="text"
	                placeholder="x2"
	                v-model.trim="usersX2"
	                @keyup.native.enter='check'
	                id="inputForm2">                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="1">
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>
		<ch-alerts :checked='checked' :result='"x1: " + rightx1 + ", x2: " + rightx2'></ch-alerts>
		<b-alert 
			v-if='onlyone' 
			show variant="danger">
			Vyplňte prosím oba výsledky
		</b-alert>
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
				fact: '',
				sqrt: '',
				bstate: false,
				dstate: false,
				astate: false,
				binval: '',
				dinval: '',
				ainval: '',
				minb: '',
				twoa: '',
				mode: 'disc',
				onlyone: false,
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
			sign() {
				var arr = [1, -1];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			genTask() {
				this.onlyone = false;
				this.usersX1 = '';
				this.usersX2 = '';
				this.mode = 'disc';
				this.disc = '$$x_{1;2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$';
				var x1 = this.randomNumber(-19, 19);
				var x2 = this.randomNumber(-19, 19);
				this.rightx1 = x1;
				this.rightx2 = x2;
				var a = this.randomNumber(1, 5) * this.sign();
				var b = - a * (x1 + x2);
				var c = a * (x1 * x2);
				this.twoa = 2 * a;
				this.minb = - b;
				this.discriminant = Math.pow(b, 2) - 4 * a * c;
				var bx = this.controlB(b, 1);
				var ax = this.controlA(a, 1);
				var cx = this.controlC(c, 1);	
				this.unmodTaskGenerator(a, b, c, ax, bx, cx);
				this.modTaskGenerator(a, b, c);			
				this.hint1 = false;
				this.hint2 = false;
				this.hint3 = false;
				this.ok = false;
				this.checked = '';

				this.$data.usersX1 = '';
				this.$data.usersX2 = '';
			},
			controlA(a, mode) {
				var ax = a;
				var add = '';
				if (mode != 3) {
					add = 'x^2';
				}
				if (a == 1) {
					ax = add;
				} else if (a == -1) {
					ax = '-' + add;
				} else if (a == 0 && mode == 2) {
					ax = '';
				} else {
					ax = a + add;
				}
				return ax;
			},
			controlB(b, mode) {
				var bx = '';
				if (b > 0) {
					if (mode == 3) {
						bx = b + 'x';
					} else {
						bx = '+' + b + 'x';
					}
				} else if (b == 0) {
					bx = '';
					if (mode == 1) {
						this.mode = 'sqrt'; //square root of number c
					}
				} else if (b == -1) {
					bx = '-x';
				} else {
					bx = b + 'x';
				}
				return bx;
			},
			controlC(c, mode) {
				var cx = c;
				if (c > 0) {
					cx = '+' + c;
				} else if (c == 0) {
					cx = '';
					if (mode == 1) {
						this.mode = 'fact'; //factorization 
					}
				}	
				return cx;
			},
			unmodTaskGenerator(a, b, c, ax, bx, cx) {
				if (this.mode == 'sqrt') {	
					if (c > 0)	{
						this.sqrt = '$$' + ax + '=' + '-' + c + '$$';
					} else {
						var ct = c * (-1);
						this.sqrt = '$$' + ax + '=' + ct + '$$';
					}
				} else if (this.mode == 'fact') {
					if (a > 0) {
						a = this.controlA(a, 3);
						var signb = 0;
						if (b > 0) {
							signb = '+' + b;
						} else {
							signb = b;
						}
						this.fact = '$$x(' + a + 'x' + signb + ') = 0$$';  
					} else {
						var minb = 0;
						if (b > 0) {
							minb = - b;
						} else {
							minb = '+' + b * (-1);
						}
						var mina = -a;
						if (mina == 1) {
							mina = '';
						}
						this.fact = '$$-x(' + mina + 'x' + minb + ') = 0$$';  
					}
				}
				var string = '$$' + ax + bx + cx + '= 0$$';
				this.unmodtask = string;
			},
			modTaskGenerator(a, b, c) {				
				var amod = this.randomNumber(-99, 99);
				var bmod = this.randomNumber(-99, 99);
				var cmod = this.randomNumber(-99, 99);
				var modia = a + amod;
				var modib = b + bmod;
				var modic = c + cmod;
				var ax2 = this.controlA(modia, 2);
				if (ax2 != 'x^2') {
					var bx2 = this.controlB(modib, 2);
				} else {
					var bx2 = this.controlB(modib, 3);
				}
				var cx2 = this.controlC(modic, 2);
				amod = this.controlA(amod, 2);
				bmod = this.controlB(bmod, 2);
				cmod = this.controlC(cmod, 2);
				var modstring = '$$' + ax2 + bx2 + cx2 + '= ' + amod + bmod + cmod + '$$';
				this.task = modstring;
			},
			check() {
				if (this.checked == 'right') {
					this.genTask();
					return;
				}
				if (this.usersX1 == "" || this.usersX2 == "") {
					this.onlyone = true;
					return;
				}
				if (this.rightx1 == this.usersX1 && this.rightx2 == this.usersX2 || this.rightx1 == this.usersX2 && this.rightx2 == this.usersX1) {
					this.checked = 'right';
					this.onlyone = false;
					console.log('supr');
				} else {
					this.checked = 'wrong';
					this.onlyone = false;
					console.log('meh');
				}
			},
			checkOfTheDiscForm(inputvalue, right, state) {
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
			},
			hideOK() {
				this.hint3 = true;
				this.ok = true;
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
</style>