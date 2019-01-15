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
								    <b-dropdown-item><router-link to='/procvicovani/linearnirovnice'>Lineární rovnice</router-link></b-dropdown-item>
								    <b-dropdown-item><router-link to='/procvicovani/kvadratickarovnice'>Kvadratické rovnice</router-link></b-dropdown-item>
								    <!--b-dropdown-item @click="rovnice(3)">Rovnice s odmocninou</b-dropdown-item-->
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
								    <b-dropdown-item><router-link to='/procvicovani/scitaniaodcitanido100'>Sčítání a odčítání čísel do 100</router-link></b-dropdown-item>
								    <!--b-dropdown-item @click="aritmetika(2)">Aritmetika do 1000</b-dropdown-item>
								    <b-dropdown-item @click="aritmetika(3)">Aritmetika reálného oboru čísel</b-dropdown-item-->
								    <b-dropdown-item><router-link to='/procvicovani/nasobeni'>Násobení</router-link></b-dropdown-item>
								    <b-dropdown-divider></b-dropdown-divider>
								</b-dropdown>
							</div>
						</b-col>
						<b-col cols="8">
							<router-view/>
						</b-col>
					</b-row>
					<b-row v-if='$route.path != "/procvicovani"'>
						<b-button><router-link to='/procvicovani' class='backandnext'><strong>⮈</strong> Zpět</router-link></b-button>				
						<b-button @click="next" class='backandnext'>Další <strong>⮊</strong></b-button>
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

	export default {
		methods: { 
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
	.backandnext {
		margin: 0px 5px 0px 5px;
		text-decoration: none;
		color: white;
	}
	.backandnext:hover {
		text-decoration: underline;
		color: red;
	}
	.backandnext:active {
		text-decoration: underline;
		color: white;
		background-color: red;
	}
	.dropdiv {
		margin-top: 5px;
	}
	.hintstyle {
		color: #aaa;
	}
</style>