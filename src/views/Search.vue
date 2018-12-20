<template>
    <div class="search">
        <v-layout align-center justify-center column fill-height >
            <div v-for="recipe in searchResults" :key="recipe.id" class="card">
                <v-flex my-3>
                    <v-card width="1000" hover>
                        <v-img :src=getIMG(recipe.title) aspect-ratio="2.75" :position=recipe.position></v-img>
                        <v-card flat>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">{{ recipe.title }}</h3>
                                </div>
                            </v-card-title>
                            <v-card-text>{{ recipe.summary }}</v-card-text>
                        </v-card>
                        <v-card-actions>
                            <v-btn flat @click='dialog = true'>Share</v-btn>
                            <v-dialog
                                    v-model="dialog"
                                    max-width="300"
                            >
                                <v-card>
                                    <v-card-title class="headline">
                                        Share Recipe
                                    </v-card-title>
                                    <v-card-text>
                                        Copy the link below to share with friends:
                                    </v-card-text>
                                    <v-layout align-center justify-center fill-height>
                                        <v-flex md11>
                                            <v-text-field solo color="accent" :value="share(recipe.id)"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-btn flat @click='dialog = false' color="accent">Close</v-btn>
                                </v-card>
                            </v-dialog>

                            <v-btn flat @click="view(recipe.id)" color="accent">View</v-btn>
                            <v-spacer></v-spacer>
                            <span class="grey--text text--darken-2 caption mr-2" id="rating">({{ rating }})</span>
                            <div class="text-xs-center">
                                <v-rating
                                        v-model="rating"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        empty-icon="$vuetify.icons.ratingFull"
                                        half-increments
                                        small
                                        hover
                                ></v-rating> <!--:click="updateRating(recipe.id, rating, recipe.ratingCount, recipe.ratingScore)" :created.once="setRating(recipe.rating)"-->
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-layout row align-content-end justify-center ma-5 pa-5 v-show="empty === true">
                    <div class="text-xs-center">
                        <v-avatar justify-center align-content-end size="350" class="mb-5">
                            <v-img src="https://i.imgur.com/RxOYpN3.png"></v-img>
                        </v-avatar>
                        <h3 class="headline mb-0 grey--text text--darken-2">There doesn't seem to be anything here...</h3>
                    </div>
                </v-layout>
            </div>
        </v-layout>
    </div>
</template>

<script>
    import database from '@/components/firebaseInit.js'
    export default {
        name: "search",
        data() {
            let searchResults = this.search();
            let empty = this.isEmpty();
            return {
                searchResults,
                dialog: false,
                rating: 0,
                empty
            }
        },
        methods: {
            /**
             * Queries Firebase for the 'recipes' collection where a recipe's title matches the search key word.
             * Returns query as an array of objects.
             * @returns {Array}
             */
            search() {
                let docs = [];
                database.collection('recipes').where("title", ">=", this.$route.query.query).get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            // Update the stored ID to match the document's ID
                            docs.push(doc.data())
                        });
                    });
                return docs;
            },
            /**
             * Returns a matching random image from the Unsplash API using the given value.
             * If no title is provided this method does nothing.
             * @returns {string}
             */
            getIMG(val) {
                if (val !== "") {
                    return "https://source.unsplash.com/1600x900/?" + val;
                }
            },
            /**
             * Provides a share URL for the `v-text-field` in the 'shareDialog' window.
             * @returns {string}
             */
            share(id) {
                return 'localhost:8080/recipe/' + id;
            },
            /**
             * Returns true if there are no elements with a class of `card` on the page.
             * i.e. Returns true if there are no matching search results.
             * @returns {boolean}
             */
            isEmpty: function() {
                if (document.getElementsByClassName("card").length === 0) {
                    return true;
                }
                else if (document.getElementsByClassName("card").length > 0){
                    return false;
                }
            }

        },
        updated() {
            this.empty = this.isEmpty();
        }
    }
</script>

<style scoped>

</style>