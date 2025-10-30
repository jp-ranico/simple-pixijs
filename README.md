
# PixiJS Slot Machine Project

## Overview
This project is a modular, type-safe slot machine built with PixiJS and TypeScript. It is designed for junior developer testing and features:

- A multi-reel slot machine with seamless animation and masking
- Strict TypeScript typing (no `any` allowed)
- Modular structure: slot logic, UI, and event bus are separated
- Event-driven architecture for easy extension and UI updates

## How It Works

The app uses PixiJS to render a slot machine with animated reels. Each reel contains a set of symbols, and the visible area is masked for a seamless slot effect. The slot machine emits events (spin start, spin end, win) via a global event bus. UI components (such as the play button and header) are separated from the slot logic for maintainability.

## Installation & Running

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run start
   ```
   This will launch the app in your browser in http://localhost:3000  

## Usage & Extension

- To spin the reels, click the "SPIN" button.
- The slot machine emits events you can listen to via the event bus:
  - `SpinStart`: When a spin begins
  - `SpinEnd`: When a spin ends
  - `Win`: When a win is detected (all symbols in a row match)
- You can add new UI components or features by listening to these events in your own modules.

## How the Components Work

- **SlotMachine**: Manages reels, symbols, and animation. On spin, it randomizes symbol textures, animates the reels, and checks for wins after stopping. Uses strict typing for all logic.
- **SlotSymbol**: Each symbol knows its name, texture, and logical row. The slot machine updates these as reels move.
- **Foreground**: UI layer, separated from slot logic. Can be extended to show messages, balance, or other controls.
- **Event Bus**: Decouples logic and UI. Any component can emit or listen to game events.

## Project Structure

- `src/`
  - `slot-machine.ts` — Slot machine logic and animation
  - `slot-symbol.ts` — Symbol class
  - `foreground.ts` — UI controls and header
  - `game-event-bus.ts` — Global event bus
  - `main.ts` — App entry point
- `index.html` — Entry point for the browser

---

