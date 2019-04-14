<template>
	<div>
		<heading head='Kvadratická rovnice'></heading>
		<b-row>
			<vue-mathjax :formula="task"></vue-mathjax>
		</b-row>		
		<b-row v-if='hint1 == false'>
			<b-col cols='2' sm='4' md='6' lg='8' xl='8'></b-col>
			<b-col cols='10' sm='8' md='6' lg='4' xl='4'>
				<p @click='hint1 = true;' class='hintstyle'>Nápovědu prosím</p>
			</b-col>
		</b-row>
		<span v-if='hint1'>
			<b-row>
				<p>Vše na levou stranu:</p>
			</b-row>
			<b-row>
				<b-col cols='12' sm='10' md='10' lg='8' xl='8'>
					<vue-mathjax :formula="unmodtask"/>
				</b-col>
				<b-col
					offset='10' offset-sm='10' offset-md='10'
					cols='2' sm='2' md='2' lg='2' xl='2'
					style='margin-bottom: 5px;'
					v-if='hint2 == false' 
					@click='hint2 = true' 
					class='hintstyle'>
						OK ✔
				</b-col>
			</b-row>
		</span>			
		<span v-if='hint2 == true'>
			<span v-if='mode == "disc"'> <!-- if the quadratic equation have all terms (a, b, c) the discriminant is used and shown to user-->
				<b-row><h6>Diskriminant:</h6></b-row>
				<b-row v-if='ok == false'>
					<b-col cols='10' sm='10' md='10' lg='8' xl='8' style='margin-bottom: 5px;'>
						<vue-mathjax :formula="disc"/><!-- shows user the discriminant formula -->
					</b-col>		
					<b-col 
						cols='2' sm='2' md='2' lg='2' xl='2'
						v-if='ok == false'  
						@click='discrime' 
						class='hintstyle'>
							OK ✔
					</b-col>
				</b-row>
				<span v-if='ok'> <!-- the parts of disc. formula are changed to inputs and ready to be filled in by user -->
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
							<span style="display: inline-block; margin-right: -6px;">± √</span>
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
								style='margin-bottom: 5px;' 
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
			<span v-else-if='mode == "fact"'> <!-- if the c term is missing, the factorization is used and shown to user -->
				<b-row><h6>Rozklad na součin:</h6></b-row>
				<b-row>
					<b-col cols='8'>
						<vue-mathjax :formula="fact"/>
					</b-col>
				</b-row>
			</span>
			<span v-else-if='mode == "sqrt"'> <!-- the square root method is used when the b term is missing -->
				<b-row><h6>Odmocnění:</h6></b-row>
				<b-row>
					<b-col cols='8'>
						<vue-mathjax :formula="sqrt"/>
					</b-col>
				</b-row>
			</span>
		</span>		
		<b-row> <!-- following inputs are the result inputs, there are two of them, because it is quadratic equation combined from two result -->
			<b-col cols='4' sm='5' md='5' lg='7' xl='8'></b-col>
			<b-col cols='5' sm='5' md='5' lg='4' xl='3'>
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
			<b-col cols='4' sm='5' md='5' lg='7' xl='8'></b-col>
			<b-col cols='5' sm='5' md='5' lg='4' xl='3'>
		        <b-form-input
	                type="text"
	                placeholder="x2"
	                v-model.trim="usersX2"
	                @keyup.native.enter='check'
	                id="inputForm2"		                
	                style='margin-bottom: 5px;'>                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols='3' sm='2' md='2' lg='1' xl='1'>
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>
		<ch-alerts :checked='checked' :result='"x1: " + rightX1 + ", x2: " + rightX2'></ch-alerts> <!-- if one of the results is missing or at least one of the is wrong, this component shows the correct result and allows user to skip to the next task -->
		<b-alert 
			v-if='onlyone' 
			show variant="danger">
			Vyplňte prosím oba výsledky
		</b-alert> <!-- this alert is shown, if one of the results is missing and the user already pressed enter -->
	</div>
</template>

