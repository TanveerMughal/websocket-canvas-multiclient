# Frontend Code Legend

This document provides an overview of the frontend code structure, key components, and potential areas for refactoring.

## Code Structure

-   **`public/`**: Contains static assets that are publicly accessible.
-   **`src/`**: The main source code for the application.
    -   **`assets/`**: Contains static assets like images and icons.
    -   **`components/`**: Contains the React components.
        -   **`Canvas.tsx`**: The main canvas component that renders the rectangles.
        -   **`Rectangle.tsx`**: The component for a single draggable rectangle.
        -   **`SocketManager.tsx`**: Handles all communication with the backend socket server.
    -   **`App.tsx`**: The main application component that brings everything together.
    -   **`main.tsx`**: The entry point of the application.
    -   **`store.ts`**: The Zustand store for managing the application state.
    -   **`index.css`**: Global CSS styles.
    -   **`App.css`**: CSS styles for the `App` component.

## Refactoring Suggestions

-   **Component Organization**: As the application grows, consider organizing components into subdirectories based on features or pages.
-   **State Management**: For more complex applications, you might want to split the Zustand store into multiple slices to better organize the state.
-   **Styling**: The current styling is basic. You could improve the UI by adding more sophisticated Tailwind CSS classes or creating custom components with styled-system or a similar library.
-   **Error Handling**: Implement more robust error handling, such as displaying a notification to the user if the socket connection is lost.
