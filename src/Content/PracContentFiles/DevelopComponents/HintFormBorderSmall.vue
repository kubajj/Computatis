<template>
	<b-form-input
		@input.native="onInput"
		type="text"
		:placeholder=placeHolder
        class="inputWithBorderSmall"
        style="max-width: 12px !important;"
        v-model="inputValue"
        :state="status"/>    
</template>

<script>
	import {bus} from './../../../main.js'
	export default {
		name: 'hint-form',
		introduction: 'Form input for hints with smaller size',
		description: `
			Renders input form (with 12px width) whose border changes between red and green according to what it contains.
		`,
		token: "<hint-form style='width: 12px; height: 24px;' v-model='resultsOfUnitInputs[index]' :correctResult='correct'/>",
		props: {
			value: {
				type: String,
				default: '',
				note: 'Watches the changes in the user input'
			},
			correctResult: {
				type: String,
				default: '',
				note: 'Value of the correct result - the one that has green border'
			},
			placeHolder: {
				type: String,
				default: '',
				note: 'Stores the placeholder of the form'
			},

		},
		data() {
			return {
				status: false,
				inputValue: this.value
			}
		},
		watch: {
			value (newValue) {
				this.inputValue = newValue
			},
		},
		methods: {
			onInput() {
				this.$emit('input', this.inputValue);			
				if (this.inputValue == this.correctResult) {
					this.status = true;
				} else {
					this.status = false;
				}				
			},			
		},
	}
</script>

<style type="text/css">	
	.form-control.is-invalid, .was-validated .form-control:invalid, .form-control.is-valid, .was-validated .form-control:valid {
		background-image: none !important;
		background: none !important;	
		padding: 0 0 0 0;	
	}
</style>