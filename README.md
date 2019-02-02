Computatis
==========

Toto je můj maturitní projekt.

## Instalace

```bash
# git clone této složky
git clone https://github.com/kubajj/Computatis.git

# přesun do složky
cd Computatis

# instalace projektu
npm install

# spuštění lokálně
npm run dev
```
## Vývoj
Aplikace je psána ve Vue.js. Předpokladem pro úspěšný vývoj rozšíření je ale pouze znalost javascriptu a HTML.

[Vue](https://vuejs.org/v2/guide/) [JS](https://www.w3schools.com/js/) [HTML](https://www.w3schools.com/html/)

Jděte na [Computatis Development Project](https://github.com/kubajj/ComputatisDevelopmentProject), kde naleznete projekt pro snažší vývoj.

Aplikace je rozdělena na několik vrstev. Nejdůležitější je nejnižší vrstva, která se nachází ve složce PracContentFiles, kde se nacházejí jednotlivé složky s příklady.
Úkolem vývojáře je nezasahovat do ničeho jiného, než do jednotlivých komponentů nebo složek s komponenty (můžete si vytvořit vaši vlastní).

Zde můžete vidět náhled kódu jednoho z funkčních komponentů:
![Code](doc-images/AdditionTo100Code.jpg "Kód")

V následující části dokumentace bude podrobně rozebrán.
### HTML
První část definuje uspořádání stránky. Tedy spíše bílého boxu na stránce:
![White box](doc-images/WhiteBox.jpg "Bílý box")

Tato část je ohraničena dvěmi značkami:
```html
<template>
	...
</template>
```

V aplikaci je použit [bootstrap-vue](https://bootstrap-vue.js.org/docs). Prosím, zachovejte tento framework.
Nejdůležitější značky jsou:
```html
<b-row>
	...
</b-row>

<b-col cols=''>
	...
</b-col>

<b-form-input>
	...
</b-form-input>
```

#### Mathjax
Veškeré texty, které chcete vypsat v LATEXu musíte nabindovat do tohoto komponentu:
```html
<vue-mathjax :formula="vámi zvolená proměnná"/>
```
Proměnná musí být v platném LATEXovém tvaru.
Začne '$$ a skončí $$'.
Všechny zpětná lomítka `\` musí být zdvojeny.
Příklad takovéto proměnné:
```javascript
discriminant: '$$x_{1;2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$',
```

Můžete ale také používat i tzv. vývojářské komponenty:
```html
<nbsp>
	...
</nbsp>

<hint-form>
	...
</hint-form>

<!-- A v neposlední řadě velmi důležitý komponent, který sjednocuje nadpisy jednotlivých příkladů. -->
<heading>
	...
</heading>
```

**Pozor! Je důležité všechny vývojařské komponenty správně naimportovat (bude vysvětleno následovně).** 

### Import
Část komponentu, která mu říká, které další komponenty a soubory si musí naimportovat je vkládána přímo za tuto značku:
```html
<script>
```

Pokud nepoužíváte vývojářský projekt, tak naimportujte následující:
```javascript
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'
```
Jsou to soubory nezbytné pro správný chod příkladu.

Obecně import probíhá následovně:
``` javascript
import název, který budete používat 
(ideálně stejný nebo podobný názvu souboru, používá se CamelCase) 
from 'relativní cesta k souboru'
//vše do jednoho řádku
```

### Vue
Tato část je vkládána přímo za importy. Po jejím ukončení ukončete i srcipt část pomocí `</script>`

Začíná taktko:
``` javascript
	export default {
```

Dále můžete specifikovat tyto části:
```javascript
	data() {
		return {
			...
		}
	},
	components: {
		...
	},
	methods: {
		...
	},
	computed: {
		...
	},	
```
Funkce těchto jednotlivých částí nyní rozeberu.

**Každou část ukončete složenou závorkou a čárkou.** `},`

#### Data
V části data můžete specifikovat jednotlivé proměnné.
Používá se klasický javascriptový zápis:
``` javascript
jménoproměnné: hodnotaproměnné,
``` 
*Všechny řádky ukončujte čárkou.*

Na takto definované proměnné můžete odkazovat dvěma způsoby:
1. `this.názevproměnné`
2. `this.$data.názevproměnné`

Pokud na ně odkazujete z HTML části, prefix `this.` se nepřidává.

#### Komponenty
V této části můžete (*je to nutné pro jejich používání*) specifikovat názvy naimportovaných komponentů.
Zápis takovéto specifikace:
```javascript
'heading': Heading,
//tedy:
'název komponentu, který chcete používat v HTML části': Název, kterým jste ho popsal v Importu,
```
Název v uvozovkách př.`'heading'` používá tzv. kebab-case.

*Všechny řádky ukončujte čárkou.*

##### Vývojářské komponenty
U každého komponenty zde specifikuji tzv. props a funkci.
Props (*properties*) jsou data, které nadřazený komponent (*parent*) posílá podřadným komponentům (*child*).

###### Heading.vue
Props:	
- head (`String`)
```javascript
props: ['head'],
```
Funkce: Upraví vámi nabindovaný nadpis do LATEXového tvaru a tím z něj vytvoří stylový nadpis, který vypadá jako všechno ostatní. 

###### CheckAlerts.vue
Props: 	
- checked (`String`) 
	- možné hodnoty:
		- 'right'
		- 'wrong'
- result (převážně `Integer`, ale lze i `String`)
```javascript
props: ['checked', 'result'],
```
Funkce: Zobrazí rámeček s hláškou `Správně` nebo `Špatně`, která ukáže i vámi specifikovaný správný výsledek (*proto je nutné ho uvést*). 

###### Nbsp.vue
Props: 	
- num (`Integer`) 
	- v intervalu *<1; 5>*
```javascript
props: ['num'],
```
Funkce: Zobrazí vámi předepsaný počet `&nbsp` (*non-breaking space*).

###### HintFormBorder.vue
Props: 	
- value (`String`) 
- correctResult (`String`) 
	- správný výsledek jednotlivých inputů
- placeHolder (`String`)
	- placeholder jednotlivých inputů
```javascript
props: {
	value: {
		type: String
	},
	correctResult: {
		type: String
	},
	placeHolder: {
		type: String
	},
},
```
Funkce: Umožní vám vytvořit několikstejných inputformů. Mají tu vlastnost, že když se rovná correctResult a input uživatele, tak jejich okraj zezelená. V jiném případě je okraj červený.
Jejich class pro stylování je `class="inputWithBorder"`.
Klasicky u nich funguje zapisování doproměnných pomocí `v-model`.

V případě touhy po vytvoření vlastního vývojářského komponentu není žádný problé. Vytvořte ho a následně pošlete pull-request.
*Prosím, o specifikování názvu a přiložení části dokumentace v syntaxu markdown.*

#### Metody
V této části můžete vytvořit jednotlivé metody, které lze volat v reakci na akce uživatele.
Zápis je:
```javascript 
genTask() {	//specifikuje název metody
	//lze použít i alternativní zápis
genTask: function() {
	//po složené závorce následuje obsah metody
	this.task = '$$ 1234 $$'			
	//ten následuje ukončení metody
	},
},
```

Pokud je vaše metoda dlouhá, snažte se ji rozdělit na kratší metody. Snadno je mezi sebou můžete volat pomocí prefixu `this.` společně s názvem metody. *Nezapomeňte na závorky.*
př. `this.number = this.randomNumber(101, 999);`

**V metodách a v computed ukončujete řádky středníkem "`;`".**

##### Užitečné metody
###### Random Number
Metoda, která vám vygeneruje náhodné číslo v uzavřeném intervalu mezi čísly v závorce:
```javascript
randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
},
```
###### Check
Umožní vám zkontrolovat výsledek uživatele:
```javascript
check() {
	if (this.checked == 'right') {
		this.genTask();
		return;
	}
	if (this.usersResult == this.result) {
		this.checked = 'right';
	} else {
		this.checked = 'wrong';
	}
	this.$data.usersResult = '';
}, 
```
###### Grade
Umožní vám zjistit velikost nejvyšší řád čísla:
```javascript
grade(givenNum) {
	return Math.ceil(Math.log10(givenNum));
},
```
(*Zaměnitelná s `*.length`.*)

###### Reset All
Metoda, kterou doporučuji vytvořit, pokud potřebujete vymazat hodnotu více proměnných naráz.
př. užití:
```javascript
resetAll() {
	this.hinted = false;
	this.checked = '';
	this.hint = '';
	this.comment = '';
	this.correctCalculation = [];
	for (let i = 0; i < this.resultsInputs.length; i++) {					
		this.$data.resultsInputs[i] = '';
	}
	this.specialHint = false;
	this.placeHolders = [];
},
```
###### Convert Number
Umí převádět čísla mezi jednotlivými číselnými soustavami:
```javascript
convertNumber(n, fromBase, toBase) {
  	if (fromBase === void 0) {
  	  fromBase = 10;
 	}
 	if (toBase === void 0) {
 	   toBase = 10;
	}
 	return parseInt(n.toString(), fromBase).toString(toBase);
},
```

#### Computed
Tato část vám umožňuje vytvářet proměnné, které budou výsledkem metody.
**Je nutné ukončit je příkazem `return`.**
Zápis je stejný jako u metod, jen je v jiné části:
```javascript
computed: {
	onePlusOne() {
		return 1 + 1;
	},
},
```
Lze z nich i klasicky volat jiné metody a také jiné computed properties.

#### Lifecycle Hooks
Toto je poslední druh, který lze použít v `export default {}`.
Jedná se o tyto:
```javascript
beforeCreate() {
	...
},
created() {
	...
},
beforeMount() {
	...
},
mounted() {
	...
},
...
```
Všechny je můžete najít v tomto [diagramu](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).
Umožňují vám specifikovat, které metody se kdy spustí.

př. užití:
```javascript
//Následující kód prosím zaimplementujte do svého hlavního komponentu. Bez něj je nepoužitelný.
beforeMount() {
	this.genTask();
},
mounted() {
    bus.$on('next', this.genTask);
},

//Příklad jiného použítí:
mounted() {
	this.resultsOfUnitInputs = this.correctUnit.map(() => '');
	this.resultsOfDecInputs = this.correctDec.map(() => '');
	this.resultsOfResInputs = this.correctResultSpaces.map(() => '');
}, 
```

**Vue část se uzavírá značkou `</script>`.**

### CSS
Pro úpravu vzhledu se nepoužívají žádné externí soubory.
Použijte kaskádové styly mezi značkami `<style>` a `</style>`.

## Zveřejnění vašeho komponentu
Vytvořte pull-request, ve kterém popíšete vámi vytvořený příklad a pojmenujete ho.
Z bezpečnostních důvodů bude název i kód zkontrolován.
Následně bude zařazen do příslušné tématické složky a zveřejněn.

## FAQ
*Nemáte nějaký videotutoriál na Vue.js?*
[![The Net Ninja - Vue.js tutorial](http://img.youtube.com/vi/5LYrN_cAJoA&list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa/0.jpg)](https://www.youtube.com/watch?v=5LYrN_cAJoA&list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa)

*Jak posílat data z child komponent na parent?*
Pomocí [`$emit`](https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events).
