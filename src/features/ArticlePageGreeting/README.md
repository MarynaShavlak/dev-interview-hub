# Feature ArticlePageGreeting Documentation

## Overview

The `ArticlePageGreeting` module provides a welcoming message for users on their first visit to the articles page. It is designed to enhance the user experience by showing the message in a modal on desktop devices and in a drawer on mobile devices. After the initial visit, the message is no longer displayed, as the state is managed via JSON settings.

## Module Structure

The `ArticlePageGreeting` module is organized into two main parts: the core UI component and the entry point.

```text
ArticlePageGreeting/
├── ui/
│   └── ArticlePageGreeting/
│       └── ArticlePageGreeting.tsx
└── index.ts
```

## Detailed Description

### 1. `ui/`: UI components
- **`ArticlePageGreeting/`**:
  - [**ArticlePageGreeting.tsx**](./ui/ArticlePageGreeting/README.md): Main component for displaying a welcome message to users on their first visit to the articles page

### 2. `index.ts`
- Entry point for the `ArticlePageGreetings` module, exporting component `ArticlePageGreeting`.

## Public API
- **Components**:
    - `ArticlePageGreeting`: Displays the welcome message for first-time visitors to the articles page, using device-adapted UI elements.

## Conclusion
The `ArticlePageGreeting` module enhances the user experience by greeting first-time visitors to the articles page. With persistent settings to avoid repeated displays and adaptive UI based on device type, the component ensures a smooth, responsive experience. It efficiently manages user interactions while maintaining a clean and modern design.
