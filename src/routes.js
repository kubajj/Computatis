
import HomeContent from './Content/HomeContent.vue'
import TheoryContent from './Content/TheoryContent.vue'
import PracContent from './Content/PracContent.vue'

export default [
	{ path: '/', component: HomeContent},
	{ path: '/teorie', component: TheoryContent},
	{ path: '/procvicovani', component: PracContent},
]