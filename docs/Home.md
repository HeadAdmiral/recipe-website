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
  e.g. If id = 1234567890, routes to /recipe/1234567890 

- `getProjects()` 

  Queries Firebase for the 'recipes' collection and orders by id.
  Returns query as an array of objects. 

   **return value:** 

     - **Any** - {Array} 
- `getIMG(val)` 

- `updateRating(id, rating, count, score)` 

- `setRating(rating)` 

- `share(id)` 

