import './GameEnds.css'
import { Status } from '../../../Constants.js'
import { useAppContext } from '../../Context/Context.jsx'
import { setupNewGame } from '../../Reducer/Actions/game.jsx'
import { closePopup } from '../../Reducer/Actions/popup.jsx' 
import React, { useEffect } from 'react'
const GameEnds = ({ onClosePopup }) => {
    const {
    appState: { status },
    dispatch,
    socket,
    roomId,
  } = useAppContext()

  useEffect(() =>{
     const newGameSetup = (newGame) => {
      console.log('New game state received from server in GameEnds:', newGame)
      dispatch(setupNewGame(newGame.payload))
    }

    socket.on('newGame', newGameSetup)
  },[socket, dispatch])
  

  if (status === Status.ongoing || status === Status.promoting) return null

  const newGame = () => {
    console.log('clicked')

    socket.emit('setUpNewGame', { roomId })

   
  } 
  
   

  const isWin = status.endsWith('wins')

  return (
    <div className="popup--inner popup--inner__center">
      <h1>{isWin ? status : 'Draw'}</h1>
      <p>{!isWin && status}</p>
      <div className={`${status}`} />
      <button onClick={newGame}>New Game</button>
    </div>
  )
}

export default GameEnds
