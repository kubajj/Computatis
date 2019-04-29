# heading

Renders a heading of a component with the same styling for all.

## Props

<!-- @vuese:heading:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|head|-|`String`|`false`|''|

<!-- @vuese:heading:props:end -->

## Code

```html
<template>
	<b-row>
		<h3>{{head}}</h3>
	</b-row>
</template>

```

```js
// @group Development components
// Renders a heading of a component with the same styling for all.
export default {
	name: 'heading',
	introduction: 'United heading',
	description: `
		Renders a heading of a component with the same styling for all.
	`,
	token: "<heading head='Lineární rovnice'/>",
	props: {
		head: {
			type: String,
			default: '',
			note: 'Heading of the component'
		},
	},
}
```

```css
h3 {
	margin-top: 5px;
}
```
