## Week 1 Reflection

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

In an imperative approach, you manually instruct the browser step-by-step on how to select, modify, and append DOM elements. In a declarative approach with React, you simply describe what the UI should look like based on the current state, and React automatically computes and applies DOM updates.

2. Why must a component name start with a capital letter?

React uses capitalization to differentiate between standard HTML elements (like <div> or <button>) and custom React components (like <Header /> or <VendorCard />). Lowercase names are compiled directly into native DOM strings rather than function calls.

3. What does a fragment <>...</> do, and why not just use a <div>?

React requires a component to return a single root element. A fragment groups multiple elements together without rendering an unnecessary wrapper node into the actual DOM, which prevents unwanted layout bugs in CSS Grid and Flexbox containers.

4. Name one benefit of splitting the UI into small components.

It improves maintainability and reusability. Encapsulating logic and layout into isolated components (like MenuItemCard) means you can update or fix a specific element in one place without cluttering or breaking the rest of the application.

## Week 2 Reflection

1. What is the difference between props and state in React?

Props are read-only configuration values passed down from a parent component to customize its child. State is internal memory managed within the component itself that, when modified via its setter function, causes the component to re-render.

2. Why should state be treated as immutable (never modifying arrays/objects directly)?

React determines whether to re-render by checking if object or array references have changed in memory. Mutating an array directly (e.g., using cart.push()) keeps the same reference, causing React to miss the update and fail to refresh the UI.

3. What does "lifting state up" mean, and when should you do it?

Lifting state up means moving a piece of state to the closest common ancestor of two or more components. You do this when multiple sibling components need access to the same shared data, such as when MenuList needs to add items to a cart that Header displays.

4. Why must every item rendered in a .map() list have a unique key prop?

Keys provide elements with a stable identity between renders. This enables React’s virtual DOM reconciliation algorithm to identify exactly which items have been added, moved, or deleted, avoiding costly and buggy full-list re-renders.

## Week 3 Reflection

1. What is a controlled input in React, and how does it work?

A controlled input is a form field whose visible value is driven directly by React state via value={...}. Any typing or interaction triggers an onChange event that updates state, creating a single, predictable source of truth.

2. Why do we derive values (like cartCount and total) instead of storing them in their own state?

Derived values can be computed on the fly on every render using methods like .reduce(). Storing them in separate state variables creates redundant sources of truth that can easily become desynchronized or cause unnecessary extra re-renders.

3. Why is an AbortController cleanup function needed inside useEffect when fetching data?

If a user leaves a page before an asynchronous fetch request completes, the component unmounts while the request is still pending. The controller.abort() cleanup cancels the network call, preventing memory leaks and avoiding setting state on an unmounted component.

4. Why does React Strict Mode execute useEffect twice during development?

Strict Mode deliberately runs effects and their cleanups twice on initial mount to help developers catch missing cleanup functions, unhandled subscriptions, or hidden side effects before the code goes to production.

## Week 4 Reflection

1. What problem does the Context API solve compared to passing props?

Context eliminates "prop drilling," where state and updater functions have to be passed down through intermediate components that do not actually need them. It allows deeply nested components anywhere in the tree to access shared data (like useCart()) directly.

2. What is the purpose of extracting logic into custom hooks like useLocalStorage or useVendors?

Custom hooks extract reusable stateful logic into clean, modular functions separated from UI markup. This keeps page components lightweight, readable, and focused purely on layout while encapsulating side effects and storage logic.

3. How does React Router change the way multi-page web applications work compared to traditional websites?

Traditional websites request a brand-new HTML document from the server on every link click, causing full-page reloads. React Router enables client-side routing, intercepting URL changes in JavaScript and swapping only the matched components inside <Outlet /> instantly without refreshing the page.

4. Why is reading parameters from the URL (useParams) better than storing the selected vendor in local component state?

Using URL parameters allows pages to be deep-linked, bookmarked, and shared directly between users. It also restores native browser functionality, allowing users to navigate forward and backward through their browsing history smoothly.