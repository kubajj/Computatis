<template>
	<footer class="paticka"><!-- This defines the footer of the page -->
		<p class='autor'>&copy; Jakub Jelínek</p>
		<a href='https://www.alej.cz' target='_blank'><!-- Defines the link in logo of my school -->
			<img src="./assets/gna.png" alt="GNA" class="gna"/>
		</a>
	</footer>
</template> 

<script type="text/javascript">
	export default {
		name: 'app-footer',
		introduction: 'Page footer',
		description: `
			Renders footer of the apllication with a link to my schools webpage.
		`,
		token: "<app-footer/>",
	}
</script>

<style>
	.gna {
		border-radius: 50%;
		max-height: 35px;
		max-width: 35px;
		color: white;
	}

	.paticka {
		text-align: center;
	}

	footer {
		margin-top: 5px;
	}
</style>