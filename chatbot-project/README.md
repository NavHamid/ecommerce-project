# Chatbot Project

An interactive chatbot built with React and Vite. The app includes a polished chat-style interface, message bubbles for both the user and the bot, and an input bar for sending new messages.

## Features

- Clean, responsive chat UI
- Auto-scrolls to the latest message
- Separate styles for user and bot messages
- Enter-to-send message input
- Bot replies powered by the `supersimpledev` package

## Tech Stack

- React 18
- Vite
- Supersimpledev chatbot helper
- Plain CSS for styling

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install Dependencies

```bash
npm install
```

### Run the App Locally

```bash
npm run dev
```

Vite will print a local URL in the terminal. Open it in your browser to use the chatbot.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview the Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
	App.jsx
	App.css
	index.css
	main.jsx
	components/
		ChatInput.jsx
		ChatInput.css
		ChatMessage.jsx
		ChatMessage.css
		ChatMessages.jsx
		ChatMessages.css
	assets/
```

## Notes

- The app is focused on UI and message flow rather than external APIs.
- If you plan to deploy it, run `npm run build` first to confirm the production bundle succeeds.

## Credit

This project was built while learning from Supersimpledev.
