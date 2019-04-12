//This file defines the routes
import HomeContent from './Content/HomeContent.vue'
import PracContent from './Content/PracContent.vue'
import IntroToPractice from './Content/PracContentFiles/IntroToPractice.vue'
import LongMultiplication from './Content/PracContentFiles/Arithmetic/LongMultiplication.vue'
import AddSubTo100 from './Content/PracContentFiles/Arithmetic/AddSubTo100.vue'
import LinearEquation from './Content/PracContentFiles/Equations/LinearEquation.vue'
import QuadraticEquation from './Content/PracContentFiles/Equations/QuadraticEquation.vue'
import BaseConversion from './Content/PracContentFiles/NumeralSystems/BaseConversion.vue'
import AddressesInMemory from './Content/PracContentFiles/NumeralSystems/AddressesInMemory.vue'
//import NewOne from './Content/PracContentFiles/NumeralSystems/NewOne.vue'

export default [
	{ path: '/', component: HomeContent},
	{ path: '/procvicovani', component: PracContent,
		children: [
		{ path: '/procvicovani/', component: IntroToPractice },
		{ path: '/procvicovani/nasobeni', component: LongMultiplication },
		{ path: '/procvicovani/scitaniaodcitanido100', component: AddSubTo100 },
		{ path: '/procvicovani/linearnirovnice', component: LinearEquation },
		{ path: '/procvicovani/kvadratickarovnice', component: QuadraticEquation },
		{ path: '/procvicovani/prevodymezisoustavami', component: BaseConversion },
		{ path: '/procvicovani/adresyvpameti', component: AddressesInMemory },
		//{ path: '/procvicovani/newone', component: NewOne },
		]
	},
]