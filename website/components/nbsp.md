# nbsp

Renders non-breakable spaces.

## Props

<!-- @vuese:nbsp:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|num|Number that says how many times a non-breakable space should be rendered|`Number`|`false`|''|

<!-- @vuese:nbsp:props:end -->


## Code

```html
<template>
	<span>
		<span v-if='num == 1' class="num">&nbsp</span>
		<span v-if='num == 2' class="num">&nbsp&nbsp</span>
		<span v-if='num == 3' class="num">&nbsp&nbsp&nbsp</span>
		<span v-if='num == 4' class="num">&nbsp&nbsp&nbsp&nbsp</span>
		<span v-if='num == 5' class="num">&nbsp&nbsp&nbsp&nbsp&nbsp</span>
	</span>
</template>
```

```js
// @group Development components
//Renders non-breakable spaces.
export default {		
	name: 'nbsp',
	introduction: 'Renders one to five times nbsp',
	description: `
		Renders non-breakable spaces.
	`,
	token: "<nbsp :num='maxSpaces - correctUnit.length'/>",
	props: {
		//Number that says how many times a non-breakable space should be rendered
		num: {
			type: Number,
			default: '',
		},
	},
}
```

```css
.num {
	font-size: 20px;
}
```
