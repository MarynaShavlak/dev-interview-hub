# Tests

The project uses four types of tests:
1) Regular unit tests with Jest - `npm run test:unit`
2) Component tests with React Testing Library - `npm run test:unit`
3) Screenshot testing with Loki - `npm run test:ui`
4) e2e (end-to-end) testing with Cypress - `npm run test:e2e`



## Regular unit tests with Jest
The project includes comprehensive unit tests to ensure that individual functions and modules work as expected.

1. **Test for function [classNames](../src/shared/lib/classes/classNames/classNames.test.ts)**:
   - The `classNames` function is tested with various scenarios to ensure it correctly combines class names based on provided parameters, including base classes, additional classes, and conditional modifications (`mods`).
2. **Test for function [getFlexClasses](../src/shared/lib/classes/getFlexClasses/getFlexClasses.test.ts)**:
    - The `getFlexClasses` function is tested to verify that it correctly generates an array of CSS class names based on flexbox configuration options. The tests cover different combinations of vertical and horizontal stacking, gap spacing, justification, and alignment to ensure the appropriate classes are applied.
3. **Test for function [addQueryParams](../src/shared/lib/url/addQueryParams/addQueryParams.test.ts)**:
    - The `addQueryParams` function is tested to ensure it correctly adds or updates query parameters in the browser's URL. The tests cover scenarios with one or multiple parameters, as well as handling undefined values to confirm that only valid parameters are included in the final URL.
4. **Test for function [toggleFeatures](../src/shared/lib/features/lib/toggleFeatures/toggleFeatures.test.ts)**:
    - The `toggleFeatures` function is tested to validate its behavior in managing feature flags within a React application. The tests examine different scenarios, including when feature flags are enabled, disabled, undefined, or set to null. The function is also tested with edge cases where `on()` and `off()` return the same value to ensure consistent and predictable behavior.
5. **Test for function [trimText](../src/shared/lib/trimText/trimText.test.ts)**:
    - The `trimText` function is tested to ensure it correctly removes leading and trailing whitespace from a given string. The tests cover various scenarios, including strings with leading, trailing, or both types of whitespace, empty strings, and handling of `undefined` or `null` inputs to verify that the function returns an empty string in those cases.

## Component tests with React Testing Library

The project includes component tests using React Testing Library to verify that React components render correctly and behave as expected.

1. **Test for component [Button](../src/shared/ui/deprecated/Button/Button.test.tsx)**:
   - Tests verify that the `Button` component renders with the correct text and HTML tag, and applies the `clear` class when using the `ButtonTheme.CLEAR` theme.
2. **Test for component [Sidebar](../src/widgets/Sidebar/ui/Sidebar/Sidebar.test.tsx)**:
   - Tests verify that the `Sidebar` component renders correctly and responds to toggle interactions by collapsing when the toggle button is clicked.
3. **Test for component [AppRouter](../src/app/providers/router/ui/tests/AppRouter.test.tsx)**:
   - Tests ensure that the `AppRouter` component correctly renders pages based on routing, handles invalid routes by showing a "Not Found" page, redirects unauthorized users to the "Main" page, allows access to the "Profile" page for authorized users, and manages access to the "Admin" page based on user roles.
4. **Test for component [EditableProfileCard](../src/features/editableProfileCard/ui/EditableProfileCard/EditableProfileCard.test.tsx)**:
   - Tests verify that the `EditableProfileCard` component correctly switches to edit mode, resets form values to their original state upon cancellation, displays an error when form validation fails, and sends a PUT request when the form is successfully saved.
5. **Test for component [NotificationButton](../src/features/notificationButton/ui/NotificationButton/NotificationButton.test.tsx)**:
   - Tests verify that the `NotificationButton` component renders correctly, opens a drawer on mobile view and a popover on browser view when the button is clicked, handles closing the drawer when the overlay is clicked, and correctly toggles the drawer state multiple times.
