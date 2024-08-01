# DisabledRatingBlock

## Overview
The **`DisabledRatingBlock`** component is designed to inform users that the article rating feature is currently unavailable but will be available soon.
This component is conditionally rendered based on the `isArticleRatingEnabled` feature flag. 
When this feature flag is set to false, the `DisabledRatingBlock` component is displayed to notify users about the upcoming availability of the article rating functionality.

## Type Definition 
This component does not accept any props as it is a self-contained informational block.


## Features
1. **Feature Flag Integration**: Utilizes the `isArticleRatingEnabled` feature flag to determine its visibility. If the feature flag is set to false, this component is rendered.

2. **Redesigned UI Adaptation**: Adjusts the rendered UI elements based on whether the redesigned interface (`isAppRedesigned` feature flag) is enabled. This ensures consistency with the application's overall design.

3. **Informative Message**: Displays a message to inform users that the article rating feature will be available soon. The message is translated using the `useTranslation` hook for localization support.

## Usage Example
```typescript jsx
import { DisabledRatingBlock } from '@/ArticleRating/DisabledRatingBlock';

const App = () => (
        <div>
           {/* The DisabledRatingBlock component informs users about the upcoming article rating feature */}
           <DisabledRatingBlock />
        </div>
);
```
## Conclusion
The **`DisabledRatingBlock`** component serves as a placeholder for the article rating feature, informing users that the functionality is not yet available but will be in the near future. By leveraging feature flags and adhering to the redesigned UI when applicable, it ensures a consistent and user-friendly notification experience.
