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

	// Renders input form (with 12px width) whose border changes between red and green according to what it contains.
	// @group Development components
	export default {
		name: 'hint-form-small',
		introduction: 'Form input for hints with smaller size',
		description: `
			Renders input form (with 12px width) whose border changes between red and green according to what it contains.
		`,
		token: "<hint-form style='width: 12px; height: 24px;' v-model='resultsOfUnitInputs[index]' :correctResult='correct'/>",
		props: {
			//Watches the changes in the user input
			value: {
				type: String,
				default: '',
			},
			//Value of the correct result - the one that has green border
			correctResult: {
				type: String,
				default: '',
			},
			//Stores the placeholder of the form
			placeHolder: {
				type: String,
				default: '',
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
			//@vuese
			//enables v-modeling of user inputs
			onInput() {
				//emits input to v-model in parent component
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