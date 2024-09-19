# Entity Currency Documentation

## Overview
The `Currency` module is responsible for handling all currency-related functionalities in the React application. This module is structured according to the Feature-Sliced Design (FSD) architecture, ensuring modularity, scalability, and maintainability. The following documentation provides an in-depth look at each part of the `Currency` module.

## Module Structure
The `Currency` module is organized into several directories, each serving a specific purpose:
```text
Currency/
├── lib/
│   └── hooks/
│       └── useCurrencyOptions.ts
├── model/
│   └── types/
│       └── currency.ts
├── ui/
│   └── CurrencySelect/
│       ├── CurrencySelect.tsx
├── index.ts
```

## Detailed Description

### 1. `lib/`: Contains reusable utility functions and hooks for the Currency  module.

#### 1.1. `hooks/`
- [**useCurrencyOptions.ts**](./lib/hooks/useCurrencyOptions.ts): CA custom hook that provides options for selecting countries. This hook can be used across the application wherever currency selection is needed.

### 2. `model/`: Encapsulates the core logic and data structures of the Currency  module.

#### 2.1. `types/`
- [**currency.ts**](./model/types/currency.ts): Contains TypeScript type definitions for the Currency  module, defining the structure of a currency object. This ensures type safety and consistency throughout the application.

### 3. `ui/`: Contains the UI components related to the Currency  module.

#### 3.1. `CurrencySelect/`:  Manages the display and interaction of currency selection UI.
- [**CurrencySelect.tsx**](./ui/CurrencySelect/README.md): The main CurrencySelect component, which allows users to select a currency from a dropdown menu. This component integrates with the `useCurrencyOptions` hook to retrieve and display currency options.

### 4. `index.ts`

Entry point for the Currency  module, exporting the necessary components and types for use in the application.

## Public API

- **Types**:
    - `Currency` - Enum representing different currencies.

- **Components**:
    - `CurrencySelect` - A component for selecting a currency from the available options.


## Conclusion
The Entity `Currency` is designed to handle all currency-related functionalities in a structured and maintainable manner. By following the FSD architecture, this module ensures easy scalability and integration within the larger application.

For further details on each part of the module, please refer to the respective README.md files within each directory.
