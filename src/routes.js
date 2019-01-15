
import HomeContent from './Content/HomeContent.vue'
import TheoryContent from './Content/TheoryContent.vue'
import PracContent from './Content/PracContent.vue'
import UvodKProcvicovani from './Content/PracContentFiles/UvodKProcvicovani.vue'
import LongMultiplication from './Content/PracContentFiles/Arithmetic/LongMultiplication.vue'
import AddSubTo100 from './Content/PracContentFiles/Arithmetic/AddSubTo100.vue'
import LinearEquation from './Content/PracContentFiles/Equations/LinearEquation.vue'
import PolynomEquation from './Content/PracContentFiles/Equations/PolynomEquation.vue'

export default [
	{ path: '/', component: HomeContent},
	{ path: '/teorie', component: TheoryContent},
	{ path: '/procvicovani', component: PracContent,
		children: [
		/*{ path: '/', component: UvodKProcvicovani },
		{ path: '/nasobeni', component: LongMultiplication },
		{ path: '/scitaniaodcitanido100', component: AddSubTo100 },
		{ path: '/linearnirovnice', component: LinearEquation },
		{ path: '/kvadratickarovnice', component: PolynomEquation },*/
		{ path: '/procvicovani/', component: UvodKProcvicovani },
		{ path: '/procvicovani/nasobeni', component: LongMultiplication },
		{ path: '/procvicovani/scitaniaodcitanido100', component: AddSubTo100 },
		{ path: '/procvicovani/linearnirovnice', component: LinearEquation },
		{ path: '/procvicovani/kvadratickarovnice', component: PolynomEquation },
		]
	},
]