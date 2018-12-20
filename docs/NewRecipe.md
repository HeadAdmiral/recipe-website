# new-recipe 

## data 

- `valid` 

**initial value:** `true` 

- `active` 

**initial value:** `null` 

- `img` 

**initial value:** `''` 

- `title` 

**initial value:** `''` 

- `titleRules` 

**initial value:** `[object Object]` 

- `summary` 

**initial value:** `''` 

- `summaryRules` 

**initial value:** `[object Object]` 

- `ingredients` 

**initial value:** `''` 

- `ingredientsRules` 

**initial value:** `[object Object]` 

- `directions` 

**initial value:** `''` 

- `directionsRules` 

**initial value:** `[object Object]` 

- `tabNames` 

**initial value:** `[object Object]` 

## methods 

- `getIMG(val)` 

  Returns a matching random image from the Unsplash API using the given value.
  If no title is provided this method does nothing. 

   **return value:** 

     - **Any** - {string} 
- `submit()` 

  Validates input from the form, and then creates a document with id equal to milliseconds since epoch. 

- `clear()` 

  Clears each field inside of the form. 

- `getID()` 

  Returns number of milliseconds since epoch. 

   **return value:** 

     - **Any** - {string} 
