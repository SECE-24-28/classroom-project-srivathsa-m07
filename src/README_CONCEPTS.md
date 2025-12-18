JSX
JSX is a JavaScript syntax extension that looks like HTML and is used to describe UI structure inside JavaScript. It’s transformed into React.createElement calls at build time. JSX makes components declarative and easier to read, allowing embedding expressions, conditional rendering, and mapping arrays to elements.

Virtual DOM
The Virtual DOM is an in-memory representation of the real DOM used by React. When state or props change, React creates a new virtual DOM tree and diffs it with the previous tree to compute a minimal set of real DOM updates, improving performance by avoiding full DOM re-renders.

Functional Components
Functional components are JavaScript functions that return JSX. They are the modern standard in React and can use hooks (useState, useEffect) for state and lifecycle. They are simpler and often easier to test than class components.

Props & State
Props (properties) are read-only data passed from parent to child components to make components reusable. State is internal to a component (useState) and represents dynamic data that causes re-renders when updated. Use props for configuration and state for mutable UI data.

Component Hierarchy
Components are organized in a tree where parent components pass data down via props and children communicate up via callbacks. Good hierarchy splits UI into reusable, single-responsibility components to keep code modular and maintainable.

Folder Structuring
A clear folder structure groups components, pages, context, styles, and utilities (e.g., src/components, src/pages, src/context). This improves readability and makes scaling easier—keep reusable components in components/, route-level pages in pages/, and shared state in context/.