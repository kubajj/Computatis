<h1>Uživatelská dokumentace</h1>
Toto je návod k použití aplikace Computatis na procvičování matematiky.<br> <br>
V aplikaci je několik okruhů, ve kterých si můžete zvolit příklad k procvičování, který se vám bude náhodně generovat.
Výběr okruhů se provádí pomocí tlačítek, které rozbalují seznam možných příkladů.<br>
![Dropdown](doc-images/dropdown.png "White box")<br>
Tato tlačítka se nacházejí v levé části tohoto bílého boxu.<br>
![Bily box](doc-images/WhiteBox.png "White box")<br>
V pravé části se vám zobrazují zvolené příklady. Úplně vpravo můžete zadat výsledek do formuláře.<br>

Příklady se generují náhodně, ale jejich výsledek je vždy jednoznačný. Většinou je celočíselný (s výjimkou příkladu "Lineární rovnice", kde je povolen i výsledek končící na .5 a .25) nebo slovní. Po potvrzení výsledku buď klávesou "Enter", nebo tlačítkem vedle formuláře na výsledek, se vám zobrazí zpráva, zda je váš výsledek správný a v případě, že tomu tak není, se vám zobrazí i správná odpověď.

Pokud si uživatel/ka není jist/a s postupem řešení, je možné kliknout na tlačítko nápovědy. Nápovědy se od sebe liší. Některé zobrazí část postupu, jiné zobrazí formulář, který má červený okraj. Tento okraj zezelená, pokud je váš mezivýsledek správný (tento typ můžete najít například v příkladu "[Násobení](https://kubajj.gitlab.io/computatis/#/procvicovani/nasobeni)").

<img src="doc-images/input1.png" style='width: 15%;'/><img src="doc-images/sipka.png" style='width: 15%;'/><img src="doc-images/input2.png" style='width: 15%;'/><br>
V dolní levé části bílého boxu se nacházejí tlačítka Zpět a Další.<br>

<h2>Nápovědy a funkce</h2>
Tato část dokumentace popisuje nápovědy a funkce jednotlivých příkladů.
<h3>Nápovědy v příkladu Kvadratická rovnice</h3>
První nápověda vám ukáže rovnici upravenou do obvyklého tvaru: ax<sup>2</sup> + bx + c = 0.<br>
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
	Poté stačí jen upravit zlomek a zapsat výsledky.<br><br>
b) Rozklad<br>
	Tyto nápovědy se zobrazí, pokud základní tvar rovnice nemá absolutní člen.<br>
	![Zakladnitvarrozklad](doc-images/rozklad1.png "Základní tvar u rozkladu")<br>
	Tento typ nápovědy vytkne x před závorku. Jeden výsledek bude tedy 0 a druhý vyjde, pokud je hodnota závorky rovna 0.<br>
	![Rozklad](doc-images/rozklad2.png "Rozklad")<br><br>
c) Odmocnění<br>
	Tyto nápovědy se zobrazí, pokud základní tvar rovnice nemá lineární člen.<br>
	![Zakladnitvarodmocneni](doc-images/odmocneni1.png "Základní tvar u odmocnění")<br>
	Tento typ nápovědy převede absolutní člen na druhou stranu rovnice. Výsledek vyjde po odmocnění absolutního členu (výsledky budou 2 s opačným znaménkem).<br>
	![Odmocneni](doc-images/odmocneni2.png "Odmocnění")<br>
<h3>Sčítání a odčítání do 100</h3>
Zobrazuje jednoduché výsledky na sčítání a odčítání do 100. Mezivýpočty by také neměly vycházet větší než 100.<br>
Nápovědy u tohoto příkladu vzhledem k jeho povaze nejsou implementovány.<br>
<h3>Násobení pod sebou</h3>
Příklad na násobení trojciferného čísla dvojciferným.<br>
Po stlačení nápisu "Chci násobit pod sebou" se zobrazí formuláře s červeným okrajem. Po zapsání odpovídajícího čísla okraj zezelená.<br>
![Prazdne](doc-images/multiblank.png "Prázdné a červené")<br>
Pokud uživatel vyplnil poslední řádek formulářů správně, je to považováno za výsledek a může postoupit k dalšímu příkladu.<br>
![Plne](doc-images/multifull.png "Plné a zelené")<br>
<h3>Lineární rovnice</h3>
Zobrazí lineární rovnici. Po stisknutí tlačítka nápovědy jsou všechny lineární členy převedeny vlevo a absolutní vpravo. Uživatel už pouze udělá podíl dvou čísel, která vycházejí buď jako celé číslo nebo zlomek s číslem 2 nebo 4 ve jmenovateli.<br>
<h3>Adresy v paměti</h3>
Tento příklad generuje náhodných 24 bajtů paměti. Uživatel je musí analyzovat a splnit postupně 3 úkoly, které se vážou k jedné tabulce.<br>
a) dvojkový doplněk<br>
b) znaménkové rozšíření na daný počet bitů<br>
c) určení endianity<br>
Nápovědy u tohoto příkladu červeně zvýrazňují adresy, kterých se zadání týká.<br>
<h3>Převod mezi soustavami</h3>
Příklad zadává jednoduché převody mezi soustavami (2;10;16).<br>
Uživatel může stlačit tlačítko nápovědy, které nejdříve slovně popíše postup, jak číslo převést.<br>
![Slovni](doc-images/slovni.png "Slovní nápověda")<br>
Po opětovném kliknutí na tlačítko se ukáže formulář, který proces převodu rozdělí do jednotlivých<br>
kroků s kontrolou mezivýsledků.<br>
![Formulare](doc-images/formularova.png "Nápověda s formuláři")<br>
