# logo

Renders button in logo of application.


## Code

```html
<template>
	<div class="navbar-header"><!-- Creates button in logo of apllication -->
		<router-link to='/' class='menu'><img src="./assets/logo.png" class="logo"></router-link>
	</div>
</template>
```

```js
//@vuese
//@group Layout
//Renders button in logo of application.
export default {
	name: 'logo',
	introduction: 'Page logo',
	description: `
		Renders button in logo of application.
	`,
	token: "<logo/>",
}
```

```css
.logo {
	height: 35px;
}
```