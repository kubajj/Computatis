<template>
	<div>
		<heading head='Násobení pod sebou'></heading>
		<span v-if='begin == false'>
			<p>{{ number }} x {{ multiplier }} = </p>
			<p @click='giveHint' class='hintstyle'>Chci násobit pod sebou</p>
		</span>
		<span v-else>
			<div v-if='begin' class='first'>
				<nbsp :num='spacesNum - 3'/>
				<span id="num">{{ number }}</span>
			</div>
			<div v-if='begin' class='second'>
				<nbsp :num='spacesNum - 4'/>
				<span id="num" class="multi">x&nbsp{{ multiplier }}</span>
			</div>
			<hint v-if='begin'
				class='hint' 
				@changeStatus='changeStatus' 
				:number='number' 
				:multiplier='multiplier' 
				@spaces='updateSpaces($event)'>				
			</hint>
		</span>
		<b-row>
			<b-col cols="8"></b-col>
			<b-col cols="3">
				<b-form-input						
		                type="text"
		                placeholder="Výsledek"
		                v-model="usersResult"
		                id="inputRes">                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="1">
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>
		<b-row>
			<b-col>	
				<ch-alerts :checked='checked' :result='result'></ch-alerts>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import {bus} from './../../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import MainTask from './../DevelopComponents/MainTask.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'
	import Hint from './../DevelopComponents/Hint.vue'
	import Nbsp from './../DevelopComponents/Nbsp.vue'

	export default {
		data() {
			return {
				result: 0,
				usersResult: '',
				checked: '',
				multiplier: '',
				number: '',
				usersResult: '',
				hinted1: false,
				spacesNum: 0,
				resultBox: false,
				begin: false,
			}
		},
		components: {
			'vue-mathjax': VueMathjax,
			'heading': Heading,
			'main-task': MainTask,
			'ch-alerts': CheckAlerts,
			'hint': Hint,
			'nbsp': Nbsp,
		},
		methods: {
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			genTask() {	
				this.begin = false;
				this.resultBox = false;
				this.multiplier = this.randomNumber(11, 99);
				this.number = this.randomNumber(101, 999);
				this.result = this.number * this.multiplier;
				this.checked = '';
				this.hinted1 = false;			  
			},
			changeStatus() {
				this.hinted1 = true;
				console.log('hint 1 true');
			},
			updateSpaces(maxSpaces) {
				this.spacesNum = maxSpaces;
				console.log('spacesUpdated ' + maxSpaces)
			},
			check() {
				if (this.usersResult == this.result) {
					this.checked = 'right';
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputRes").value = '';
			}, 
			giveHint() {
				this.begin = true;
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
	#num {
		margin-bottom: 0px !important;
		font-size: 20px;
		font-family: monospace;
	}
	.multi {
		text-decoration: underline;
	}
	.hint {
		margin-bottom: 6px;
	}
	p {
		margin-bottom: none;
	}
	#text {
		display: none;
	}
	span {
	  padding: 0 0 0 0;
	  margin: 0;
	}
	.first {
		display: flex;
		flex-direction: row;
	}
	.second {
		display: flex;
		flex-direction: row;
	}
</style>

