<!-- Kanban Task Board -->

A Trello-style Kanban board built with React. Manage your todos visually with drag-and-drop, inline editing, and a clean, responsive UI.

<!-- Features -->
- Fetch, create, update, and delete todos using the DummyJSON Todos API
- Scroll down to fetch all the tasks on first render (infinite scroll bar implemented)
- Kanban board with vertical lanes: Pending, In Progress, Completed
- Drag and drop todos between lanes to update their status
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

