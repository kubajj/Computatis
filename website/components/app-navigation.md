# app-navigation

This component renders the page navbar.

## Code

```html
<template>
	<b-navbar toggleable="md" type="danger" variant="dark" class="navigation"><!-- Creates navigation bar with logo and a link to "Practice" part -->
		<b-navbar-toggle target="nav_collapse"><img src="./assets/menuicon.png" style="height:35px;"></b-navbar-toggle><!-- This makes the menu collapsable, so it is more responsive -->
		<b-collapse is-nav id="nav_collapse">
		<logo></logo><!-- Imports logo -->
		<b-navbar-nav>
			<b-nav-item><router-link to='/procvicovani' class='menu'>Procvičování</router-link></b-nav-item><!-- Link to "Practice" part -->
		</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>
```

```js
import Logo from './Logo.vue'
//@vuese
//@group Layout
//This component renders the page navbar.
export default {
	name: 'app-navigation',
		introduction: 'Navbar',
		description: `
			This component renders the page navbar.
		`,
		token: "<app-navigation/>",
	components: {
		'logo': Logo,
	}
}
```

```css
.navigation {
		background-color: #ccc;
	}

	.menu {
		color: white;
		text-decoration: none;
	}
```


