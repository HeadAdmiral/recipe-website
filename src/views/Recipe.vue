<template>
    <v-layout align-center justify-center column fill-height>
        <v-flex my-3>
            <v-card width="1250">
                <v-img :src="recipe.src" aspect-ratio="2.75" :position=recipe.position></v-img>
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
                            v-for="n in [recipe.summary, recipe.ingredients, recipe.directions]"
                            :key="n"
                    >
                        <v-card flat>
                            <v-card-title primary-title v-if="n === recipe.summary">
                                <div>
                                    <h3 class="headline mb-0">{{ recipe.title }}</h3>

                                </div>
                            </v-card-title>
                            <v-card-text>{{ n }}</v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>

                <v-card-actions>
                    <v-btn flat color='accent' @click=''>Share</v-btn>
                    <v-spacer></v-spacer>
                    <span class="grey--text text--darken-2 caption mr-2">({{ rating }})</span>
                    <div class="text-xs-center">
                        <v-rating
                                v-model="rating"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$vuetify.icons.ratingFull"
                                half-increments
                                small
                                hover
                        ></v-rating> <!-- Store ratings as ratingScore and totalRatings. Recipe rating = ratingScore / totalRatings -->
                    </div>
                </v-card-actions>
                <v-divider></v-divider>
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <div slot="header">Comments</div>
                        <v-divider></v-divider>
                        <v-card>
                            <v-layout row wrap>
                                <v-flex xs12 md9>
                                    <v-text-field
                                            label="Add a Comment"
                                            solo
                                            full-width
                                            flat
                                            color="accent"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field
                                            label="Username"
                                            solo
                                            flat
                                            color="secondary"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-card>
                        <v-card>
                            <v-avatar>
                                <v-icon></v-icon>
                            </v-avatar>
                            <v-card-text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import VTabsSlider from "vuetify/lib/components/VTabs/VTabsSlider";

    export default {
        components: {VTabsSlider},
        data() {
            let recipe = {
                    title: 'Commission Calculator',
                    desc: 'Estimates hourly wage for commission-based employees using user-provided sales information.',
                    src: require('@/img/commission-calculator.jpg'),
                    position: 'center center',
                    repo: 'https://github.com/HeadAdmiral/Commission-Calculator',
                    url: 'https://amastin-microcenter.github.io/Commission-Calculator/',
                    id: 1,
                    ratingScore: 1234,
                    totalRatings: 600,
                    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in volutpat sem. Nam posuere pulvinar maximus. Suspendisse potenti. Duis non lorem a velit congue fermentum in id enim. Mauris fringilla congue velit, et maximus lorem rutrum non. Quisque mollis laoreet eros, non cursus ex finibus sit amet. Ut libero ligula, molestie et ultrices nec, placerat ut urna. Praesent maximus sollicitudin tellus, a maximus ligula volutpat at. Aenean ac egestas nibh, id pellentesque lorem. Duis id orci sed ex laoreet semper in ut tellus. Maecenas tincidunt quam vel tellus finibus, quis tempus erat rhoncus. Proin dui elit, malesuada et lobortis nec, lobortis in enim. Vestibulum non magna id odio vestibulum ornare. Donec interdum dignissim congue. Fusce ullamcorper eros nec semper mollis.',
                    ingredients: 'Ingredients',
                    directions: 'Directions'
                };
            let rating = Number((recipe.ratingScore / recipe.totalRatings).toPrecision(3));
            return {
                recipe,
                rating,
                active: null,
                text: 'test'
            }
        },
        methods: {
            share: function() {
                return 0;
            }
        }
    }
</script>

<style scoped>

</style>