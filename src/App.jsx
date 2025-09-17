/**
 * Chess Game Main App Component
 * Manages game state, socket connections, and room joining functionality
 */

import Board from './Components/Board/Board'
import AppContext from './Components/Context/Context'
import { reducer } from './Components/Reducer/reducer'
import { useReducer } from 'react'
import { initGameState } from './Constants';
import { useSocket } from './Components/Context/SocketContenxt';
import { useState, useEffect, useCallback } from 'react'


/**
 * Main App component that handles the chess game application
 * @returns {JSX.Element} Either room joining interface or game board
 */
function App() {
  // Game state management using reducer pattern
  const [appState, dispatch] = useReducer(reducer, initGameState)

  // Socket connection and room management
  const socket = useSocket();
  const [roomId, setRoomId] = useState('');      // Room ID for multiplayer games
  const [joined, setJoined] = useState(false);   // Whether player has joined a room
  const [playerColor, setPlayerColor] = useState(''); // Player's assigned color ('w' or 'b') 
   

  /**
   * Handle joining a multiplayer game room
   * Emits joinRoom event to server with the provided room ID
   */
  const joinRoom = () => {
    if (socket && roomId) {
      socket.emit('joinRoom', roomId);
    }
    console.log('joined room', roomId);
  }
  
  /**
   * Handle player color assignment from server
   * @param {Object} data - Color assignment data
   * @param {string} data.color - Assigned player color ('w' or 'b')
   * Memoized to prevent useEffect re-runs
   */
  const handlePlayerColor = useCallback(({ color }) => {
    console.log('app playerColor', color);
    setPlayerColor(color);
    setJoined(true);
  }, []);

  /**
   * Handle initial board setup from server
   * @param {Object} newBoard - Board state data from server
   */
  const handleBoardSetup = useCallback((newBoard) => {
    console.log(newBoard);
    dispatch(newBoard);
  }, [dispatch]);

  /**
   * Handle pawn promotion status updates
   * @param {Object} statusUpdate - Promotion status data from server
   */
  const handlePromotionStatus = useCallback((statusUpdate) => {
    console.log('Promotion status update:', statusUpdate);
    dispatch(statusUpdate);
  }, [dispatch]);
  /**
   * Setup socket event listeners when socket connection is established
   * Handles board updates, player color assignment, room full status, and promotions
   */
  useEffect(() => {
    if (!socket) return;

    /**
     * Handle room full notification from server
     */
    const handleRoomFull = () => {
      alert('Room is full!');
      setJoined(false);
    };

    // Add socket event listeners
    socket.on('board', handleBoardSetup);
    socket.on('playerColor', handlePlayerColor);
    socket.on('roomFull', handleRoomFull);
    socket.on('promotionStatus', handlePromotionStatus);

    console.log('Socket connected, current playerColor:', playerColor);

    // Cleanup function to remove event listeners
    return () => {
      socket.off('board', handleBoardSetup);
      socket.off('playerColor', handlePlayerColor);
      socket.off('roomFull', handleRoomFull);
      socket.off('promotionStatus', handlePromotionStatus);
    };
  }, [socket, handleBoardSetup, handlePlayerColor, playerColor, handlePromotionStatus]);

  // Render room joining interface if not yet joined
  if (!joined) {
    return (
      <div className="App">
        <input
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          placeholder="Enter room code"
        />
        <button onClick={joinRoom}>Join Game</button>
      </div>
    )
  }

  // Render main game board with context providers
  return (
    <AppContext.Provider value={{ appState, dispatch, socket, playerColor, roomId }}>
      <div className="App">
        <Board />
        
      </div>
      
    </AppContext.Provider>
  )
}

export default App
