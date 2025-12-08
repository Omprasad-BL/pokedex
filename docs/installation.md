
````markdown
# ⚙️ Installation Guide

This guide provides step-by-step instructions to set up **Pokedex Lite** on your local machine.

## Prerequisites
Before you begin, ensure you have the following installed on your computer:
* **[Node.js](https://nodejs.org/)** (v16.0.0 or higher)
* **[Git](https://git-scm.com/)** (for cloning the repository)

---

## Step 1: Clone the Repository
Open your terminal (Command Prompt, PowerShell, or Terminal) and run the following commands to download the code to your machine:

```bash
git clone "https://github.com/Omprasad-BL/pokedex"
cd pokedex-lite
````

-----

## Step 2: Install Dependencies

We use `npm` (Node Package Manager) to install the required libraries like React, Vite, Firebase, and Tailwind CSS.

Run this command inside the project folder:

```bash
npm install
```

-----

## Step 3: Configure Environment Variables (Crucial)

This project uses **Firebase Authentication** for Google Sign-In. You must provide your own API keys for the login functionality to work.

1.  Create a new file named **`.env`** in the root directory of the project (at the same level as `package.json`).
2.  Paste the following configuration into the file.
3.  **Replace the values** with your actual Firebase project keys.

<!-- end list -->

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **How to get these keys:**
>
> 1.  Go to [console.firebase.google.com](https://console.firebase.google.com/).
> 2.  Create a new project.
> 3.  Enable **Authentication** and select the **Google** provider.
> 4.  Go to **Project Settings** (gear icon) -\> **General** -\> **Your apps**.
> 5.  Register a web app and copy the `firebaseConfig` values.

-----

## Step 4: Start the Development Server

Now you are ready to run the app\!

```bash
npm run dev
```

Once the server starts, open your web browser and navigate to:
👉 **http://localhost:5173**

-----

## Step 5: Building for Production (Optional)

If you want to create an optimized build for deployment (e.g., to Vercel or Netlify), run:

```bash
npm run build
```

This will create a `dist/` folder containing the static files ready for upload.

```

**Ready for the next one?** Just ask for "Architecture" or "API Integration" and I'll send it over!
```