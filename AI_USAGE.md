# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):
- What I asked for: I uploaded the lab checklist and asked Gemini to explain all the components of part B
- What I kept, changed or rejected, and why: I kept everything and tested on comments using CTRL + /
- One thing the AI got wrong and how I fixed it: none just explaination

## Week 2
- Tool(s): copilot in vscode
- What I asked for:
How to pass onAdd from App.jsx through MenuList.jsx down to MenuItemCard.jsx.

Explanations on handling vendor switching using selectedVendorId state.

How to update the cart array immutably without using cart.push().
- What I kept, changed or rejected, and why:
Kept: Using an updater callback setCart((prev) => [...prev, item]) to ensure immutable state updates.

Kept: Passing callback handlers as props so child components can notify App.jsx.

Rejected: An early suggestion to store duplicate items as separate entries in state without quantity tracking, because Week 3 would require quantities.
- One thing the AI got wrong and how I fixed it:
The AI suggested binding onClick={onAdd(item)} directly on the button in MenuItemCard, which triggered the function immediately upon rendering instead of waiting for a click. I fixed it by wrapping it in an arrow function: onClick={() => onAdd(item)}.

## Week 3
- Tool(s): Copilot in VS Code, Gemini

- What I asked for:

How cart.reduce() works to calculate total prices and cart badge counts without storing them in state.

Writing validation logic for the checkout form (checking Mahallah selection and pickup time between 07:00 and 22:00).

Clarification on why setLastOrder({ ...details, total }) uses the spread operator.

How to implement feature 7 (Order notes per item) using a controlled <textarea> in CartItem.jsx and lifting note updates back up to App.jsx.

Debugging why the note <textarea> could not be typed into.

- What I kept, changed or rejected, and why:

Kept: Deriving cartCount and total using .reduce() instead of introducing redundant state variables.

Kept: The controlled input pattern (value and onChange) for both the checkout form and the item note textarea.

Changed: Modified the cart line structure to { item, qty, note: '' } so notes are tracked per line rather than in a separate object.

- One thing the AI got wrong and how I fixed it:

When typing into the note box, the input was completely frozen. The AI's initial snippet did not pass the note update handler down through all layers of props (App.jsx -> CartPage.jsx -> CartItem.jsx), breaking the controlled input loop. I fixed it by explicitly adding onUpdateNote to the props of CartPage and CartItem, and ensuring onChange used capital C.

## Week 4

Tool(s): Copilot in VS Code, Gemini

- What I asked for:

How to refactor the entire app from local state switching to React Router (react-router) with <Routes>, dynamic route /vendor/:id, and layout nesting via <Outlet />.

How to extract cart state, totals, and methods into a centralized CartProvider using the Context API to eliminate prop drilling.

How to write custom hooks (useLocalStorage for cart and order persistence, useVendors for data fetching with AbortController, and useCart).

How to advance Feature 7 (Order notes): persisting item notes within each placed order object and rendering them in OrdersPage.jsx.

Debugging why OrdersPage rendered "No orders placed yet" even after checkout, and why the Cart navigation item was duplicated in the header.

- What I kept, changed or rejected, and why:

Kept: All custom hooks (useLocalStorage, useVendors, useCart) to isolate side effects and state persistence away from page components.

Kept: Programmatic redirect using useNavigate('/orders') inside CartPage.jsx immediately after placeOrder(details) is executed.

Changed: Refactored OrdersPage.jsx destructuring from { order } to { orders } to match the exact context value exposed by CartProvider.

Rejected: Outdated import snippets referencing react-router-dom; kept clean modern imports from react-router per the lab specifications.

- One thing the AI got wrong and how I fixed it:

In OrdersPage.jsx, the generated boilerplate destructured const { order } = useCart(), but CartProvider.jsx actually provided orders (plural). Because order was undefined, placed orders were never rendered. I fixed this by changing the variable name to orders and mapping over each order's snapshot items array to render line notes properly.