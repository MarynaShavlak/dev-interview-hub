# Widget ArticleAdditionalInfo Documentation

## Overview

The `ArticleAdditionalInfo` widget provides a detailed view of additional information related to an article, such as the author's details, publication date, view count, and editing options. This widget enhances the article reading experience by offering key contextual information while supporting internationalization for different languages. It also includes a navigation button for article editing, adding further utility for content authors and editors.
## Module Structure

The `ArticleAdditionalInfo`  module is organized into UI components and an entry point for the module.
```text
ArticleAdditionalInfo/
├── ui/
│   └── ArticleAdditionalInfo/
│       └── ArticleAdditionalInfo.tsx
└── index.ts
```

## Detailed Description

### 1. `ui/`: UI components
- **`ArticleAdditionalInfo/`**:
    - [**ArticleAdditionalInfo.tsx**](./ui/ArticleAdditionalInfo/README.md): The main component that displays the article's additional details such as author information, publication date, view count, and an edit navigation button for article editing. The component is designed to adapt its content to different languages and pluralization rules, making it highly flexible for international use.

### 2. `index.ts`
- Entry point for the `ArticleAdditionalInfo` module, exporting the  component for easy use throughout the application.

## Public API
- **Components**:
    - `ArticleAdditionalInfo`: A widget that displays author information, publication date, view count, and provides access to article editing features.
## Conclusion
The `ArticleAdditionalInfo`module is an essential widget for displaying key article metadata, such as author details, publication date, and view count. Its support for internationalization and pluralization ensures that the information is presented accurately in different languages, making it suitable for global applications. The inclusion of the edit navigation button further enhances its functionality by providing easy access to editing features, making it a valuable tool for both readers and content creators alike.
