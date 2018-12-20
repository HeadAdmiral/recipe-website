# home 

The home page for recipe.ly. 

- **author** - Alex Mastin 
- **license** - MIT 

## data 

- `recipes` 

**initial value:** `'recipes'` 

- `rating` 

**initial value:** `0` 

- `opts` 

**initial value:** `[object Object]` 

- `edit` 

**initial value:** `[object Object]` 

- `dialog` 

**initial value:** `false` 

## methods 

- `view(id)` 

  Reroutes the current page to view the given recipe.
  e.g. If `id = 1234567890`, routes to `/recipe/1234567890` 

- `getProjects()` 

  Queries Firebase for the 'recipes' collection and orders by id.
  Returns query as an array of objects. 

   **return value:** 

     - **Any** - {Array} 
- `getIMG(val)` 

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

  Sets the `v-model` 'rating' to the given value. 

- `share(id)` 

  Provides a share URL for the `v-text-field` in the 'shareDialog' window. 

   **return value:** 

     - **Any** - {string} 
