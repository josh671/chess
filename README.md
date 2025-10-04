# ♔ Chess Game Frontend

  A real-time multiplayer chess game built with React and Socket.IO. Join rooms, play against friends, and experience chess with full rule validation and elegant
   UI.

  ![Chess Game Demo](https://via.placeholder.com/800x400/2d2d2d/ffffff?text=Chess+Game+Screenshot)

  ## ✨ Features

  - 🎮 **Real-time Multiplayer** - Play live games with friends using room codes
  - ♟️ **Complete Chess Rules** - Full implementation including castling, en passant, and promotion
  - 🎯 **Move Validation** - Client-side move highlighting with server-side validation
  - 👑 **Pawn Promotion** - Interactive promotion dialog with piece selection
  - ⚡ **Live Game States** - Real-time check/checkmate detection and game status updates
  - 📱 **Responsive Design** - Clean, modern UI that works on all devices
  - 🏆 **Game History** - Track moves with algebraic notation display

  ## 🚀 Quick Start

  ```bash
  # Install dependencies
  npm install

  # Start development server
  npm start

  # Open http://localhost:3000

  🎯 How to Play

  1. Join a Room: Enter a room code and click "Join Game"
  2. Get Assigned: Server automatically assigns you White or Black pieces
  3. Make Moves: Click pieces to see valid moves, then click destination
  4. Special Moves:
    - Castle by moving king two squares
    - Promote pawns when reaching the end
    - En passant captures work automatically

  🏗️ Project Structure

  src/
  ├── Components/
  │   ├── Board/              # Chess board and game display
  │   │   ├── Board.jsx       # Main board component
  │   │   ├── PastMoves.jsx   # Move history display
  │   │   └── bits/           # Board coordinates (ranks/files)
  │   ├── Pieces/             # Chess piece logic and rendering
  │   ├── Popup/              # Game dialogs (promotion, game end)
  │   ├── Context/            # React context and Socket.IO integration
  │   └── Reducer/            # Game state management
  ├── Constants.js            # Game configuration and initial state
  └── App.jsx                # Main application component

  🔧 Tech Stack

  - React 18 - Modern React with hooks and context
  - Socket.IO Client - Real-time communication with game server
  - CSS3 - Custom styling with chess-themed design
  - React Testing Library - Component testing framework

  🎨 Key Components

  - App.jsx - Handles room joining and main game flow
  - Board.jsx - Renders chess board and manages move interactions
  - Pieces.jsx - Individual piece components with drag/click handlers
  - Context.jsx - Global state management and socket connection
  - PromotionBox.jsx - Pawn promotion piece selection dialog

  🔗 Backend Integration

  This frontend connects to a Node.js backend server running on port 3001. Make sure the backend is running before starting the frontend.

  🚀 Available Scripts

  - npm start - Start development server
  - npm run build - Build for production
  - npm test - Run test suite
  - npm run eject - Eject from Create React App

  🤝 Contributing

  Feel free to submit issues and pull requests to improve the game!
