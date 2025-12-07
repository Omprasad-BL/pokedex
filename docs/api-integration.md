
````markdown
# 🔌 API Integration & Pagination Strategy

The most challenging aspect of building a Pokedex with the [PokéAPI](https://pokeapi.co/) is handling the conflict between **server-side pagination** and **client-side searching**. This document explains the hybrid strategy we implemented to solve this.

## The Challenge
The PokéAPI provides two different ways to access data, but neither is perfect for a full-featured app:

1.  **Pagination Endpoint:** `GET /pokemon?limit=20&offset=0`
    * *Pros:* Fast, returns small chunks of data.
    * *Cons:* You cannot filter this list. If you search for "Pika", the API cannot "find" it unless you scan all 1000+ records.
2.  **Type Filtering Endpoint:** `GET /type/fire`
    * *Pros:* Returns all Fire-type Pokémon.
    * *Cons:* Returns **ALL** of them (no pagination). This can be a large data dump.
3.  **Search:**
    * *Cons:* The API does not support partial matching (regex). You must know the exact name "pikachu" to get a result.

---

## The Solution: Hybrid Data Strategy

We implemented a **Dual-Mode System** in `src/pages/Pokedex.jsx` that switches logic based on user interaction.

### Mode A: Global Feed (Server-Side Pagination)
* **Trigger:** When the search bar and filters are empty.
* **Behavior:** We behave like a traditional paginated app.
* **Logic:**
    1.  User is on Page 0. We fetch `limit=20, offset=0`.
    2.  User clicks "Next". We fetch `limit=20, offset=20`.
    3.  We display exactly what the server gives us.

### Mode B: Search/Filter Mode (Client-Side Pagination)
* **Trigger:** When the user types in the search bar OR selects a Type.
* **Behavior:** We switch to a "Local Cache" strategy.
* **Logic:**
    1.  **Initialization:** On app startup, we silently fetch a lightweight list of **all 1000+ Pokémon names** (`fetchAllPokemonNames`). This is very fast (< 20kb).
    2.  **Filtering:** When you type "Char", we filter that local array instantly using JavaScript.
    3.  **Pagination:** We do **not** call the API when you click "Next". Instead, we slice the local array:
        ```javascript
        const start = page * 20;
        const end = start + 20;
        const displayData = filteredList.slice(start, end);
        ```

---

## 🧠 Smart Search Algorithm

To improve the User Experience, we didn't just use a simple `.includes()` check. We implemented a **Weighted Sort** to prioritize better matches.

If a user searches for **"Pi"**, a standard search might show "Caterpie" before "Pikachu" just because "C" comes before "P". Our algorithm fixes this.

```javascript
matches.sort((a, b) => {
  const aStarts = a.name.startsWith(term);
  const bStarts = b.name.startsWith(term);

  // Priority 1: Does it START with the term?
  if (aStarts && !bStarts) return -1; // 'a' wins
  if (!aStarts && bStarts) return 1;  // 'b' wins

  // Priority 2: Alphabetical fallback
  return a.name.localeCompare(b.name);
});
````

**Result:** Searching "Pi" puts **Pi**kachu and **Pi**dgey at the top, and Cater**pi**e at the bottom.

-----

## ⚡ Performance Optimization (Debounce)

Filtering an array of 1300+ items every time a user presses a key causes the UI to freeze (lag). To prevent this, we implemented a **Debounce** mechanism.

  * **How it works:** When the user types, we start a timer (300ms).
  * **Reset:** If they type another letter before 300ms, we cancel the old timer and start a new one.
  * **Execution:** The heavy sorting logic only runs **once** when the user *stops* typing.

<!-- end list -->

```javascript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Run heavy filter logic here...
  }, 300);

  return () => clearTimeout(timeoutId); // Cleanup
}, [searchTerm]);
```

```
```