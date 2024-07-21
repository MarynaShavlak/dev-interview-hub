# Portal
## Overview
The **`Portal`** component in React is a utility that allows you to render children components outside of their parent DOM hierarchy. This is particularly useful for scenarios such as modals, tooltips, and dropdowns, where you might want the rendered elements to appear at a different place in the DOM tree, often at the root level, to avoid CSS and overflow issues.

## Interface
The **`Portal`** component accepts the following props:
```typescript
interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}
```
 - **`children`**: _Required_. The content to be rendered through the portal. It is a required prop of type **`ReactNode`**.
 - **`element`**: _Optional_.  The target element in the DOM where the children should be rendered. If not provided, it defaults to **`document.body`**.

## Functionality
The **`Portal`** component takes in **`children`** and an optional **`element`** prop. It uses the **`createPortal`** function from ReactDOM to render the **`children`** into the specified **`element`**. By default, if no **`element`** is provided, it renders the **`children`** into the **`document.body`**.

## Usage Example
```jsx
<Portal element={document.getElementById('app') ?? document.body} >
    <div className="modal">
        <h1>This is a modal</h1>
    </div>
</Portal>
```

## Conclusion 
This approach provides flexibility and ensures that your modal is properly placed in the DOM, avoiding potential issues with CSS styling and positioning that might arise from rendering it within nested components.
