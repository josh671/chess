import Board from './Components/Board/Board'
import AppContext from './Components/Context/Context'
import { reducer } from './Components/Reducer/reducer'
import { useReducer } from 'react'
import {initGameState} from './Constants'; 
function App() {

  const [appState, dispatch ] = useReducer(reducer, initGameState)
  const providerState = {
    appState, 
    dispatch
  }

  return (
    <AppContext.Provider value={ providerState }>
      <div className="App">
        <Board />
      </div>
    </AppContext.Provider>
  )
}

export default App
