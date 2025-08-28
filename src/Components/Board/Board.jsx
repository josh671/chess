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
import { useSocket } from '../Context/SocketContenxt.jsx'
import { updateCastling } from '../Reducer/Actions/game.jsx'

const Board = () => {
  const socket = useSocket()
  const { appState, dispatch } = useAppContext()
  const position = appState.position[appState.position.length - 1]

  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i)
  const files = Array(8)
    .fill()
    .map((x, i) => i + 1)



  // ✅ Step 4: WebSocket Connection + Handlers
  useEffect(() => {
    if (!socket) return

    const handleConnect = () => {
      console.log('✅ Socket connected:', socket.id)
      socket.emit('joinRoom', 'room1')
      console.log('📤 joinRoom emitted')
    }

    const handleMoveResult = ({ newPosition, turn }) => {
      console.log('Received updated board:', newPosition)
      console.log('Current turn:', turn)
      // Dispatch your action to update app state
      dispatch({ type: 'NEW_MOVE', payload: { newPosition, turn } })
    }

    if (socket.connected) {
      handleConnect() // already connected
    }

    socket.on('connect', handleConnect)
    socket.on('moveResult', handleMoveResult)

    return () => {
      socket.off('connect', handleConnect)
    }
  }, [socket, dispatch])


  
  const isChecked = (() => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      player: appState.turn,
    })
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
