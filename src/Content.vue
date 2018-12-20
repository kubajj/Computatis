<template>
	<div class="content">
		<b-row>
			<b-col cols="2"></b-col>
			<b-col cols="8">
				<b-card no-body>
				  <b-tabs card end>
				    <b-tab title="Home" active class="tabpill">
				      <home-content></home-content>
				    </b-tab>
				    <b-tab title="Teorie" class="tabpill">
				      <theory-content></theory-content>
				    </b-tab>
				    <b-tab title="Procvičování" class="tabpill">
				      <prac-content></prac-content>
				    </b-tab>
				    <!--b-tab title="Statistiky" class="tabpill">
				      <stats-content></stats-content>
				    </b-tab-->
				  </b-tabs>
				</b-card>
			</b-col>
		</b-row>
		<b-col cols="2"></b-col>
	</div>
</template>

<script>
	import HomeContent from './Content/HomeContent.vue'
	import StatsContent from './Content/StatsContent.vue'
	import TheoryContent from './Content/TheoryContent.vue'
	import PracContent from './Content/PracContent.vue'

	export default {
		components: {
			'home-content': HomeContent,
			'prac-content': PracContent,
			'theory-content': TheoryContent,
			'stats-content': StatsContent
		}
	}
</script>