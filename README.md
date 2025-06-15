<!-- Kanban Task Board -->

A Trello-style Kanban board built with React. Manage your todos visually with drag-and-drop, inline editing, and a clean, responsive UI.

<!-- Features -->
- Fetch, create, update, and delete todos using the DummyJSON Todos API
- Scroll down to fetch all the tasks on first render (infinite scroll bar implemented)
- Kanban board with vertical lanes: Pending, In Progress, Completed
- Drag and drop todos between lanes to update their status
- searching of items by todo name
- Inline editing and deletion of todos (after edit, click outside)
- Add new todo by click + (btn - bottom of each) within the respective lane
- Responsive and mobile-friendly design
- Error handling for API failures

<!-- Getting Started -->

<!-- Prerequisites -->
- Node.js (v14 or higher recommended)
- npm or yarn

<!-- Installation -->
```bash
npm install
# or
yarn install
```

<!-- Running Locally -->
```bash
npm start
# or
yarn start
```

The app will be available at https://kanban-task-board-git-main-vikrant-tyagis-projects.vercel.app.

<!-- Building for Production -->
```bash
npm run build
# or
yarn build
```


<!-- Project Structure -->
- `src/components/` — React components (Board, Lane, TodoCard, etc.)
- `src/styles/` — CSS modules for styling
- `src/services/` — API service layer
- `src/utils/` — all the methods 

<!-- API Reference -->
- [DummyJSON Todos API](https://dummyjson.com/docs/todos)

## Approach

- The app is built with React using a modular component structure (Board, Lane, TodoCard, TodoForm).
- All business logic for CRUD and drag-and-drop is centralized in utility files for maintainability.
- The UI is styled with CSS modules for scoped, responsive, and modern design.
- Infinite scroll is implemented to fetch todos in batches for performance, with a sticky add-todo field for each lane.
- Search works across all todos using the DummyJSON API, not just the loaded ones.
- Error handling is present for all API calls, with user-friendly messages.
- The app is ready for deployment on Vercel or GitHub Pages.

## Trade-offs & Improvements

- **API Limitations:** The DummyJSON API is rate-limited and only supports up to 254 todos. For larger datasets, a real backend or pagination would be needed.
- **Search:** Global search fetches all todos from the API, which may not scale for very large datasets. For true scalability, server-side search or backend filtering is recommended.
- **Optimistic UI:** The app updates UI immediately on add/update/delete, but does not roll back on API failure. Adding rollback logic would improve UX.
- **Testing:** No automated tests are included. Adding unit and integration tests would improve reliability.


