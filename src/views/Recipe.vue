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
                                            label="Username"
                                            color="secondary"
                                            counter="20"
                                    ></v-text-field>
                                    <v-text-field
                                            label="Comment"
                                            color="secondary"
                                            counter="140"
                                            required
                                    ></v-text-field>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="accent" flat @click="dialog = false">
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

                        <v-layout align-center row spacer>
                            <v-flex xs4 sm2 md1>
                                <v-avatar>
                                    <v-icon class="ml-4" size="40">account_circle</v-icon>
                                </v-avatar>
                            </v-flex>

                            <v-flex sm5 md3 hidden-xs-only>
                                <strong class="mr-5 ml-2">Anonymous User</strong>
                            </v-flex>

                            <v-flex>
                                <v-card-text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </v-card-text>
                            </v-flex>
                            <v-divider></v-divider>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout align-center row spacer>
                            <v-flex xs4 sm2 md1>
                                <v-avatar>
                                    <v-icon class="ml-4" size="40">account_circle</v-icon>
                                </v-avatar>
                            </v-flex>

                            <v-flex sm5 md3 hidden-xs-only>
                                <strong class="mr-5 ml-2">Anonymous User</strong>
                            </v-flex>

                            <v-flex>
                                <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </v-card-text>
                            </v-flex>
                            <v-divider></v-divider>
                        </v-layout>

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
                shareDialog: false
            }
        },
        methods: {
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
            setup(title, rating) {
                this.rating = rating;

                if (title !== "") {
                    return "https://source.unsplash.com/1600x900/?" + title;
                }
            },
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
                        console.log('Rating successfully updated with values:');
                        console.log('Rating: ' + rating);
                        console.log('Rating Count: ' + count);
                        console.log('Rating Score: ' + score);
                    })
                        .catch(function (error) {
                            console.error('Error adding document: ', error);
                            alert('An error has occurred while attempting to update the rating for document ' + id + '.')
                        });
                }
            },
            setRating(rating) {
                this.rating = rating;
            },
            share(id) {
                return 'localhost:8080/recipe/' + id;
            }
        }
    }
</script>

<style scoped>

</style>