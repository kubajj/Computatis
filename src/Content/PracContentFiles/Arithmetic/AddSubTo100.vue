<template>
	<div>
		<b-row>
			<heading head='Sčítání a odčítání do 100'></heading>
			<b-col cols='7'></b-col>
			<b-col cols='1'><b-button v-b-modal.modal-tall>?</b-button></b-col>
		</b-row>
		<b-modal id="modal-tall" title="Overflowing Content">
		    <p class="my-4" v-for="i in 20" :key="i">
		      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
		      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
		    </p>
		</b-modal>
		<b-row style='margin-top: 5px;'>
			<b-col cols="8">
				<vue-mathjax :formula="task"></vue-mathjax>
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
		<!--b-row style='margin-top: 5px;'>
			<b-col cols='8'></b-col>
			<b-col cols='4'>
				<p>Maximum:</p>
			</b-col>
		</b-row>
		<b-row style='margin-top: -15px;'>
			<b-col cols='8'></b-col>
			<b-col cols='4'>
				<b-input-group prepend="10" append="10000">
					<b-form-input 
						v-model='max'
						@change='genTask'
						type="range" 
						min="10" 
						max="10000"/>
				</b-input-group>
			</b-col>
		</b-row>
		<b-row style='margin-top: 5px;'>
			<b-col cols='8'></b-col>
			<b-col cols='4'>
				<p>Počet sčítanců/menšitelů:</p>
			</b-col>
		</b-row>
		<b-row style='margin-top: -15px;'>
			<b-col cols='8'></b-col>
			<b-col cols='4'>
				<b-input-group prepend="3" append="10">
					<b-form-input 
						v-model='maxQuantity'
						@change='genTask'
						type="range" 
						min="3" 
						:max="10"/>
				</b-input-group>
			</b-col>
		</b-row-->
		<ch-alerts :checked='checked' :result='result'></ch-alerts>
	</div>
</template>

<script>
	import {bus} from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'

	export default {
		data() {
			return {
				result: 0,
				usersResult: '',
				checked: '',
				task: '',
				max: 100,
				maxQuantity: 8,
				modal: false,
			}
		},
		components: {
			'vue-mathjax': VueMathjax,
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
			genTask() {	
			    this.checked = ''
			    var quantity = this.randomNumber(3, this.maxQuantity);	
			    var first = this.randomNumber(1, this.max)*this.sign();
			    this.task = '$$' + first;
			    var currentValue = first;
			    for (let i = 1; i < quantity; i++) {
			    	/*var newNumber = this.randomNumber(1, this.max)*this.sign();
			    	if (newNumber > 0) {
			    		this.task += '+' + newNumber;
			    	} else {
				    	this.task += newNumber; 
				    }
			    	this.result += newNumber;*/
			    	var newNumber = this.randomNumber(-currentValue, (100 - currentValue) > 100 ? 100 : (100 - currentValue));
			    	currentValue += newNumber;
			    	if (newNumber > 0) {
			    		this.task += '+' + newNumber;
			    	} else {
				    	this.task += newNumber; 
				    }
			    }
			    this.result = currentValue;
			    this.task += ' = $$';
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

