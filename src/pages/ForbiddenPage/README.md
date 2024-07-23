# ForbiddenPage

## ForbiddenPage Component 
## Overview
The `ForbiddenPage` component is rendered when a user attempts to access a page for which they do not have the required permissions. 
This typically occurs when the user does not have the necessary role to view the page. 
The component provides a localized error message informing the user that access is restricted.


## Features
1. **Access Denial Message**: Displays a message indicating that the user does not have access to the page.
2. **Feature Toggling**: Supports toggling between different UI versions using a feature flag.


## ForbiddenPageSkeleton Component
The `ForbiddenPageSkeleton` component is a memoized component that renders a skeleton placeholder for the `ForbiddenPage`. 
This skeleton provides a visual indication to users that content is loading, ensuring a smooth user experience during loading states.
