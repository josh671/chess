import Board from './Components/Board/Board'
import AppContext from './Components/Context/Context'
import { reducer } from './Components/Reducer/reducer'
import { useReducer } from 'react'
import {initGameState} from './Constants'; 
import {  useSocket } from './Components/Context/SocketContenxt';
import {useState, useEffect, useCallback} from 'react'
function App() {

  const [appState, dispatch ] = useReducer(reducer, initGameState)
  

  const socket = useSocket(); 
  const [roomId, setRoomId] = useState(''); 
  const [joined, setJoined] = useState(false); 
  const [playerColor, setPlayerColor] = useState(''); 
   

  //Join room handler 
  const joinRoom = () =>{
    if(socket && roomId){
      socket.emit('joinRoom', roomId); 
      
    }
    console.log('joined room', roomId);
  }
  
  // Set Player Color - memoized to prevent useEffect re-runs
  const handlePlayerColor = useCallback(({color}) => {
    console.log('app playerColor', color);
    setPlayerColor(color); 
    setJoined(true); 
  }, []);

  const handleBoardSetup = useCallback((newBoard) => {
    console.log(newBoard); 
    dispatch(newBoard);
  }, [dispatch]);

  const handlePromotionStatus = useCallback((statusUpdate) => {
    console.log('Promotion status update:', statusUpdate);
    dispatch(statusUpdate);
  }, [dispatch]);
  useEffect(() => {
    if (!socket) return; 

    const handleRoomFull = () => {
      alert('Room is full!'); 
      setJoined(false); 
    };

    // Add event listeners
    socket.on('board', handleBoardSetup);
    socket.on('playerColor', handlePlayerColor);
    socket.on('roomFull', handleRoomFull);
    socket.on('promotionStatus', handlePromotionStatus);
    
    console.log('Socket connected, current playerColor:', playerColor);

    // Cleanup function
    return () => {
      socket.off('board', handleBoardSetup);
      socket.off('playerColor', handlePlayerColor);
      socket.off('roomFull', handleRoomFull);
      socket.off('promotionStatus', handlePromotionStatus);
    };
  }, [socket, handleBoardSetup, handlePlayerColor, playerColor, handlePromotionStatus]);

 
  if (!joined) {
    return (
      <div className="App">
        <input value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="Enter room code" />
        <button onClick={joinRoom}>Join Game</button>
      </div>
    )
  }

  return (
   
    <AppContext.Provider value={ { appState, dispatch, socket,playerColor, roomId } }>
      <div className="App">
        <Board />
      </div>
    </AppContext.Provider>
    
  )
}

export default App
