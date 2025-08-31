import './Board.css'
import Ranks from './bits/Ranks.jsx'
import Files from './bits/Files.jsx'
import Pieces from '../Pieces/Pieces.jsx'
import { useAppContext } from '../Context/Context.jsx'
import Popup from '../Popup/Popup.jsx'
import PromotionBox from '../Popup/PromotionBox/PromotionBox.jsx'
import { arbiter } from '../../Arbiter/Arbiter.jsx'
import { getKingPosition } from '../../Arbiter/GetMoves.jsx'
import GameEnds from '../Popup/GameEnds/GameEnds.jsx'
import { useEffect } from 'react'


const Board = () => {
   
  const { appState, dispatch, socket, playerColor, roomId} = useAppContext()
  const position = appState.position[appState.position.length - 1]

  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i)
  const files = Array(8)
    .fill()
    .map((x, i) => i + 1)



  useEffect(() => {
    if (!socket) return
    

    const handleMoveResult = ({ newPosition, turn }) => {
      // Dispatch your action to update app state
      dispatch({ type: 'NEW_MOVE', payload: { newPosition, turn } }) 

      console.log('New position received from server:', newPosition, turn)
    }
     
      socket.on('moveResult', handleMoveResult)
      return () => socket.off('moveResult', handleMoveResult); 

  }, [socket, dispatch])


  //Need to emit this to back end 
  const isChecked = (() => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      player: appState.turn,
    })
    console.log('isInCheck', isInCheck)
    if (isInCheck) {
      return getKingPosition(position, appState.turn)
    }
    return null
  })()

  const getClassName = (i, j) => {
    let c = 'tile'
    c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light'

    if (appState.candidateMoves?.find((m) => m[0] === i && m[1] === j)) {
      c += position[i][j] ? ' attacking' : ' highlight'
    }
    if (isChecked && isChecked[0] === i && isChecked[1] === j) {
      c += ' checked'
    }
    return c
  }
console.log('board appstate', appState)
  return (
    <div className="board">
      <Ranks ranks={ranks} />
      <div className="tiles">
        {ranks.map((rank, i) =>
          files.map((file, j) => (
            <div
              key={file + '-' + rank}
              j={j}
              i={i}
              className={`${getClassName(7 - i, j)}`}
            ></div>
          )),
        )}
      </div>
      <Pieces />
      <Popup>
        <PromotionBox />
        <GameEnds />
      </Popup>
      <Files files={files} />
    </div>
  )
}

export default Board
