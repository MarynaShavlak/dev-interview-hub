# Overlay
##  Overview
The **`Overlay`** component is a simple, reusable React component designed to provide an overlay effect on the user interface. It can be used to create modal backdrops or any other semi-transparent overlay that requires user interaction handling.

## Interface
The **`Overlay`** component accepts the following props:

```typescript
interface OverlayProps {
    className?: string;
    onClick?: () => void;
}
```
- **`className`**: _Optional_. CSS class name to apply custom styles to the overlay.
- **`onClick`**: _Optional_. Click event handler that is triggered when the overlay is clicked.


## Usage Example 
```jsx
import { Overlay } from '@/shared/components/Overlay/Overlay';

const MyComponent = () => {
    const handleOverlayClick = () => {
        console.log('Overlay clicked!');
    };

    return (
        <div>
            <Overlay 
                className="custom-overlay" 
                onClick={handleOverlayClick} 
            />
        </div>
    );
};
```
## Conclusion
The **`Overlay`** component is a straightforward and flexible component for adding overlay effects in a React application. By accepting optional **`className`** and **`onClick`** props, it allows for easy customization and interaction handling.
