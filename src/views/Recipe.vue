<template>
    <v-layout align-center justify-center column fill-height>
        <v-flex my-3>
            <v-card width="1250" hover>
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
                            v-for="n in ['{{ recipe.summary }}', recipe.ingredients, recipe.directions]"
                            :key="n"
                    >
                        <v-card flat>
                            <v-card-text>{{ n }}</v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ recipe.title }}</h3>
                        <span>{{ recipe.desc }}</span>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat @click=''>Share</v-btn>
                    <v-btn flat @click="view(recipe.id)" color="accent">View</v-btn>
                    <v-spacer></v-spacer>
                    <div class="text-xs-center">
                        <v-rating
                                v-model="recipe.rating"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$vuetify.icons.ratingFull"
                                half-increments
                                small
                                hover
                        ></v-rating>
                    </div>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import VTabsSlider from "vuetify/lib/components/VTabs/VTabsSlider";

    export default {
        components: {VTabsSlider},
        data() {
            let recipe = [
                {
                    title: 'Commission Calculator',
                    desc: 'Estimates hourly wage for commission-based employees using user-provided sales information.',
                    src: require('@/img/commission-calculator.jpg'),
                    position: 'center center',
                    repo: 'https://github.com/HeadAdmiral/Commission-Calculator',
                    url: 'https://amastin-microcenter.github.io/Commission-Calculator/',
                    id: 1,
                    rating: 3.5,
                    summary: 'Summary of',
                    ingredients: 'Use something',
                    directions: 'Do something'
                }
            ];
            return {
                recipe,
                active: null,
                text: 'test'
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>