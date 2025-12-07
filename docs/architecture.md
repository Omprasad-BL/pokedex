
````markdown
# 🏗️ Project Architecture

This document explains the internal structure of the Pokedex Lite application, helping developers understand how the code is organized and how data flows through the app.

## Folder Structure
We follow a strict **"Separation of Concerns"** pattern. This ensures that every file has a single, clear responsibility, making the codebase scalable and easy to maintain.

```text
src/
├── api/
│   └── index.js           # Centralized API calls (keeps components clean)
│
├── components/            # Reusable UI elements
│   ├── Header.jsx         # Navigation, Search, Filter, & Profile
│   ├── PokemonCard.jsx    # The individual grid item
│   ├── PokemonModal.jsx   # The detailed popup view
│   ├── Pagination.jsx     # Next/Prev buttons
│   ├── Footer.jsx         # Branding & links
│   └── ProtectedRoute.jsx # Security wrapper for pages
│
├── context/               # Global State Management
│   ├── AuthContext.jsx    # Handles User Login/Logout state (Firebase)
│   └── FavoritesContext.jsx # Handles "Saved Pokemon" (LocalStorage)
│
├── pages/                 # Full-screen Route Views
│   ├── Login.jsx          # Public Splash Screen & Auth Entry
│   └── Pokedex.jsx        # Protected Main Application Logic
│
├── utils/                 # Helper functions
│   └── index.js           # Capitalization tools, Color maps, etc.
│
├── firebase.js            # Firebase SDK configuration
├── App.jsx                # Router Setup & Provider Wrapping
└── main.jsx               # Application Entry Point
````

-----

## State Management Strategy

We use a hybrid approach to state management to balance performance and simplicity.

### 1\. Global State (Context API)

We use React Context for data that needs to be accessed by many components at different levels of the tree.

  * **`AuthContext`**: Wraps the entire application. It listens to the Firebase `onAuthStateChanged` event and provides the `user` object to the Header (for the profile picture) and the Router (to protect the dashboard).
  * **`FavoritesContext`**: Loads saved data from `localStorage` immediately when the app boots and provides `toggleFavorite()` and `isFavorite()` functions to every `PokemonCard`.

### 2\. Local State (`useState`)

For UI-specific logic that doesn't affect the whole app, we keep state local to the component.

  * **`Pokedex.jsx`**: Holds the `search` input, `pagination` index, and `filteredList`. This prevents the entire app from re-rendering just because the user typed a letter.
  * **`Header.jsx`**: Holds the `isMenuOpen` state for the mobile hamburger menu.

-----

## Component Data Flow

1.  **Entry (`main.jsx`)**: The app starts here. It wraps the `<App />` component in both `AuthProvider` and `FavoritesProvider` so context is available everywhere.
2.  **Routing (`App.jsx`)**: Handles the navigation logic.
      * Checks if a user is logged in.
      * If **No**: Redirects to `Login.jsx`.
      * If **Yes**: Allows access to `Pokedex.jsx`.
3.  **Smart Container (`Pokedex.jsx`)**: This is the "Brain" of the main page.
      * It fetches data from the API.
      * It handles the complex search filtering logic.
      * It passes pure data down to "Dumb" components like `PokemonCard`.
4.  **Dumb Components (`PokemonCard`, `Pagination`)**: These components strictly display data given to them via props. They do not fetch their own data.

-----

## Styling Architecture

We use **Tailwind CSS** for a utility-first styling approach.

  * **Theme:** We utilize a "Dark Slate" theme (`bg-slate-900`) for headers to reduce eye strain and a light gray (`bg-gray-50`) background for the main content area to make the colorful cards pop.
  * **Responsiveness:** We use mobile-first breakpoints.
      * Default classes (e.g., `flex-col`) apply to Mobile.
      * `md:` classes (e.g., `md:flex-row`) override them for Desktop/Tablet.


```text
+---------------------------------------------------------+
|                    main.jsx (Entry)                     |
|  Wraps App in AuthProvider & FavoritesProvider          |
+---------------------------+-----------------------------+
                            |
                            v
+---------------------------+-----------------------------+
|                      App.jsx                            |
|          (Router & Route Protection Logic)              |
|                                                         |
|   Is User Logged In?                                    |
|   ├── NO  -----------------------------> [ Login.jsx ]  |
|   └── YES ---------------------------> [ Pokedex.jsx ]  |
+---------------------------------------------------------+
                                                |
                                                v
                    +-------------------------------------------------------+
                    |                  Pokedex.jsx (Smart Parent)           |
                    |  1. Fetches API Data (All Names + Page 1)             |
                    |  2. Handles Search/Filter Logic (Debounce + Sort)     |
                    |  3. Manages Pagination State                          |
                    +---------------------------+---------------------------+
                                                |
              +-----------------------+---------+--------+-----------------------+
              |                       |                  |                       |
              v                       v                  v                       v
    +------------------+    +------------------+   +------------------+   +------------------+
    |    Header.jsx    |    |   PokemonCard    |   |    Pagination    |   |   PokemonModal   |
    | (Inputs/Profile) |    | (Display Only)   |   | (Buttons Only)   |   | (Details Popup)  |
    +------------------+    +------------------+   +------------------+   +------------------+
              ^                       ^                                          ^
              |                       |                                          |
    +---------+----------+  +---------+----------+                     +---------+----------+
    |    AuthContext     |  |  FavoritesContext  |                     |      API Utility   |
    | (User Data/Logout) |  | (Save/Unsave IDs)  |                     | (Fetch Details)    |
    +--------------------+  +--------------------+                     +--------------------+ 
    ```

<!-- end list -->
