<template>
    <nav>
        <v-toolbar app fixed clipped-left class="primary">
            <v-toolbar-side-icon style="color: #424242" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <span class="mr-5">{{ this.$route.name }}</span>
            </v-toolbar-title>
            <v-text-field
                    solo-inverted
                    flat
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
                    @keyup.enter="query()"
                    id="search"
            ></v-text-field>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-navigation-drawer fixed v-model="drawer" mini-variant clipped app class="white lighten--4">
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-tooltip bottom open-delay="25">
                            <v-icon class="secondary--text" slot="activator">{{ link.icon }}</v-icon>
                            <span>{{ link.text }}</span>
                        </v-tooltip>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                drawer: false,
                links: [
                    { icon: 'home', text: 'Home', route: '/' },
                ]
            }
        },
        methods: {
            /**
             * Returns any characters that have been entered into the search bar.
             * @returns {string}
             */
            getKeyword: function() {
                return document.getElementById("search").value;
            },
            /**
             * Reroutes the current page to /search and reloads the page to trigger a database query.
             */
            query: function() {
                // If search bar has text, then route to search page
                if (this.getKeyword() !== "") {
                    this.$router.push('search' + '?query=' + this.getKeyword(), this.$router.go());
                }
            }
        }
    }
</script>

<style scoped>

</style>