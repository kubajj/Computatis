<template>
	<b-navbar toggleable="md" type="danger" variant="dark" id="navigation">
		<b-navbar-toggle target="nav_collapse"><img src="./menuicon.png" style="height:35px;"></b-navbar-toggle>
		<b-collapse is-nav id="nav_collapse">
		<logo></logo>
		<search></search>
		</b-collapse>
	</b-navbar>
</template>

<script>
	import Search from './Search.vue'
	import Logo from './Logo.vue'
	import Nabidka from './Nabidka.vue'

	export default {
		components: {
			'logo': Logo,
			'search': Search,
			'nabidka': Nabidka
		}
	}
</script>