<template>
	<div>
		<b-row>
			<b-col cols="12" sm='12' md='12' lg='10' xl='8'>
				<h4>Toto je stránka na procvičování</h4><!-- Title -->
			</b-col>
		</b-row>
		<b-row>
			<b-col cols="12" sm='12' md='12' lg='10' xl='8'><!-- Introductory text to "Practice" part -->
				<p>Můžete si tu zvolit jednotlivé okruhy příkladů nebo si vytvořit vlastní generátor. Pro druhou variantu nahlédněte do dokumentace na&nbsp<a href="https://gitlab.com/kubajj/computatis" target='_blank'>GitLabu</a> nebo na&nbsp<a href="https://github.com/kubajj/computatis" target='_blank'>GitHubu</a>.</p>
			</b-col>
		</b-row>		
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'intro-to-practice',
		introduction: 'Practice introductory text',
		description: `
			Renders introduction to practice component with link to git repositories.
		`,
		token: "<intro-to-practice/>",
	}
</script>