<script>
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'
	//Task to practice the solution of quadratic equations.
	//@group Tasks
	export default {
		name: 'quadratic-equation',
		introduction: 'Quadratic equation component',
		description: `
			Task to practice the solution of quadratic equations.
		`,
		token: "<quadratic-equation/>",
		data() {
			return {
				task: '',
				unmodtask: '',//the left side - the right side
				checked: '',
				usersX1: '',//first result input
				usersX2: '',//second result input
				rightX1: 0,//right results
				rightX2: 0,
				hint1: false,//hint that shows unmodified task
				ok: false,//user understands the discriminant formula 
				hint2: false,
				hint3: false,
				disc: '$$x_{1;2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$', //discriminant formula without any changes
				fact: '',
				sqrt: '',
				bstate: false,//variables that stores the information about the border color of inputs in discriminant formula
				dstate: false,
				astate: false,
				binval: '',//variables that stores the user input values from inputs in discriminant formula
				dinval: '',
				ainval: '',
				discriminant: '',//correct results of the discriminant formula inputs
				minb: '',
				twoa: '',
				mode: 'disc',
				onlyone: false,//user submitted only one result
			}
		},
		components: {
			'ch-alerts': CheckAlerts,
			'heading': Heading,
		},		
		methods: {
			//@vuese
			//this method generates a random number in the interval that was specified in the parentheses
			//@arg minimal value;&nbsp;
			//@arg maximal value
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			//@vuese
			//this method simplifies the process of having numbers with negative value while not including 0
			sign() { 
				var arr = [1, -1];
				var rnd = this.randomNumber(0,1);
				return arr[rnd];
			},
			//@vuese
			//this method resets all variables that have been changed and will be used in the next call of genTask
			resetAll() { 
				this.onlyone = false;
				this.usersX1 = '';
				this.usersX2 = '';
				this.mode = 'disc';
				this.disc = '$$x_{1;2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$';
			},
			//@vuese
			//this method generates the task
			genTask() { 	
				this.resetAll();			
				var x1 = this.randomNumber(-19, 19);
				var x2 = this.randomNumber(-19, 19);
				this.rightX1 = x1;
				this.rightX2 = x2;
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
			//@vuese
			//this method handles special values before x^2
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
			//@vuese
			//this method handles special values before x
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
			//@vuese
			//this method adds + operand where it is needed before c and also handles special values of c term
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
			//@vuese
			//this method generates basic unmodified task
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
			//@vuese
			//this method changes the unmodtask to be more complicated by adding right part (after =)
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
			//@vuese			
			//this method handles results submitted by user and their evaluation and correction
			check() {
				if (this.checked == 'right') { //if the user result is right and user press enter 2 times, it generates next task
					this.genTask();
					return;
				}
				if (this.usersX1 == "" || this.usersX2 == "") { //handles the situation when one of two results was not submitted
					this.onlyone = true;
					return;
				}
				if (this.rightX1 == this.usersX1 && this.rightX2 == this.usersX2 || this.rightX1 == this.usersX2 && this.rightX2 == this.usersX1) {//checks if the user results (inserted to input) are right
					this.checked = 'right';
					this.onlyone = false;
				} else {
					this.checked = 'wrong';
					this.onlyone = false;
				}
			},
			//@vuese
			//this mathod handles the correction of inputs in discriminant formula
			//@arg inputValue = user input;&nbsp;
			//@arg right = correct value;&nbsp;
			//@arg state = variable that is supposed to be changed
			checkOfTheDiscForm(inputvalue, right, state) {
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
			//@vuese
			//simplify the change from whole disc formula to disc with inputs
			discrime() {
				this.disc = '$$x_{1;2} = $$';
				this.ok = true;
			},
			//@vuese
			//hides OK button
			hideOK() { 
				this.hint3 = true;
				this.ok = true;
			},
		},
		beforeMount() {//genereates the task when the component loads
			this.genTask();
		},
		mounted() { //enables the usage of next method in PracContent.vue
		    bus.$on('next', this.genTask);
		},  
	}
	
</script>

<style>
	.minb {
		max-height: 24px;
		max-width: 36px !important;
		padding: 0 0 0 0 !important;
		display: inline !important;
	}
	.disco {
		max-height: 24px;
		max-width: 68px !important;
		padding: 0 0 0 0 !important;
		display: inline !important;	
		border-top: 1px solid black !important;
	}
	.bigger {
		font-size: 24px;
	}
	.frac {
		background-color: black;
	}
	.form-control.is-invalid, .was-validated .form-control:invalid, .form-control.is-valid, .was-validated .form-control:valid {
		background-image: none !important;
		background: none !important;	
		padding: 0 0 0 0;	
	}
</style>