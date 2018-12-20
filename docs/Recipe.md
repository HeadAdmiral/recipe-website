# recipe 

## data 

- `recipe` 

**initial value:** `'recipe'` 

- `rating` 

**initial value:** `0` 

- `img` 

**initial value:** `''` 

- `active` 

**initial value:** `null` 

- `dialog` 

**initial value:** `false` 

- `shareDialog` 

**initial value:** `false` 

- `username` 

**initial value:** `''` 

- `comment` 

**initial value:** `''` 

## methods 

- `getRecipe()` 

  Queries Firebase for a document with id matching `this.$route.params.id` in the 'recipes' collection .
  Returns query as an array of objects. 

   **return value:** 

     - **Any** - {Array} 
- `setup(title, rating)` 

  Sets the v-model 'rating' to the given value.
  
  Returns a matching random image from the Unsplash API using the given value.
  If no title is provided this method does nothing. 

   **return value:** 

     - **Any** - {string} 
- `updateRating(id, rating, count, score)` 

  Updates the recipe's rating value in Firebase when clicked.
  Rating is calculated with two variables -- score and count.
  Score is the sum of all ratings, and count is the total number of ratings.
  A recipe's rating is equal to score divided by count and rounded to 3 decimal places. 

- `setRating(rating)` 

  Sets the v-model 'rating' to the given value. 

- `share(id)` 

  Provides a share URL for the v-text-field in the 'shareDialog' window. 

   **return value:** 

     - **Any** - {string} 
- `addComment(recipe, username, comment)` 

  Concatenates the username and comment as a JSON object to the existing comments from the Firebase query.
  The resultant array of JSON objects is then updated in the database. 

- `getColor()` 

  Returns a random color from an array of colors.
  Used to provide a random color for 'v-avatar' icons. 

   **return value:** 

     - **Any** - {string} 
