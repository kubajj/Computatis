<h1>Uživatelská dokumentace</h1>
Toto je návod k použití aplikace Computatis na procvičování matematiky.<br> <br>
V aplikaci je několik okruhů, ve kterých si můžete zvolit příklad k procvičování, který se vám bude náhodně generovat.
Výběr okruhů se provádí pomocí tlačítek, které rozbalují seznam možných příkladů.<br>
![Dropdown](doc-images/dropdown.png "White box")<br>
Tato tlačítka se nacházejí v levé části tohoto bílého boxu.<br>
![Bily box](doc-images/WhiteBox.png "White box")<br>
V pravé části se vám zobrazují zvolené příklady. Úplně vpravo můžete zadat výsledek do formuláře.<br>

Příklady se generují náhodně, ale jejich výsledek je vždy jednoznačný. Většinou je celočíselný (s výjimkou příkladu "Lineární rovnice", kde je povolen i výsledek končící na .5 a .25) nebo slovní. Po potvrzení výsledku buď klávesou "Enter", nebo tlačítkem vedle formuláře na výsledek, se vám zobrazí zpráva, zda je váš výsledek správný a v případě, že tomu tak není, se vám zobrazí i spravná odpověď.

Pokud si nejste jist/a s postupem řešení, je možné kliknout na tlačítko nápovědy. Nápovědy se od sebe liší. Některé zobrazí část postupu, jiné zobrazí formulář, který má červený okraj. Tento okraj zezelená, pokud je váš mezivýsledek správný (tento typ můžete najít například v příkladu "[Násobení](https://kubajj.gitlab.io/computatis/#/procvicovani/nasobeni)").

<img src="doc-images/input1.png" style='width: 15%;'/><img src="doc-images/sipka.png" style='width: 15%;'/><img src="doc-images/input2.png" style='width: 15%;'/><br>
V dolní levé části bílého boxu se nacházejí tlačítka Zpět a Další.<br>

<h2>Nápovědy</h2>
Př.: <h3>Nápovědy v příkladu Kvadratická rovnice</h3>
První nápověda vám ukáže rovnici uplavenou do obvyklého tvaru: ax<sup>2</sup> + bx + c = 0.<br>
![Zakladni tvar](doc-images/zakladnitvar.png "Základní tvar")<br>
Další nápovědy se liší v závislosti na tom, jak rovnice vyšla.<br>
a) Diskriminant<br>
	Tyto nápovědy se zobrazí, pokud základní tvar rovnice má všechny 3 členy (a, b, c).<br>
	![Zakladni tvar](doc-images/zakladnitvar.png "Základní tvar")<br>
	Následuje ukázání vzorce pro diskriminant.<br>
	![Diskriminant](doc-images/diskriminant1.png "Diskriminant")<br>
	Po stlačení tlačítka OK se zobrazí vzorec pro diskriminant s formuláři, které kontrolují mezivýpočty.<br>
	![Diskriminantsformulari](doc-images/diskriminant2.png "Diskriminant s formuláři")<br>
	Pokud jsou správně vyplněny, okraj jim zezelená.<br>
	![Diskriminantzeleny](doc-images/diskriminant3.png "Diskriminant se zeleným okrajem")<br>
	Poté stačí jen upravit zlomek a zapsat výsledky.<br>
b) Rozklad<br>
	Tyto nápovědy se zobrazí, pokud základní tvar rovnice nemá absolutní člen.<br>
	![Zakladnitvarrozklad](doc-images/rozklad1.png "Základní tvar u rozkladu")<br>
	Tento typ nápovědy vytkne x před závorku. Jeden výsledek bude tedy 0 a druhý vyjde, pokud je hodnota závorky rovna 0.<br>
	![Rozklad](doc-images/rozklad2.png "Rozklad")<br>
c) Odmocnení<br>
	Tyto nápovědy se zobrazí, pokud základní tvar rovnice nemá lineární člen.<br>
	![Zakladnitvarodmocneni](doc-images/odmocneni1.png "Základní tvar u odmocnění")<br>
	Tento typ nápovědy převede absolutní člen na druhou stranu rovnice. Výsledek vyjde po odmocnění absolutního členu (výsledky budou 2 s opačným znaménkem).<br>
	![Odmocneni](doc-images/odmocneni2.png "Odmocnění")<br>
