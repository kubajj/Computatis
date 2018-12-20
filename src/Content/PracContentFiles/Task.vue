<template>
	<div>
		<h4>Spočti</h4>
		<p>2+2 =</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			title: 'Spočti',
			problemtask: '2 + 2 =',
			}
		},
		methods: {
			changeProblem() {
				this.$emit('toJeCool', '')
			}
		},
		computed: {
			a() {
				Math.floor(Math.random() * (max - min + 1) ) + min;
			},
			x1() {
				Math.floor(Math.random() * (max - min + 1) ) + min;
			}, 
			x2() {
				Math.floor(Math.random() * (max - min + 1) ) + min;
			}, 
			b() {
				- a * (x1 + x2);
			},
			c() {
				a * (x1 * x2);
			}
		}
	}
</script>