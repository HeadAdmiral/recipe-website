<template>
    <v-layout align-center justify-center column fill-height>
        <v-flex my-3>
            <v-card width="1250" v-for="r in recipe" :key="r.id">
                <v-img :src="setup(r.title, r.rating)" aspect-ratio="2.75"></v-img>
                <v-tabs
                        v-model="active"
                        color="teal"
                        dark
                        slider-color="yellow"
                >
                    <v-tab
                            v-for="n in ['Summary', 'Ingredients', 'Directions']"
                            :key="n"
                            ripple
                    >
                        {{ n }}
                    </v-tab>

                    <v-tab-item
                            v-for="n in [r.summary, r.ingredients, r.directions]"
                            :key="n"
                    >
                        <v-card flat>
                            <v-card-title primary-title v-if="n === r.summary">
                                <div>
                                    <h3 class="headline mb-0">{{ r.title }}</h3>
                                </div>
                            </v-card-title>
                            <v-card-text>{{ n }}</v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>

                <v-card-actions>
                    <v-btn flat color='accent' @click='shareDialog = true'>Share</v-btn>
                    <v-dialog
                            v-model="shareDialog"
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
                                    <v-text-field solo color="accent" :value="share(r.id)"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-btn flat @click='shareDialog = false' color="accent">Close</v-btn>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialog" width="500">
                        <v-btn flat color='' slot="activator">Comment</v-btn>
                        <v-flex>
                            <v-card>
                                <v-card-title class="headline grey lighten-4" primary-title>
                                    Add a Comment
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field
                                            v-model="username"
                                            label="Username"
                                            color="secondary"
                                            counter="20"
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="comment"
                                            label="Comment"
                                            color="secondary"
                                            counter="140"
                                            required
                                    ></v-text-field>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="accent" flat @click="dialog = false, addComment(r, username, comment)">
                                        Submit
                                    </v-btn>
                                    <v-btn flat @click="dialog = false">
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-dialog>
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
                                :click="updateRating(r.id, rating, r.ratingCount, r.ratingScore)"
                                :created.once="setRating(r.rating)"
                        ></v-rating>
                        <!-- Store ratings as ratingScore and totalRatings. Recipe rating = ratingScore / totalRatings -->
                    </div>
                </v-card-actions>
                <v-divider></v-divider>
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <div slot="header">Comments</div>
                        <v-divider></v-divider>

                        <div v-for="comment in r.comments">
                            <v-layout align-center row spacer >
                                <v-flex xs4 sm2 md1>
                                    <v-avatar>
                                        <v-icon class="ml-4" size="40" :color="getColor()">account_circle</v-icon>
                                    </v-avatar>
                                </v-flex>

                                <v-flex sm5 md3 hidden-xs-only>
                                    <strong class="mr-5 ml-2">{{ comment.user }}</strong>
                                </v-flex>

                                <v-flex>
                                    <v-card-text>
                                        {{ comment.comment }}
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import database from '@/components/firebaseInit.js'
    import VTabsSlider from "vuetify/lib/components/VTabs/VTabsSlider";

    export default {
        components: {VTabsSlider},
        data() {
            let recipe = this.getRecipe();
            return {
                recipe,
                rating: 0,
                img: '',
                active: null,
                dialog: false,
                shareDialog: false,
                username: '',
                comment: ''
            }
        },
        methods: {
            /**
             * Queries Firebase for a document with id matching `this.$route.params.id` in the 'recipes' collection .
             * Returns query as an array of objects.
             * @returns {Array}
             */
            getRecipe() {
                let docs = [];
                // Query database for projects collection
                database.collection('recipes').doc(this.$route.params.id).get().then(function (doc) {
                    if (doc.exists) {
                        docs.push(doc.data());
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
                return docs;
            },
            /**
             * Sets the v-model 'rating' to the given value.
             *
             * Returns a matching random image from the Unsplash API using the given value.
             * If no title is provided this method does nothing.
             * @returns {string}
             */
            setup(title, rating) {
                this.rating = rating;

                if (title !== "") {
                    title = title.replace(" ", "%20");
                    return "https://source.unsplash.com/1600x900/?" + title;
                }
            },
            /**
             * Updates the recipe's rating value in Firebase when clicked.
             * Rating is calculated with two variables -- score and count.
             * Score is the sum of all ratings, and count is the total number of ratings.
             * A recipe's rating is equal to score divided by count and rounded to 3 decimal places.
             */
            updateRating(id, rating, count, score) {
                // If the id is loaded update the recipe rating
                if (id) {
                    count += 1;
                    score = score + rating;
                    rating = Number((score / count).toPrecision(3));
                    database.collection('recipes').doc(id).set({
                        rating: rating,
                        ratingCount: count,
                        ratingScore: score
                    }, {merge: true}).then(function () {
                        document.getElementById("rating").innerText = '(' + rating + ')';
                    })
                        .catch(function (error) {
                            console.error('Error adding document: ', error);
                            alert('An error has occurred while attempting to update the rating for document ' + id + '.')
                        });
                }
            },
            /**
             * Sets the v-model 'rating' to the given value.
             */
            setRating(rating) {
                this.rating = rating;
            },
            /**
             * Provides a share URL for the v-text-field in the 'shareDialog' window.
             * @returns {string}
             */
            share(id) {
                return 'localhost:8080/recipe/' + id;
            },
            /**
             * Concatenates the username and comment as a JSON object to the existing comments from the Firebase query.
             * The resultant array of JSON objects is then updated in the database.
             */
            addComment(recipe, username, comment) {
                // Reset v-model
                this.username = '';
                this.comment = '';

                // Default username should be Anonymous User if a username is not provided
                if (username === '') {
                    username = 'Anonymous User'
                }

                let comments = [];

                // Add the new comment to an array
                comments.push({
                    user: username,
                    comment: comment
                });

                // Add all existing comments into the array
                for (let i = 0; i < recipe.comments.length; i++){
                    comments.push({
                        user: recipe.comments[i].user,
                        comment: recipe.comments[i].comment
                    })
                }

                // Update the database with the old comments concatenated with the new comment
                database.collection('recipes').doc(this.$route.params.id).set({
                    comments: comments
                }, {merge: true})

            },
            /**
             * Returns a random color from an array of colors.
             * Used to provide a random color for 'v-avatar' icons.
             * @returns {string}
             */
            getColor() {
                let colors = ['red', 'pink', 'purple', 'indigo', 'deep-purple',
                              'blue', 'light-blue', 'cyan', 'teal', 'green',
                              'light-green', 'lime', 'yellow', 'amber', 'orange',
                              'deep-orange', 'brown', 'blue-grey', 'grey', 'black'];
                let color = colors[Math.floor(Math.random() * colors.length)];
                return color;
            }
        }
    }
</script>

<style scoped>

</style>