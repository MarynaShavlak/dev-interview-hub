# Component Tests with React Testing Library

The project includes component tests using React Testing Library to verify that React components render correctly and behave as expected.

## 1. [Sidebar](../../../src/widgets/Sidebar/ui/Sidebar/Sidebar.test.tsx) Component

| Aspect                          |  Purpose                                                                                                        | 
|---------------------------------|---------------------------------------------------------------|
| **Rendering**                   | Verifies that the `Sidebar` component renders correctly.                                                         |           
| **Toggle Interaction**          | Ensures that the `Sidebar` component responds to toggle interactions by collapsing when the toggle button is clicked. |                              

## 2. [AppRouter](../../../src/app/providers/router/ui/tests/AppRouter.test.tsx) Component

| Aspect                          |  Purpose | 
|---------------------------------|---------------------------------------------------------------|
| **Routing**                     | Ensures that the `AppRouter` component correctly renders pages based on routing.                                |                                
| **Invalid Routes**              | Handles invalid routes by showing a "Not Found" page.                                                           |                  
| **Unauthorized Redirect**       | Redirects unauthorized users to the "Main" page.                                                               |                  
| **Authorized Access**           | Allows access to the "Profile" page for authorized users.                                                       |                             
| **Role-Based Access**           | Manages access to the "Admin" page based on user roles.                                                         |                              

## 3. [EditableProfileCard](../../../src/features/EditableProfileCard/ui/EditableProfileCard/EditableProfileCard.test.tsx) Component

| Aspect                          |  Purpose | 
|---------------------------------|---------------------------------------------------------------|
| **Edit Mode**                   |  Verifies that the `EditableProfileCard` component correctly switches to edit mode.                              |            
| **Reset Form Values**           | Ensures that form values are reset to their original state upon cancellation.                                   |                             
| **Form Validation Error**       | Displays an error when form validation fails.                                                                   |                                 
| **Save Form**                   | Sends a PUT request when the form is successfully saved.                                                         |                                 

## 4. [NotificationButton](../../../src/features/NotificationButton/ui/NotificationButton/NotificationButton.test.tsx) Component

| Aspect                          | Purpose                                                                                                        | 
|---------------------------------|----------------------------------------------------------------------------------------------------------------|
| **Rendering**                   |   Verifies that the `NotificationButton` component renders correctly.                                           |                                 
| **Drawer/Popover Toggle**       |  Opens a drawer on mobile view and a popover on browser view when the button is clicked.                        |                               
| **Drawer Closing**              |  Handles closing the drawer when the overlay is clicked.                                                         |                                   
| **Multiple Toggles**            |  Correctly toggles the drawer state multiple times.                                                             |                                 

## 5. [Rating](../../../src/entities/Rating/ui/Rating/Rating.test.tsx) Component

| Aspect                          |  Purpose                                                                                                      | 
|---------------------------------|--------------------------------------------------------------------------------------------------------------|
| **Rendering**                   |  Ensures that the `Rating` component renders with a title.                                                     |                                   
| **Thank-You Message**           | Correctly displays a thank-you message when a rating is provided.                                            |                                   
| **Feedback Modal**              | Appropriately shows or hides the feedback modal based on the component's configuration.Verifies that the modal can be closed without submitting feedback or correctly submits feedback.                       | 

## 6. [AuthForm](../../../src/features/AuthUser/ui/AuthForm/AuthForm.test.tsx) Component

| Aspect                          | Purpose                                                                                                          | 
|---------------------------------|------------------------------------------------------------------------------------------------------------------|
| **Rendering**                   | Ensures that the `AuthForm` component renders correctly.                                                         |                                 
| **Field Updates**               | Updates the username and password fields on user input.                                                          |                                  
| **Login Scenarios**             | Handles various login scenarios, including displaying error messages for incorrect credentials and empty fields. |                                   
| **Button State**                | Verifies that the login button is disabled while loading.                                                        |                                   
| **Success Callback**            | Calls the `onSuccess` callback upon successful login.                                                            |                                   
| **Error Handling**              | Clears error messages and allows retry after a failed login attempt.                                             |                                   

## 7. [AddCommentForm](../../../src/entities/Comment/ui/AddCommentForm/AddCommentForm.test.tsx) Component

| Aspect                          | Purpose          |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Rendering**                   |  Ensures that the `AddCommentForm` component renders correctly.                                                   |                                
| **Field Updates**               |  Updates the comment text field on user input.                                                                  |                                 
| **Comment Submission**          |  Handles comment submission, ensuring the `onSendComment` callback is called with the correct comment.            |                                 
| **Button State**                |  Verifies that the send button is enabled or disabled based on the input's state.                               |                                  

