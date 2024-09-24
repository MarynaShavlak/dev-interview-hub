# NotFoundPage

## NotFoundPage Component 
## Overview
The `NotFoundPage` component is displayed when a user attempts to access a page that does not exist within the application. 
It provides a localized message indicating that the page was not found and leverages feature toggling to switch between different versions of the text component.


## Features
1. **404 Error Message**: Displays a localized message informing the user that the requested page could not be found.
2. **Feature Toggling**: Supports toggling between different UI versions using a feature flag.


## NotFoundPageSkeleton Component
The `NotFoundPageSkeleton` component is a memoized component that renders a skeleton placeholder for the `NotFoundPage`. 
This skeleton provides a visual indication to users that content is loading, ensuring a smooth user experience during loading states.
