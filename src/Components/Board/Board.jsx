import './Board.css'
import Ranks from './bits/Ranks.jsx'
import Files from './bits/Files.jsx'
import Pieces from '../Pieces/Pieces.jsx'
import { useAppContext } from '../Context/Context.jsx'
import Popup from '../Popup/Popup.jsx'
import PromotionBox from '../Popup/PromotionBox/PromotionBox.jsx'
import GameEnds from '../Popup/GameEnds/GameEnds.jsx'
import { useEffect, useCallback } from 'react'
import { DEFAULT_BOARD_COORDINATES } from '../../Constants.js'


const Board = () => {
   
  const { appState, dispatch, socket, playerColor, roomId} = useAppContext()
  const position = appState.position[appState.position.length - 1]

  // Use coordinates from server, fallback to default constants if not available
  const ranks = appState.boardCoordinates?.ranks || DEFAULT_BOARD_COORDINATES.ranks
  const files = appState.boardCoordinates?.files || DEFAULT_BOARD_COORDINATES.files



  // Memoize the move result handler to prevent unnecessary re-renders
  const handleMoveResult = useCallback(({ newPosition, turn }) => {
    dispatch({ type: 'NEW_MOVE', payload: { newPosition, turn } });
    console.log('New position received from server:', newPosition, turn);
  }, [dispatch]);

  // Handle check status updates from server
  const handleCheckStatus = useCallback((checkStatus) => {
    dispatch({ type: 'UPDATE_CHECK_STATUS', payload: checkStatus });
    console.log('Check status received from server:', checkStatus);
  }, [dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on('moveResult', handleMoveResult);
    socket.on('checkStatus', handleCheckStatus);
    
    return () => {
      socket.off('moveResult', handleMoveResult);
      socket.off('checkStatus', handleCheckStatus);
    };
  }, [socket, handleMoveResult, handleCheckStatus]);

  // Get check status from server-provided data - highlight any king in check
  const getCheckedKingPositions = () => {
    if (!appState.checkStatus) return [];
    
    const checkedPositions = [];
    
    // Check if white king is in check
    if (appState.checkStatus.white?.isInCheck) {
      checkedPositions.push(appState.checkStatus.white.kingPosition);
    }
    
    // Check if black king is in check
    if (appState.checkStatus.black?.isInCheck) {
      checkedPositions.push(appState.checkStatus.black.kingPosition);
    }
    
    return checkedPositions;
  }
  
  const checkedKingPositions = getCheckedKingPositions();

  const getClassName = (i, j) => {
    let c = 'tile'
    c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light'

    if (appState.candidateMoves?.find((m) => m[0] === i && m[1] === j)) {
      c += position[i][j] ? ' attacking' : ' highlight'
    }
    
    // Check if this position contains a king in check
    if (checkedKingPositions.some(pos => pos && pos[0] === i && pos[1] === j)) {
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
