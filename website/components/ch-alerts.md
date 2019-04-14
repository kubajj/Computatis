# ch-alerts

Shows an alert green alert with 'Správně' when users result is right and red alert with 'Špatně' when it is not.

## Props

<!-- @vuese:ch-alerts:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|checked|Whether users result is right or wrong|'right' / 'wrong'|`false`|''|
|result|Correct result|`String`|`false`|''|

<!-- @vuese:ch-alerts:props:end -->


## Events

<!-- @vuese:ch-alerts:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|next|-|-|

<!-- @vuese:ch-alerts:events:end -->

## Code

```html
<template>
	<div>
		<b-alert v-if="checked == 'right'" show variant="success">Správně <b-button @click='next' class='right'><strong>></strong></b-button></b-alert>
	    <b-alert v-else-if="checked == 'wrong'" show variant="danger" >Špatně. Správný výsledek je {{ result }}. <b-button @click='next' class='wrong'><strong>></strong></b-button></b-alert>
	</div>
</template>
```

```js
import {bus} from './../../../main.js'
// @group Development components
// Shows an alert green alert with 'Správně' when users result is right and red alert with 'Špatně' when it is not.
export default {
	name: 'ch-alerts',
	introduction: 'Alert that shows user whether his result is correct or not',
	description: `
		Shows an alert green alert with 'Správně' when users result is right and red alert with 'Špatně' when it is not.
	`,
	token: "<ch-alerts :checked='checked' :result='result'/>",
	props: {
		//Whether users result is right or wrong
		checked: {
			//'right' / 'wrong'
			type: String,
			default: '',
		},
		//Correct result
		result: {
			type: String,
			default: '',			
		}
	},
	methods: {	
		//runs genTask in parent component		
		next() {
			bus.$emit('next');
		}
	}
}
```

```css
.alert {
	margin-top: 6px;
}
.btn.btn-secondary.right {
	font-size: 15px;
	background-color: #87e59d;
}
.btn.btn-secondary.wrong {
	font-size: 15px;
	background-color: #ed5c5c;
}
```


