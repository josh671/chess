import { useState } from 'react'
import GameBoard from './Components/GameBoard'
import Player from './Components/Player'

function App() {
  const [isActivePlayer, setIsActivePlayer] = useState('X') 
  
  // passes to gameboard which player is active
  function handleSlectedSquare(){
    setIsActivePlayer((currentActivePlayer)=> currentActivePlayer == 'X' ? 'O' : 'X')
  }

  return (
    <>
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name='josh'color="white" isActive={isActivePlayer ==='X'}/>
          <Player name='Ruben' color="black" isActive={isActivePlayer ==='O'}/>
        </ol>
      </div>
    </main>
    <GameBoard onSelectSquare={handleSlectedSquare} activePlayerSymbol={isActivePlayer}/>
    </>
  )
}

export default App
