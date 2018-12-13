<template>
  <div class="recipes">
    <v-layout align-center justify-center column fill-height >
      <div v-for="recipe in recipes" :key="recipe.id">
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
              <v-btn flat @click=''>Share</v-btn>
              <v-btn flat @click="view(recipe.id)" color="accent">View</v-btn>
              <v-spacer></v-spacer>
              <span class="grey--text text--darken-2 caption mr-2" id="rating">({{ rating }})</span>
              <div class="text-xs-center" @click.prevent>
                <v-rating
                        v-model="rating"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        empty-icon="$vuetify.icons.ratingFull"
                        half-increments
                        small
                        hover
                        :click="updateRating(recipe.id, rating, recipe.ratingCount, recipe.ratingScore)"
                        :created.once="setRating(recipe.rating)"
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
  import database from '@/components/firebaseInit.js'
  export default {
      data() {
          let recipes = this.getProjects();
          return {
              recipes,
              rating: 0,
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
              this.$router.push('recipe' + '/' + id);
          },
          getProjects: function() {
              let docs = [];
              // Query database for projects collection
              database.collection('recipes').get()
                  .then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {
                          // Update the stored ID to match the document's ID
                          docs.push(doc.data())
                      });
                  });
              return docs;
          },
          getIMG(val) {
              if (val !== "") {
                  return "https://source.unsplash.com/1600x900/?" + val;
              }
          },
          updateRating(id, rating, count, score) {
              console.log("=====");
              console.log(id);
              console.log("Current Rating: " + rating);
              console.log("Current Count: " + count);
              console.log("Current Score: " + score);
              console.log("-----");
              // If the id is loaded update the recipe rating
              if (id && rating !== 0) {
                  count += 1;
                  score = score + rating;
                  console.log("New Count: " + count);
                  console.log("New Score: " + score);
                  rating = Number((score / count).toPrecision(3));
                  console.log("New rating: " + rating);
                  console.log("=====");
                  database.collection('recipes').doc(id).set({
                      rating: rating,
                      ratingCount: count,
                      ratingScore: score
                  }, { merge: true }).then(function () {
                      document.getElementById("rating").innerText = '(' + rating +')';
                      console.log('Rating successfully updated.');
                  })
                      .catch(function (error) {
                          console.error('Error adding document: ', error);
                          alert('An error has occurred while attempting to update the rating for document ' + id + '.')
                      });
              }
          },
          setRating(rating) {
              this.rating = rating;
          }
      }
  }
</script>
