import './GameEnds.css';
import {Status} from '../../../Constants.js';
import { useAppContext } from '../../Context/Context.jsx';
import { setupNewGame } from '../../Reducer/Actions/game.jsx';
const GameEnds = ({onClosePopup}) => {

    const { appState : {status} , dispatch } = useAppContext();
         
    if (status === Status.ongoing || status === Status.promoting)
        return null

    const newGame = () => {
        console.log('clicked'); 
        dispatch(setupNewGame())
         
    }

    const isWin = status.endsWith('wins')

    return <div className="popup--inner popup--inner__center">
        <h1>{isWin ? status : 'Draw'}</h1>
        <p>{!isWin && status}</p>
        <div className={`${status}`}/>
        <button onClick={newGame}>New Game</button>
    </div>
   
}

export default GameEnds