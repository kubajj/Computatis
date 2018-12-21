<template>
	<div>
		<heading head='Sčítání a odčítání čísel do 100'></heading>
		<main-task :task='task' :result='result' :checked='checked'></main-task>
	</div>
</template>

<script>
	import {bus} from './../../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import MainTask from './../DevelopComponents/MainTask.vue'

	export default {
		data() {
			return {
				result: 0,
				usersResult: '',
				checked: '',
				task: '',
			}
		},
		components: {
			'vue-mathjax': VueMathjax,
			'heading': Heading,
			'main-task': MainTask,
		},
		methods: {
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			genTask() {				
				var quantity = this.randomNumber(3, 10);
				var arrayOfValues = [];
				for (let i = 0; i < quantity; i++) {
					arrayOfValues[i] = this.randomNumber(1, 100);
				}
				var	task = "$$" + arrayOfValues[0];
				var result = arrayOfValues[0];
				for (let i = 1; i < quantity; i++) {
					var sign = this.randomNumber(0, 1);
			      	if (sign == 0) {
			      		task += " - " + arrayOfValues[i];
			      		result -= arrayOfValues[i];
			      	} else {
			      		task += " + " + arrayOfValues[i];
			      		result += arrayOfValues[i];
			      	}
			    }
			   	task += " = $$";
			    console.log(result);
			    this.result = result;
			    this.task = task;
			    this.checked = '';
			    return task;
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

