# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Imperative: You manually tell the browser step-by-step how to change elements
Declarative: You write what the UI should look like based on data, and React handles updating the DOM automatically.

2. Why must a component name start with a capital letter?
React uses capitalization to distinguish native HTML tags (like <div>, <header>, <button>) from custom React components (like <Header/>, <VendorCard/>). Lowercase tags are treated as standard DOM elements.

3. What does a fragment <>...</> do, and why not just use a <div>?
React requires a single root parent element per return statement. Fragments group children without adding an extra wrapper node to the DOM tree, keeping styling and layout (like CSS grid/flexbox) intact.

4. Name one benefit of splitting the UI into small components.
Modularity: bug fixes or design tweaks to a single card don't break or clutter the rest of the application.
