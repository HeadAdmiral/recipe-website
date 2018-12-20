<template>
    <v-layout align-center justify-center column fill-height>
        <v-flex my-3>
            <v-card width="1250">
                <v-img :src=img aspect-ratio="2.75" v-model="img"></v-img>
                <v-form ref="form" v-model="valid" lazy-validation>
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


                    <v-tab-item>
                        <v-card flat>
                                <v-card-title primary-title>
                                    <v-text-field
                                            placeholder="Title"
                                            solo
                                            full-width
                                            @input="getIMG"
                                            v-model="title"
                                            autofocus
                                            :rules="titleRules"
                                            required
                                    ></v-text-field>
                                </v-card-title>
                                <v-card-text>
                                    <v-textarea
                                            solo
                                            counter="1000"
                                            placeholder="Summary"
                                            v-model="summary"
                                            :rules="summaryRules"
                                            required
                                    ></v-textarea>
                                </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>
                                <v-card-text>
                                    <v-textarea
                                            solo
                                            counter="1000"
                                            placeholder="Ingredients"
                                            v-model="ingredients"
                                            :rules="ingredientsRules"
                                            required
                                    ></v-textarea>
                                </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat>

                                <v-card-text>
                                    <v-textarea
                                            solo
                                            counter="1000"
                                            placeholder="Directions"
                                            v-model="directions"
                                            :rules="directionsRules"
                                            required
                                    ></v-textarea>
                                </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
                </v-form>
                <v-card-actions>
                    <v-btn flat color='accent' @click='submit'>Save</v-btn>
                    <v-btn flat @click=''>Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import database from '@/components/firebaseInit.js'
    import VTabsSlider from "vuetify/lib/components/VTabs/VTabsSlider";


    export default {
        components: {VTabsSlider},
        data: () => ({
            valid: true,
            active: null,
            img: '',
            title: '',
            titleRules: [
                v => !!v || 'Title is Required'
            ],
            summary: '',
            summaryRules: [
                v => !!v || 'Summary is Required'
            ],
            ingredients: '',
            ingredientsRules: [
                v => !!v || 'Ingredients are Required'
            ],
            directions: '',
            directionsRules: [
                v => !!v || 'Directions are Required'
            ],
            tabNames: ['summary', 'ingredients', 'directions']
        }),

        methods: {
            /**
             * Returns a matching random image from the Unsplash API using the given value.
             * If no title is provided this method does nothing.
             * @returns {string}
             */
            getIMG(val) {
                if (val !== "") {
                    this.img = "https://source.unsplash.com/1600x900/?" + val;
                }
            },
            /**
             * Validates input from the form, and then creates a document with id equal to milliseconds since epoch.
             */
            submit: function () {
                let docID = this.getID();
                if (this.$refs.form.validate()) {
                    database.collection('recipes').doc(docID).set({
                        title: this.title,
                        summary: this.summary,
                        ingredients: this.ingredients,
                        directions: this.directions,
                        id: docID,
                        ratingScore: 0,
                        ratingCount: 0,
                        rating: 0,
                        comments: []
                    })
                        .then(function() {
                            console.log('Document successfully written');
                        })
                        .catch(function (error) {
                            console.error('Error adding document: ', error);
                            alert('An error has occurred while attempting to save to the database.')
                        });
                    this.clear();
                }
            },
            /**
             * Clears each field inside of the form.
             */
            clear: function () {
                this.$refs.form.reset();
            },
            /**
             * Returns number of milliseconds since epoch.
             * @returns {string}
             */
            getID: function() {
                return String(new Date().getTime())
            }
        }
    }
</script>

<style scoped>

</style>