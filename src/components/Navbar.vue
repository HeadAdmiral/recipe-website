<template>
    <nav>
        <v-toolbar app absolute clipped-left class="primary">
            <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <span class="mr-5">{{ this.$route.name }}</span>
            </v-toolbar-title>
            <v-text-field
                    solo-inverted
                    flat
                    hide-details
                    label="Search"
                    prepend-inner-icon=""
                    @keyup.enter="query()"
                    id="search"
            ></v-text-field>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" mini-variant clipped app class="white lighten--4">
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-tooltip bottom open-delay="50">
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
                    { icon: 'code', text: 'Projects', route: '/projects' },
                    { icon: 'accessible', text: 'About', route: '/about'}
                ]
            }
        },
        firestore () {
            return {
                // search: db.collection
            }
        },
        methods: {
            getKeyword: function() {
                return document.getElementById("search").value;
            },
            query: function() {
                // If search bar has text, then route to search page
                if (this.getKeyword() !== "") {
                    this.$router.push('search' + '?query=' + this.getKeyword());
                }
            }
        }
    }
</script>

<style scoped>

</style>