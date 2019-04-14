# app-footer

Renders footer of the application with a link to my schools webpage.

## Code

```html
<template>
	<footer class="paticka"><!-- This defines the footer of the page -->
		<p class='autor'>&copy; Jakub Jelínek</p>
		<a href='https://www.alej.cz' target='_blank'><!-- Defines the link in logo of my school -->
			<img src="./assets/gna.png" alt="GNA" class="gna"/>
		</a>
	</footer>
</template> 
```

```js
//@vuese
//@group Layout
//Renders footer of the application with a link to my schools webpage.
export default {
	name: 'app-footer',
	introduction: 'Page footer',
	description: `
		Renders footer of the application with a link to my schools webpage.
	`,
	token: "<app-footer/>",
}
```

```css
.gna {
	border-radius: 50%;
	max-height: 35px;
	max-width: 35px;
	color: white;
}

.paticka {
	text-align: center;
}

footer {
	margin-top: 5px;
}
```