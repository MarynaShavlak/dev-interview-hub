# Feature ArticleEditNavigationButton Documentation

## Overview

The `ArticleEditNavigationButton` module provides a welcoming message for users on their first visit to the articles page. It is designed to enhance the user experience by showing the message in a modal on desktop devices and in a drawer on mobile devices. After the initial visit, the message is no longer displayed, as the state is managed via JSON settings.

## Module Structure

The `ArticleEditNavigationButton` module is organized into two main parts: the core UI component and the entry point.

```text
ArticleEditNavigationButton/
├── ui/
│   └── ArticleEditNavigationButton/
│       └── ArticleEditNavigationButton.tsx
└── index.ts
```

## Detailed Description

### 1. `ui/`: UI components
- **`ArticleEditNavigationButton/`**:
    - [**ArticleEditNavigationButton.tsx**](./ui/ArticleEditNavigationButton/README.md): Main component that renders a button, allowing users to navigate to the edit page of the current article

### 2. `index.ts`
- Entry point for the `ArticleEditNavigationButtons` module, exporting the button component for easy use throughout the application.

## Public API
- **Components**:
    - `ArticleEditNavigationButton`: A button that navigates users to the edit page of the current article, adapting its design based on feature flags.

## Conclusion
The `ArticleEditNavigationButton` module simplifies navigation for users, offering an intuitive button that directs them to the article edit page. With seamless integration into the app's routing system and adaptive design features, it ensures a user-friendly experience that aligns with both the application's functionality and design updates.
