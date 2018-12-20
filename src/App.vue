<template>
    <v-app class="grey lighten-4">
        <Navbar/>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Navbar from '@/components/Navbar'

    /**
     * Defines the main application component.
     * Any components that are used throughout the app, such as `Navbar` are imported here.
     */
    export default {
        name: 'App',
        components: {Navbar},
        data() {
            return {
                //
            }
        }
    }
</script>
