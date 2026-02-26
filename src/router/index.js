import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CaesarPage from "../pages/CaesarPage.vue";
import PlayfairPage from "../pages/PlayfairPage.vue";

const routes = [
	{path: "/", name: "Home", component: HomePage},
	{path: "/caesar", name: "Caesar", component: CaesarPage},
	{path: "/playfair", name: "Playfair", component: PlayfairPage}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router;