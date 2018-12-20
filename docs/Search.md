# search 

## data 

- `searchResults` 

**initial value:** `'searchResults'` 

- `dialog` 

**initial value:** `false` 

- `rating` 

**initial value:** `0` 

- `empty` 

**initial value:** `'empty'` 

## methods 

- `search()` 

  Queries Firebase for the 'recipes' collection where a recipe's title matches the search key word.
  Returns query as an array of objects. 

   **return value:** 

     - **Any** - {Array} 
- `getIMG(val)` 

  Returns a matching random image from the Unsplash API using the given value.
  If no title is provided this method does nothing. 

   **return value:** 

     - **Any** - {string} 
- `share(id)` 

  Provides a share URL for the `v-text-field` in the 'shareDialog' window. 

   **return value:** 

     - **Any** - {string} 
- `isEmpty()` 

  Returns true if there are no elements with a class of `card` on the page.
  i.e. Returns true if there are no matching search results. 

   **return value:** 

     - **Any** - {boolean} 
