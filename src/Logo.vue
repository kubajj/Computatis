<template>
	<div class="navbar-header"><!-- Creates button in logo of application -->
		<router-link to='/' class='menu'><img src="./assets/logo.png" class="logo"></router-link>
	</div>
</template>

<script type="text/javascript">	
	//@vuese
	//@group Layout
	//Renders button in logo of application.
	export default {
		name: 'logo',
		introduction: 'Page logo',
		description: `
			Renders button in logo of application.
		`,
		token: "<logo/>",
	}
</script>

<style>
	.logo {
		height: 35px;
	}
</style>