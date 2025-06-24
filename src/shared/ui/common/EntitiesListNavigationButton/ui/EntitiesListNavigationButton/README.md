# EntitiesListNavigationButton 

## Overview
The **`EntitiesListNavigationButton`** is a reusable navigation component that provides contextual back-to-list functionality for different entity types in the application. It dynamically adapts to the application's design system and supports multiple entity routes.

## Features
- **Multi-entity support**: Handles navigation for articles, HR interview Q&A, and live code tasks
- **Design system adaptation**: Automatically switches between redesigned and deprecated UI based on feature flags
- **Internationalization**: Supports translated button labels
- **Type-safe routing**: Ensures all entity types are properly handled

## Props

| Prop | Type | Description | Required |  
|------|------|-------------|----------|  
| `type` | `EntityType` | Determines which list route to navigate to and button label | Yes |  

## EntityType Options
- `'article'`: Navigates to articles list with label "Всі статті" (All articles)
- `'hrInterviewQA'`: Navigates to HR interviews list
- `'liveCode'`: Navigates to live code tasks list

## Implementation Details
The component uses:
- React's `memo` for performance optimization
- `useCallback` for memoized navigation handler
- Feature flagging via `ToggleFeaturesComponent`
- TypeScript exhaustive type checking for safety

## Usage Examples

### Basic Usage
```typescript jsx
import { EntitiesListNavigationButton } from '@/shared/ui';

// In a component
<EntitiesListNavigationButton type="article" />
```
## Conclusion

The `EntitiesListNavigationButton` component provides a flexible and type-safe navigation solution for multiple entity types within the application. Key benefits include:

- **Consistent User Experience**: Maintains uniform navigation patterns across different sections (articles, interviews, code tasks)
- **Future-Proof Design**: Built-in support for both current and deprecated UI systems via feature flags
- **Maintainability**: TypeScript exhaustive checking ensures all entity types are properly handled
- **Localization Ready**: Integrated with i18n for multilingual support

This component serves as a robust building block for list navigation, combining type safety with adaptive design while handling all edge cases through proper error handling. Its implementation demonstrates best practices in React component development including memoization, callback optimization, and clean feature flagging.
