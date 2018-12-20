<template>
	<div>
		<b-row>
			<b-col>
				<b-dropdown id="ddown1" text="Rovnice" class="m-md-2">
				    <b-dropdown-item @click="rovnice(1)">Lineární rovnice</b-dropdown-item>
				    <b-dropdown-item @click="rovnice(2)">Kvadratické rovnice</b-dropdown-item>
				    <b-dropdown-item @click="rovnice(3)">Rovnice s odmocninou</b-dropdown-item>
				    <b-dropdown-divider></b-dropdown-divider>
				</b-dropdown>
				<b-dropdown id="ddown1" text="Funkce" class="m-md-2">
				    <b-dropdown-item @click="funkce(1)">Lineární funkce</b-dropdown-item>
				    <b-dropdown-item @click="funkce(2)">Kvadratické funkce</b-dropdown-item>
				    <b-dropdown-item @click="funkce(3)">Exponenciální funkce</b-dropdown-item>
				    <b-dropdown-divider></b-dropdown-divider>
				</b-dropdown>
				<b-dropdown id="ddown1" text="Aritmetika" class="m-md-2">
				    <b-dropdown-item @click="aritmetika(1)">Sčítání a odčítání čísel do 100</b-dropdown-item>
				    <b-dropdown-item @click="aritmetika(2)">Aritmetika do 1000</b-dropdown-item>
				    <b-dropdown-item @click="aritmetika(3)">Aritmetika reálného oboru čísel</b-dropdown-item>
				    <b-dropdown-divider></b-dropdown-divider>
				</b-dropdown>
			</b-col>
			<b-col cols="8">
				<component :is="content"></component>
			</b-col>
			<b-col>
				<b-button v-if="content != 'uvod'" @click="zpet"><strong>⮈</strong> Zpět</b-button>				
				<b-button v-if="content != 'uvod'" @click="next">Další <strong>⮊</strong></b-button>
			</b-col>
		</b-row>
	</div>
</template>


<script>
	import {bus} from './../../main.js';
	import Uvod from './Problems/UvodKProcvicovani.vue';
	import Rovnice1 from './Problems/Equations/LinearEquation.vue';
	import Rovnice2 from './Problems/Equations/PolynomEquation.vue';
	import Aritmetika1 from './Problems/Arithmetic/AddSubTo100.vue';
	import Funkce from './Problems/Functions/Funkce.vue';	

	export default {
		data() {
			return {
				content: "uvod",

			}
		},
		components: {
			'uvod': Uvod,
			'rovnice1': Rovnice1,
			'rovnice2': Rovnice2,
			'aritmetika1': Aritmetika1,	
			'funkce': Funkce,
		},
		methods: {
			rovnice(index) {
				console.log("rovnice" + index);
				this.content = "rovnice" + index;
			},
			funkce(index) {
				console.log("funkce" + index);
				this.content = "funkce" + index;
			},
			aritmetika(index) {
				console.log("aritmetika" + index);
				this.content = "aritmetika" + index;
			},
			zpet() {
				this.content = "uvod";
			}, 
			next() {
				bus.$emit('next');
			}
		}
	}
</script>