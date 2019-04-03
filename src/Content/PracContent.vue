<template>
	<div>
		<b-row>
			<b-col cols='0' sm='0' md='1' lg='2' xl='2'></b-col>
			<b-col cols='12' sm='12' md='10' lg='8' xl='8'>
		  		<b-jumbotron class='content'>
					<div>
						<b-row>
							<b-col>
								<div class='dropdiv'>
									<b-dropdown size="lg" id="ddown1" text="Rovnice">
									    <b-dropdown-item><router-link to='/procvicovani/linearnirovnice' class='routerbutton'>Lineární rovnice</router-link></b-dropdown-item>
									    <b-dropdown-item><router-link to='/procvicovani/kvadratickarovnice' class='routerbutton'>Kvadratické rovnice</router-link></b-dropdown-item>
									    <b-dropdown-divider></b-dropdown-divider>
									</b-dropdown>
								</div>
								<div class='dropdiv'>
									<b-dropdown size="lg" id="ddown1" text="Aritmetika">
									    <b-dropdown-item><router-link to='/procvicovani/scitaniaodcitanido100' class='routerbutton'>Sčítání a odčítání do 100</router-link></b-dropdown-item>
									    <b-dropdown-item><router-link to='/procvicovani/nasobeni' class='routerbutton'>Násobení</router-link></b-dropdown-item>
									    <b-dropdown-divider></b-dropdown-divider>
									</b-dropdown>
								</div>
								<div class='dropdiv'>
									<b-dropdown size="lg" id="ddown1" text="Číselné soustavy">
									    <b-dropdown-item><router-link to='/procvicovani/prevodymezisoustavami' class='routerbutton'>Převody mezi soustavami</router-link></b-dropdown-item>
									    <b-dropdown-item><router-link to='/procvicovani/adresyvpameti' class='routerbutton'>Adresy v paměti</router-link></b-dropdown-item>
									    <b-dropdown-divider></b-dropdown-divider>
									</b-dropdown>
								</div>
							</b-col>
							<b-col cols="12" sm='12' md='10' lg='9' xl='8'>
								<b-col cols="12">
									<hr>
								</b-col>
								<router-view/>
							</b-col>
						</b-row>
						<b-row v-if='$route.path != "/procvicovani"'>
							<b-button><router-link to='/procvicovani' class='backandnext'><strong><</strong> Zpět</router-link></b-button>				
							<b-button @click="next" class='backandnext'>Další <strong>></strong></b-button>
						</b-row>
					</div>
				</b-jumbotron>
			</b-col>
			<b-col cols='0' sm='0' md='1' lg='2' xl='2'></b-col>
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
		font-size: 1.25rem;
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
		margin-bottom: 5px;
	}
	.hintstyle {
		color: #aaa;
	}
	.routerbutton {
		font-size: 1.25rem;
	}
</style>