# Entity Country Documentation

## Overview
The `Country` module is responsible for handling all country-related functionalities in the React application. This module is structured according to the Feature-Sliced Design (FSD) architecture, ensuring modularity, scalability, and maintainability. The following documentation provides an in-depth look at each part of the `Country` module.

## Module Structure
The `Country` module is organized into several directories, each serving a specific purpose:
```text
Country/
├── lib/
│   └── hooks/
│       └── useCountryOptions.ts
├── model/
│   └── types/
│       └── country.ts
├── ui/
│   └── CountrySelect/
│       ├── CountrySelect.tsx
├── index.ts
```

## Detailed Description

### 1. `lib/`: Utility functions and hooks.

#### 1.1. `hooks/`
- [**useCountryOptions.ts**](./lib/hooks/useCountryOptions.ts): CA custom hook that provides options for selecting countries. This hook can be used across the application wherever country selection is needed.

### 2. `model/`: Core logic and data structures

#### 2.1. `types/`
- [**country.ts**](./model/types/country.ts): Contains TypeScript type definitions for the Country module, defining the structure of a country object. This ensures type safety and consistency throughout the application.

### 3. `ui/`: UI components

#### 3.1. `CountrySelect/`:  Manages the display and interaction of country selection UI.
- [**CountrySelect.tsx:**](./ui/CountrySelect/README.md): The main CountrySelect component, which allows users to select a country from a dropdown menu. This component integrates with the `useCountryOptions` hook to retrieve and display country options.

### 4. `index.ts`

Entry point for the Country module, exporting the necessary components and types for use in the application.

## Public API

- **Types**:
    - `Country` - Enum representing different currencies.

- **Components**:
    - `CountrySelect` - A component for selecting a currency from the available options.


## Conclusion
The Entity `Country` is designed to handle all country-related functionalities in a structured and maintainable manner. By following the FSD architecture, this module ensures easy scalability and integration within the larger application.

For further details on each part of the module, please refer to the respective README.md files within each directory.
