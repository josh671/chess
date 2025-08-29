import Board from './Components/Board/Board'
import AppContext from './Components/Context/Context'
import { reducer } from './Components/Reducer/reducer'
import { useReducer } from 'react'
import {initGameState} from './Constants'; 
import {  useSocket } from './Components/Context/SocketContenxt';
import {useState, useEffect} from 'react'
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
  
  //Set Player Color 
  const handlePlayerColor = ({color})=>{
    console.log('app playerColor', color);



    setPlayerColor(color); 
    setJoined(true); 
  }

  useEffect(() =>{
    console.log('socket', socket);
    if(!socket) return; 


    socket.on('playerColor', handlePlayerColor)
    console.log('color', playerColor);

    socket.on('roomFull', () => {
      alert('room is full!'); 
      setJoined(false); 
    })
   return () => {
    socket.off('playerColor', handlePlayerColor);
    socket.off('roomFull');
  };

  },[socket])

 
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
