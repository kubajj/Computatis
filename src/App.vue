<template>
	<div>
		<app-navigation></app-navigation><!-- Import navigation bar -->
		<router-view></router-view><!-- Import main content via router -->
		<app-footer></app-footer><!-- Import footer -->
	</div>
</template>

<style>
	a {
		color: black;
		text-decoration: underline;
	}
	a:active, a:hover {
		color: #d4050c;
	}
	body { 
		background-color:#202020;  
	    color: white;
	    font-family: Calibri;
	}
	.btn.btn-secondary {
		background-color:#a20c16;
		border: none;
	}
	.content {
		margin-top: 15px;
		color: black;
		background-color: white;
		min-height: 300px;
	}
	.title {
		text-align: center;
	}
	.textContent {
		text-align: center;
	}	
</style>