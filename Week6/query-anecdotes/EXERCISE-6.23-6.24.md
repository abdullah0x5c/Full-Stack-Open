Exercise 6.23 and 6.24 - summary of changes

This file summarizes the edits made while working on exercises 6.23 and 6.24.

Changes made:
- Wired NotificationContext to the application and exported `NotificationContextProvider` from `NotificationContext.jsx`.
- Moved provider wrapping to `main.jsx` so context is available app-wide.
- Fixed Notification component to consume context via `useContext(NotificationContext)` and render messages.
- Hooked AnecdoteForm and App to dispatch notifications (SET/RESET) on successful mutation actions.
- Fixed React Query usage in App and AnecdoteForm (used `queryFn: getAnecdotes` and `mutationFn: addAnecdote`).
- Fixed several service functions to correctly include IDs in PUT requests and handle responses.

How to run:
1. Start json-server: `npx json-server --watch db.json --port 3001`
2. Start frontend: `npm run dev` inside `Week6/query-anecdotes`.

Notes:
- If some changes were already committed previously, this file helps summarise the current state.
- If additional edits are needed, modify files in `Week6/query-anecdotes/src/` and commit as usual.
