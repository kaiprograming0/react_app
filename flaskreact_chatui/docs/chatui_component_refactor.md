# Design Doc: Chat UI Component Refactoring

## 1. Overview

### Objective
To improve the maintainability and readability of the React-based chat UI, the UI rendering logic—currently concentrated within `App.tsx`—will be broken down into individual components.

By assigning clear, specific responsibilities to each component, the architecture will become more adaptable to future enhancements, such as integrating a RAG (Retrieval-Augmented Generation) API or expanding chat functionality.

### Background
In the current implementation, the following logic is centralized within `App.tsx`:

- Chat message state management
- Rendering the list of messages
- Handling message input and submission
- Structuring the overall chat interface

Consequently, any UI modifications or feature additions require extensive changes to `App.tsx`.

## 2. Design Principles

The refactoring will be guided by the following principles:

1. Decompose the UI into components based on their specific roles.
2. Use `props` for passing data between components.
3. Keep chat state management and message submission logic centralized in `App.tsx`.
4. Preserve the existing UI design and CSS.
5. Ensure that the behavior of existing features remains unchanged. ## 3. Folder Structure

```text
src/
├── components/
│   ├── ChatMessage.tsx
│   ├── ChatWindow.tsx
│   └── ChatInput.tsx
│
├── App.tsx
├── main.tsx
├── App.css
└── index.css
```

## 4. Component Design

### 4.1 App.tsx

**Role: Managing the overall chat application**

- Manages the state of chat messages
- Manages the state of input values
- Handles message submission logic
- Renders child components

### 4.2 ChatMessage.tsx

**Role: Displaying individual messages**

- Displays messages from the user and the AI
- Switches display format based on the message role (sender)
- Receives message data

### 4.3 ChatWindow.tsx

**Role: Displaying the list of chat history**

- Displays the list of messages
- Iterates through messages using `map()`
- Renders `ChatMessage` components

### 4.4 ChatInput.tsx

**Role: Handling message input and submission**

- Displays the text input field
- Notifies of changes to the input value
- Triggers submission when the Enter key is pressed
- Displays the submit button

## 5. Data Flow

Data and functions are passed from the parent component, `App.tsx`, to each child component via `props`. 
| Source | Destination | Data Passed | Purpose |
|---|---|---|---|
| App.tsx | ChatWindow | messages | Display chat history |
| ChatWindow | ChatMessage | message | Display individual messages |
| App.tsx | ChatInput | input | Display input value |
| App.tsx | ChatInput | onInputChange | Update input value |
| App.tsx | ChatInput | onSend | Send message |

### Data Flow

1. Manage chat state in App.tsx.
2. Pass `messages` from App.tsx to ChatWindow.
3. Pass individual `message` objects from ChatWindow to ChatMessage.
4. Notify App.tsx of the value entered in ChatInput.
5. Add the message via the `handleSend` function in App.tsx.

## 6. Scope

### In Scope
- Creating the `src/components` folder
- Creating `ChatMessage.tsx`
- Creating `ChatWindow.tsx`
- Creating `ChatInput.tsx`
- Refactoring `App.tsx`
- Passing data via props

### Out of Scope
- Connecting to the Flask API
- Implementing RAG search logic
- Splitting CSS files into component-specific files
- Introducing CSS Modules
- Persisting chat history
- Modifying the UI design

## 7. Testing and Verification

Verify the following:

- Initial messages are displayed correctly.
- User messages are displayed correctly.
- Dummy AI responses are displayed correctly.
- Messages can be sent using the send button.
- Messages can be sent by pressing the Enter key twice.
- Messages consisting only of whitespace cannot be sent.
- The existing UI design is maintained. 

## 8. Future Improvements

For future development, we will consider adding the following features, building upon the current component architecture:

- Integration with a Flask API
- Answer generation using RAG (Retrieval-Augmented Generation)
- Chat history management
- Loading indicators
- Error displays