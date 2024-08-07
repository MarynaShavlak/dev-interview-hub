# CurrencySelect

## Overview
The **`CurrencySelect`** component provides a dropdown interface for selecting currencies in a React application. It is designed to allow users to choose a currency from a list of options, which can be dynamically populated using the `useCurrencyOptions` hook. The component supports feature toggling to switch between redesigned and deprecated dropdown styles based on feature flags, ensuring a flexible and adaptable UI.

## Type Definition
```typescript
interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}
```

## Props

The **`CurrencySelect`** component accepts the following props:

| Prop       | Type                           | Required / Optional | Description                                          |
|------------|--------------------------------|----------------------|------------------------------------------------------|
| `value`    | `Currency`                      | Optional             | The currently selected currency.                    |
| `onChange` | `(value: Currency) => void`     | Optional             | Callback function to handle currency selection changes. |
| `readonly` | `boolean`                       | Optional             | If `true`, the component is displayed as read-only.   |
| `className`| `string`                        | Optional             | Custom class name for additional styling.            |


## Features
1. **Dynamic Currency Options**: Utilizes the `useCurrencyOptions` hook to fetch and manage a list of currency options, allowing for dynamic and scalable currency selection.

2. **Feature Toggling**: 
   -  Integrates with `ToggleFeaturesComponent` to conditionally render either the redesigned or deprecated dropdown styles based on feature flags.
   -  Uses the `toggleFeatures` function to conditionally render different labels based on the `isAppRedesigned` feature flag. This enables the component to display either a redesigned or a deprecated label depending on the current feature settings.

## Usage Example
```typescript jsx
import { memo, useState } from 'react';
import { CurrencySelect } from '@/features/CurrencySelect';
import { Currency } from '@/model/types/currency';

const ExampleComponent = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

    const handleCurrencyChange = (currency: Currency) => {
        setSelectedCurrency(currency);
    };

    return (
        <CurrencySelect
            className="customCurrencySelect"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            readonly={true}
        />
    );
};

```
## Conclusion
The **`CurrencySelect`** component offers a robust and adaptable solution for currency selection in a React application. By leveraging dynamic options, feature toggling, and localization, it provides an intuitive and user-friendly interface while ensuring maintainability and compatibility with different application features.
