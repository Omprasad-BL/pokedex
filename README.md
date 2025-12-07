
# Pokedex Lite 🔴

A modern, responsive, and feature-rich Pokedex application built with **React** and **Vite**. This application allows users to search, filter, and view detailed statistics of Pokémon using the PokéAPI. It features a robust architecture, infinite-style pagination, custom animations, and secure user authentication via Google (Firebase).

[**Live Demo**](https://pokedex-three-phi-83.vercel.app/)


## 🚀 Features

### **Mandatory Features**

  * **Data Fetching:** Fetches data dynamically from [PokéAPI](https://pokeapi.co/).
  * **Responsive UI:** Fully responsive grid layout optimized for Mobile, Tablet, and Desktop.
  * **Search:** Real-time search with smart sorting (prioritizes names starting with the search term).
  * **Filtering:** Filter Pokémon by specific Types (Fire, Water, Grass, etc.).
  * **Pagination:** Hybrid pagination system handling both API-side and client-side data chunks.
  * **Favorites System:** Mark Pokémon as favorites and persist them using Local Storage.
  * **Detail View:** Modal popup displaying stats, height, weight, and official artwork.

### **Bonus Features (Implemented)**

  * **User Authentication:** Google Sign-In using **Firebase Auth**.
  * **Animations:** Smooth transitions using **Framer Motion** (Modals, Hover effects, Page loads).
  * **Theme:** Modern "Dark Slate" aesthetic for reduced eye strain and premium feel.
  * **Optimization:** Debounced search to minimize API calls and performance lag.

-----

## 🛠️ Tech Stack & Packages

This project uses the following technologies. Each package was chosen for a specific purpose to ensure scalability and performance.

| Package | Purpose |
| :--- | :--- |
| **[React](https://react.dev/)** | Core UI library for building component-based interfaces. |
| **[Vite](https://vitejs.dev/)** | Next-generation frontend tooling for lightning-fast build times. |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework for rapid, responsive styling. |
| **[Firebase](https://firebase.google.com/)** | Backend-as-a-Service used for Google Authentication. |
| **[Framer Motion](https://www.framer.com/motion/)** | Production-ready animation library for React (Modals & Transitions). |
| **[React Router DOM](https://reactrouter.com/)** | Handles client-side routing and protected pages. |
| **[Lucide React](https://lucide.dev/)** | Clean, lightweight SVG icons (Search, Heart, Menu, etc.). |


# Pokedex Lite 🔴

A modern Pokedex application built with React and Vite.

## 📚 Documentation

I have written detailed documentation for this project. Please refer to the links below for in-depth explanations:

* **[Installation Guide](./docs/installation.md)**
    * *Step-by-step instructions to set up the environment.*
* **[Architecture & Structure](./docs/architecture.md)**
    * *Explanation of the folder structure and component hierarchy.*
* **[API & Pagination Strategy](./docs/api-integration.md)**
    * *How I solved the search vs. pagination conflict with PokeAPI.*

## 🚀 Quick Start
...

-----

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

### **Prerequisites**

  * **Node.js** (v16 or higher) installed.
  * **npm** (Node Package Manager) installed.

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/YOUR_USERNAME/pokedex-lite.git
cd pokedex-lite
```

### **Step 2: Install Dependencies**

```bash
npm install
```

### **Step 3: Configure Environment Variables**

This project uses Firebase for authentication. You must provide your own Firebase keys.

1.  Create a file named `.env` in the root directory (same level as `package.json`).
2.  Paste the following configuration (replace the values with your own Firebase keys):

<!-- end list -->

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### **Step 4: Start the Development Server**

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

-----

## 📂 Project Structure

The project follows a clean, component-based architecture:

```text
src/
│
├── api/                  # API fetch functions (PokéAPI calls)
├── components/           # Reusable UI components
│   ├── Footer.jsx        # Branding footer
│   ├── Header.jsx        # Navigation, Search, Filter, Profile
│   ├── Pagination.jsx    # Next/Prev buttons
│   ├── PokemonCard.jsx   # Individual Grid Item
│   ├── PokemonModal.jsx  # Detailed Popup
│   └── ProtectedRoute.jsx # Logic to block unauthorized access
│
├── context/              # Global State Management
│   ├── AuthContext.jsx   # Manages User Login/Logout state
│   └── FavoritesContext.jsx # Manages Saved Pokemon list
│
├── pages/                # Main Page Views
│   ├── Login.jsx         # Splash screen & Login
│   └── Pokedex.jsx       # Main Application Logic
│
├── utils/                # Helper functions (Capitalize, Colors)
├── firebase.js           # Firebase configuration
├── App.jsx               # Router Setup
└── main.jsx              # Entry Point
```



-----

## 🧠 Challenges & Solutions

**1. Pagination vs. Search Conflict**

  * *Challenge:* The PokéAPI supports pagination for the main list (`offset=20`), but partial search requires scanning all names.
  * *Solution:* Implemented a **Hybrid Strategy**.
      * **Global Mode:** Fetches data page-by-page from the API.
      * **Search/Filter Mode:** Fetches a lightweight list of *all* Pokémon names once on startup, then filters and paginates them locally on the client side.

**2. Authentication Persistence**

  * *Challenge:* keeping the user logged in across refreshes while protecting routes.
  * *Solution:* Used `onAuthStateChanged` from Firebase inside a React Context (`AuthContext`). Wrapped the main route in a `<ProtectedRoute>` component that redirects to Login if the auth check fails.

**3. Mobile Responsiveness**

  * *Challenge:* The header became too crowded on mobile screens.
  * *Solution:* Implemented a **Collapsible Hamburger Menu** for secondary controls (Profile, Filter) but kept the **Search Bar visible** at the top level on mobile for better UX.

-----

## 🚢 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Add the Environment Variables from your `.env` file into Vercel settings.
4.  Ensure `vercel.json` is present to handle React Router rewrites.

-----

## 👤 Author

**Omprasad BL**

  * [GitHub Profile](https://www.google.com/search?q=https://github.com/Omprasad-BL)   
  * [LinkedIn](https://www.google.com/search?q=https://www.linkedin.com/in/omprasad-b-l-4940b5257/)

-----

Made with ❤️ using **React** & **PokeAPI**.