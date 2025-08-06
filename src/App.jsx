import Board from './Components/Board/Board'
import AppContext from './Components/Context/Context'
import { reducer } from './Components/Reducer/reducer'
import { useReducer } from 'react'
import {initGameState} from './Constants'; 
import { SocketProvider } from './Components/Context/SocketContenxt';
function App() {

  const [appState, dispatch ] = useReducer(reducer, initGameState)
  const providerState = {
    appState, 
    dispatch
  }

  return (
    <SocketProvider> 
    <AppContext.Provider value={ providerState }>
      <div className="App">
        <Board />
      </div>
    </AppContext.Provider>
    </SocketProvider>
  )
}

export default App
