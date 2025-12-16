# TaskNest (React Version)

TaskNest is a simple **React-based task management app**.
It helps you create, organize, track, and analyze your daily tasks from one dashboard.

The app uses the **Xano API** for storing and retrieving tasks.

---

## How to run the app

1. Clone the repository:

   ```
   git clone <your-repo-url>
   ```

2. Navigate into the project folder:

   ```
   cd reacttodoapp
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser at the URL shown in the terminal (usually `http://localhost:5173`)

---

## Technologies used

- **React** for building the user interface
- **React Router** for client-side routing between pages
- **CSS3 / Vanilla CSS** for styling
- **Vanilla JavaScript (ES Modules)** for logic and API calls
- **Xano API** for task creation, updates, and retrieval
- **Ionicons** for icons
- **Google Fonts (Manrope, Anton)** for typography

---

## Key features

### Dashboard

Displays your daily overview:
Your to-do list, task progress, completed tasks, and quick actions.

### Create, edit, and delete tasks

You can add tasks with:

- Title
- Description
- Due date and time
- Priority level
- Completion status

### Vital Tasks

Highlights tasks that are:

- Extreme priority
- Due within 24 hours

### All Tasks section

Shows all tasks in one place with sorting support.

### Search

Search tasks by title or description.
Matches are highlighted and results update as you type.

### Task expansion

Click a task to reveal its full description using a **show more / show less** toggle.

### Profile section

Upload an avatar image for your profile.

### Theme toggle

Switch between light and dark mode using the bulb toggle.

---

## Project Structure (React)

```
src/
  components/      # Reusable components (Nav, Footer, TaskItem, etc.)
  pages/           # Page components (Dashboard, Profile, Login, etc.)
  css/             # All CSS files
  utils/           # Helper functions and API calls
  App.jsx          # Main app component
  main.jsx         # Entry point for React
```

---

## Notes

- All HTML pages from the original version are now converted into React components.
- CSS is imported per component or globally as needed.
- Routing is handled with React Router for smooth navigation.
