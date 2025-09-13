import './Pieces.css'
import { useEffect, useRef, useCallback } from 'react'
import Piece from './Piece'
import { useAppContext } from '../Context/Context'
import { clearCandidates } from '../Reducer/Actions/move'

// Constants
const BOARD_SIZE = 8
const LAST_RANK = 7

/**
 * Container component that manages all chess pieces and handles drag/drop interactions
 * @returns {JSX.Element} Pieces container with all chess pieces
 */
const Pieces = () => {
  const ref = useRef()
  const { appState, dispatch, socket, playerColor, roomId } = useAppContext()
  const currentPosition = appState.position[appState.position.length - 1]

  // Memoize event handlers to prevent unnecessary re-renders
  const handleCastleUpdate = useCallback((direction) => {
    console.log('castle direction', direction);
    if (direction) dispatch(direction);
  }, [dispatch]);

  const openPromotionBox = useCallback((promotionInfo) => {
    console.log('Promotion info', promotionInfo);
    if (!promotionInfo) return;
    dispatch(promotionInfo.action);
  }, [dispatch]);

  const handleInsufficientMaterial = useCallback((insufficientMaterial) => {
    dispatch(insufficientMaterial);
  }, [dispatch]);

  const isCheckmateHandler = useCallback((isCheckmate) => {
    console.log('isCheckmateHandler', isCheckmate); 
    dispatch(isCheckmate); 
  }, [dispatch]);


  useEffect(() => {
    if (!socket) return;

    // Add event listeners
    socket.on('insufficientMaterial', handleInsufficientMaterial);
    socket.on('castlingUpdate', handleCastleUpdate);
    socket.on('openPromotionBox', openPromotionBox);
    socket.on('isCheckMate', isCheckmateHandler); 

    return () => {
      socket.off('insufficientMaterial', handleInsufficientMaterial);
      socket.off('castlingUpdate', handleCastleUpdate);
      socket.off('openPromotionBox', openPromotionBox);
      socket.off('isCheckMate', isCheckmateHandler);
    };
  }, [socket, handleCastleUpdate, openPromotionBox, handleInsufficientMaterial, isCheckmateHandler]);

  /**
   * Converts mouse coordinates to chess board coordinates
   * @param {MouseEvent} e - Mouse event containing clientX and clientY
   * @returns {Object} Chess coordinates {x: rank, y: file}
   */
  const calculateCoordinates = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect()
    const size = width / BOARD_SIZE
    const y = Math.floor((e.clientX - left) / size)
    const x = LAST_RANK - Math.floor((e.clientY - top) / size)
    return { x, y }
  }


  /**
   * Handles piece movement from drag and drop operations
   * @param {DragEvent} e - Drop event containing piece data and target coordinates
   */
  const move = (e) => {
    const { x, y } = calculateCoordinates(e)
    const dragData = e.dataTransfer.getData('text')
    
    // Validate drag data
    if (!dragData) {
      console.warn('No drag data found');
      dispatch(clearCandidates());
      return;
    }
    
    const [piece, rank, file] = dragData.split(',')
    
    // Validate piece data
    if (!piece || rank === undefined || file === undefined) {
      console.warn('Invalid piece data:', { piece, rank, file });
      dispatch(clearCandidates());
      return;
    }
    
    console.log('Moving piece:', piece[0], 'Player color:', playerColor)
   
    // Only allow moves for current player
    if (piece[0] !== playerColor) {
      console.warn('Not your piece!');
      dispatch(clearCandidates());
      return;
    }
    
    // Only allow moves during player's turn
    if (appState.turn !== playerColor) {
      console.warn('Not your turn!');
      dispatch(clearCandidates());
      return;
    }

    // Block moves if someone is promoting
    if (appState.isPromoting) {
      console.warn('Cannot move during promotion!');
      dispatch(clearCandidates());
      return;
    }

    // Check if move is valid (in candidate moves)
    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      const opponent = piece.startsWith('b') ? 'w' : 'b'

      if (!socket) {
        console.warn('No socket connection available');
        dispatch(clearCandidates());
        return;
      }

      // Send move to backend (backend handles all logic including castling)
      socket.emit('makeMove', {
        type: 'MAKE_MOVE',
        roomId,
        currentPosition,
        piece,
        rank: parseInt(rank),
        file: parseInt(file),
        x,
        y,
        candidateMoves: appState.candidateMoves,
        castleDirection: appState.castleDirection, 
        opponent
      })
    }
    
    // Clear candidate moves after any drop attempt
    dispatch(clearCandidates())
  }

  /**
   * Handles drop events on the chess board
   * @param {DragEvent} e - Drop event
   */
  const onDrop = (e) => {
    e.preventDefault()
    move(e)
  }

  /**
   * Handles drag over events (required for drop to work)
   * @param {DragEvent} e - Drag over event
   */
  const onDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="pieces" ref={ref} onDrop={onDrop} onDragOver={onDragOver}>
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
          currentPosition[rank][file] ? (
            <Piece
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
              key={rank + '-' + file}
            />
          ) : null,
        ),
      )}
    </div>
  )
}

export default Pieces
