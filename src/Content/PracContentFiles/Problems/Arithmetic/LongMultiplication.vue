<template>
	<div>
		<heading head='Násobení pod sebou'></heading>
		<div class='first'>
			<nbsp v-if='hinted == false' :num='1'/>
			<nbsp v-else :num='spacesNum - 3'/>
			<span id="num">{{ number }}</span>
		</div>
		<div class='second'>
			<nbsp v-if='hinted' :num='spacesNum - 4'/>
			<span id="num" class="multi">x&nbsp{{ multiplier }}</span>
		</div>
		<hint class='hint' @changeStatus='changeStatus' :hintProp='hinted' :number='number' :multiplier='multiplier' @spaces='updateSpaces($event)'></hint>
		<b-row v-if='hinted == false'>
			<b-col cols="8"></b-col>
			<b-col cols="3">
				<b-form-input						
		                type="text"
		                placeholder="Enter your result"
		                v-model="usersResult"
		                id="inputForm">                   	
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
				hinted: false,
				spacesNum: 0,
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
				this.multiplier = this.randomNumber(11, 99);
				this.number = this.randomNumber(101, 999);
				this.result = this.number * this.multiplier;
				this.checked = '';
				this.hinted = false; 
			},
			check() {
				if (this.usersResult == this.result) {
					this.checked = 'right';
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputForm").value = '';
			}, 
			changeStatus() {
				this.hinted = true;
			},
			updateSpaces(maxSpaces) {
				this.spacesNum = maxSpaces;
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

