<template>
  <div class="recipes">
    <v-layout align-center justify-center column fill-height >
      <div v-for="recipe in recipes" :key="recipe.id">
        <v-flex my-3>
          <v-card width="1000" hover>
            <v-img :src="recipe.src" aspect-ratio="2.75" :position=recipe.position></v-img>
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
      </div>
      <v-btn fixed fab right bottom class="mx-5 my-4 accent" router :to="edit.route">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>

  export default {
      data() {
          let recipes = [
              { title: 'Commission Calculator',
                  desc: 'Estimates hourly wage for commission-based employees using user-provided sales information.',
                  src: require('@/img/commission-calculator.jpg'),
                  position: 'center center',
                  repo: 'https://github.com/HeadAdmiral/Commission-Calculator',
                  url: 'https://amastin-microcenter.github.io/Commission-Calculator/',
                  id: 1,
                  rating: 3.5
              },

              { title: 'Customer Queue',
                  desc: 'Professional customer-facing utility meant for queueing customers when a salesperson is not currently available.',
                  src: require('@/img/customer-queue.jpg'),
                  position: 'center top',
                  repo: 'https://github.com/HeadAdmiral/Customer-Queue',
                  url: 'https://amastin-microcenter.github.io/Customer-Queue/',
                  id: 2,
                  rating: 2
              }
          ];
          return {
              recipes,
              opts: {
                  timeout: 3000,
                  chain: '38-38-40-40-37-39-37-39-66-65'
              },
              edit: {
                  allow: false,
                  route: '/newrecipe'
              }
          }
      },
      methods: {
          view: function(id) {
              this.$router.push('recipe' + '?id=' + id);
          }
      }
  }
</script>
