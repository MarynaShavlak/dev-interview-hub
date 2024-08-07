# CountrySelect

## Overview
The **`CountrySelect`** component provides a dropdown interface for selecting countries in a React application. 
It allows users to choose a country from a list of options, which is dynamically populated using the `useCountryOptions` hook. The component supports feature toggling to switch between redesigned and deprecated dropdown styles based on feature flags, ensuring flexibility and adaptability in the UI.

## Type Definition
```typescript
interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}
```

## Props

The **`CountrySelect`** component accepts the following props:

| Prop       | Type                           | Required / Optional | Description                                          |
|------------|--------------------------------|----------------------|------------------------------------------------------|
| `value`    | `Country`                       | Optional             | The currently selected country.                     |
| `onChange` | `(value: Country) => void`      | Optional             | Callback function to handle country selection changes. |
| `readonly` | `boolean`                       | Optional             | If `true`, the component is displayed as read-only.   |
| `className`| `string`                        | Optional             | Custom class name for additional styling.            |


## Features
1. **Dynamic Country Options**: Utilizes the `useCountryOptions`  hook to fetch and manage a list of country options, allowing for dynamic and scalable country selection.
2. **Feature Toggling**:
    -  Integrates with `ToggleFeaturesComponent` to conditionally render either the redesigned or deprecated dropdown styles based on feature flags.
    -  Uses the `toggleFeatures` function to conditionally render different labels based on the `isAppRedesigned` feature flag. This enables the component to display either a redesigned or a deprecated label depending on the current feature settings.

## Usage Example
```typescript jsx
import { memo, useState } from 'react';
import { CurrencySelect } from '@/features/CurrencySelect';
import { Currency } from '@/model/types/currency';

const ExampleComponent = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country>('Ukraine');

    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
    };

    return (
        <CountrySelect
            className="customCountrySelect"
            value={selectedCountry}
            onChange={handleCountryChange}
            readonly={true}
        />
    );
};
```
## Conclusion
The **`CountrySelect`** component offers an efficient and adaptable solution for selecting countries in a React application. By leveraging dynamic options, feature toggling, and localization, it provides a user-friendly interface while ensuring maintainability and flexibility across different application features.
