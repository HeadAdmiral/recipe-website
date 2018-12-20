import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewRecipe from './views/NewRecipe.vue'
import Search from './views/Search.vue'
import Recipe from './views/Recipe.vue'


Vue.use(Router)

/**
 * Defines routes for the Router.
 * Each route has a `path`, `name`, and `component`.
 */

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
            path: '/search',
            name: 'Results',
            component: Search
        },
        {
            path: '/recipe/:id',
            name: 'Recipe',
            component: Recipe
        }
    ]
})
