<template>
  <div>
  	<b-row><!-- Introductory text - content on the homepage -->
		<b-col cols='0' sm='0' md='1' lg='2' xl='2'></b-col>
		<b-col cols='12' sm='12' md='10' lg='8' xl='8'>
	  		<b-jumbotron class='content'><!-- Text -->
	  			<h1 class='title'>Domovská stránka</h1>
	    		<p style="text-align: center;">Tato webová aplikace umožňuje uživateli procvičovat si matematiku. Obsahuje několik příkladů, které jsou děleny do kategorií podle jevu, na který se zaměřují. Každá otázka má odpověď, která lze jednoduše zapsat, aby se také jednoduše dala zkontrolovat, což aplikace také ovládá.<br>Po potvrzení odeslání výsledku se dozvíte, zda je váš výsledek správný, či chybný</p>
			</b-jumbotron>
		</b-col>
		<b-col cols='2'></b-col>
	</b-row>
  </div>
</template>

<script type="text/javascript">
	export default {
		name: 'home-content',
		introduction: 'Content of the homepage',
		description: `
			Renders introductory text at the homepage.
		`,
		token: "<home-content/>",
	}
</script>