<template>
	<div>
	<b-row>
		<b-col cols='2'></b-col>
		<b-col cols='8'>
	  		<b-jumbotron class='content'>
				<div>
					<b-row>
						<b-col>
							<div class='dropdiv'>
								<b-dropdown id="ddown1" text="Rovnice" class="m-md-2">
								    <b-dropdown-item @click="rovnice(1)">Lineární rovnice</b-dropdown-item>
								    <b-dropdown-item @click="rovnice(2)">Kvadratické rovnice</b-dropdown-item>
								    <b-dropdown-item @click="rovnice(3)">Rovnice s odmocninou</b-dropdown-item>
								    <b-dropdown-divider></b-dropdown-divider>
								</b-dropdown>
							</div><!--div class='dropdiv'>
								<b-dropdown id="ddown1" text="Funkce" class="m-md-2">
								    <b-dropdown-item @click="funkce(1)">Lineární funkce</b-dropdown-item>
								    <b-dropdown-item @click="funkce(2)">Kvadratické funkce</b-dropdown-item>
								    <b-dropdown-item @click="funkce(3)">Exponenciální funkce</b-dropdown-item>
								    <b-dropdown-divider></b-dropdown-divider>
								</b-dropdown>
							</div--><div class='dropdiv'>
								<b-dropdown id="ddown1" text="Aritmetika" class="m-md-2">
								    <b-dropdown-item @click="aritmetika(1)">Sčítání a odčítání čísel do 100</b-dropdown-item>
								    <b-dropdown-item @click="aritmetika(2)">Aritmetika do 1000</b-dropdown-item>
								    <b-dropdown-item @click="aritmetika(3)">Aritmetika reálného oboru čísel</b-dropdown-item>
								    <b-dropdown-item @click="aritmetika(4)">Násobení</b-dropdown-item>
								    <b-dropdown-divider></b-dropdown-divider>
								</b-dropdown>
							</div>
						</b-col>
						<b-col cols="8">
							<component :is="content"></component>
						</b-col>
					</b-row>
					<b-row>
						<b-button v-if="content != 'uvod'" @click="zpet" class='navibut'><strong>⮈</strong> Zpět</b-button>				
						<b-button v-if="content != 'uvod'" @click="next" class='navibut'>Další <strong>⮊</strong></b-button>
					</b-row>
				</div>
			</b-jumbotron>
		</b-col>
		<b-col cols='2'></b-col>
	</b-row>
  </div>
</template>


<script>
	import {bus} from './../main.js';
	import Uvod from './PracContentFiles/UvodKProcvicovani.vue';
	import Rovnice1 from './PracContentFiles/Equations/LinearEquation.vue';
	import Rovnice2 from './PracContentFiles/Equations/PolynomEquation.vue';
	import Aritmetika1 from './PracContentFiles/Arithmetic/AddSubTo100.vue';
	import Funkce from './PracContentFiles/Functions/Funkce.vue';	
	import LongMultiplication from './PracContentFiles/Arithmetic/LongMultiplication.vue';	

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
			'aritmetika4': LongMultiplication,
			'funkce1': Funkce,
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

<style>
	.ddown1 {
		background-color:#a20c16;
		border: none;
	}

	a.dropdown-item:active {
		background-color: white;
		color: #d4050c;
	}
	.navibut {
		margin: 0px 5px 0px 5px;
	}
	.dropdiv {
		margin-top: 5px;
	}
	.hintstyle {
		color: #aaa;
	}
</style>