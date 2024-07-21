# Tabs

## Overview
The `Tabs` component is a fundamental UI element designed to enhance the user experience by providing an intuitive way to navigate between multiple content sections within a single page. It enables developers to present content in a clean, organized, and interactive manner, allowing users to switch between different views or data sets seamlessly. This component is ideal for scenarios where space is limited, and content needs to be divided into discrete, easily accessible sections.

## Type Definitions 
The types used in the `Tabs` component are defined as follows:
```typescript
export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}
```

## Props 
The `Tabs` component accepts the following props:

| Prop         | Type                                        |          Required / Optional          | Description                                                                 |
|--------------|---------------------------------------------|:-------------------------------------:|-----------------------------------------------------------------------------|
| `tabs`       | `TabItem[]`                                 |               Required                | An array of tab items, each containing a `value` and `content` to be displayed. |
| `value`      | `string`                                    |               Required                | The currently selected tab value, determining which tab is active.          |
| `onTabClick` | `(tab: TabItem) => void`                    |               Required                | Callback function triggered when a tab is clicked, receiving the clicked tab as an argument. |
| `direction`  | `FlexDirection`                             | Optional <br/> (default: `'row'`) | Determines the direction in which tabs are laid out, either `'row'` or `'column'`. |
| `className`  | `string`                                    |               Optional                | Additional custom class names to style the tabs.                            |

## Usage Examples

```jsx
import {useState } from 'react';

import { Tabs } from '@/shared/ui/redesigned/Tabs';

const tabs = [
    { value: 'tab1', content: 'Tab 1 Content' },
    { value: 'tab2', content: 'Tab 2 Content' },
    { value: 'tab3', content: 'Tab 3 Content' }
];

export const BasicTabsExample = () => {
    const [selectedTab, setSelectedTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setSelectedTab(tab.value);
    };

    return (
        <Tabs
            tabs={tabs}
            value={selectedTab}
            onTabClick={handleTabClick}
            direction="vetical"
        />
    );
};
```
## Conclusion
The `Tabs` component provides an essential UI element for navigating between different sections of content in a React application. With its dynamic rendering, customizable layout, and interactive features, it offers a robust solution for managing tab-based navigation. Whether used in a horizontal or vertical orientation, the `Tabs` component enhances user experience with its clear and organized presentation of content.
