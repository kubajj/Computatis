
import HomeContent from './Content/HomeContent.vue'
import TheoryContent from './Content/TheoryContent.vue'
import PracContent from './Content/PracContent.vue'
import LongMultiplication from './Content/PracContentFiles/Problems/Arithmetic/LongMultiplication.vue'
import AddSubTo100 from './Content/PracContentFiles/Problems/Arithmetic/AddSubTo100.vue'

export default [
	{ path: '/', component: HomeContent},
	{ path: '/teorie', component: TheoryContent},
	{ path: '/procvicovani', component: PracContent,/*
		children: [
		{ path: '/nasobenipodsebou', component: LongMultiplication },
		{ path: '/scitaniaodcitanido100', component: AddSubTo100 },
		]*/
	},
]