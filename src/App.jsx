
import Player from './Components/Player'

function App() {
  
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name='josh'color="white"/>
          <Player name='Ruben' color="black"/>
        </ol>
      </div>
    </main>
  )
}

export default App
