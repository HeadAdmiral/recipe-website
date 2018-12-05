import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewRecipe from './views/NewRecipe.vue'
import About from './views/About.vue'
import Search from './views/Search.vue'
import Recipe from './views/Recipe.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/newrecipe',
            name: 'New Recipe',
            component: NewRecipe
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/search',
            name: 'Results',
            component: Search
        },
        {
            path: '/recipe',
            name: 'Recipe',
            component: Recipe
        }
    ]
})
