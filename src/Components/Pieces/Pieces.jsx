import './Pieces.css'
import { useEffect } from 'react'
import Piece from './Piece'
import { useRef } from 'react'
import { useAppContext } from '../Context/Context'
import { clearCandidates } from '../Reducer/Actions/move'
 

const Pieces = () => {
  const ref = useRef()
  const { appState, dispatch, socket, playerColor, roomId } = useAppContext()
  const currentPosition = appState.position[appState.position.length - 1]

  useEffect(() =>{
    

      const handleCastleUpdate = (direction) => {
        console.log('castle direction', direction)

        if (direction) dispatch(direction)
      }

      const openPromotionBox = (promotionInfo) => {
        console.log('Promotion info', promotionInfo)
        if (!promotionInfo) return

        dispatch(promotionInfo.action)
        return;
      }

      const isCheckmateHandler = (isCheckmate) =>{
        // dispatch(detectCheckMate(isCheckmate[0]))
        console.log('isCheckmateHandler', isCheckmate); 
        dispatch(isCheckmate); 
        
      }


      socket.on('castlingUpdate', handleCastleUpdate)
      socket.on('openPromotionBox', openPromotionBox)
      socket.on('isCheckMate', isCheckmateHandler); 

  },[socket, dispatch])

  const calculateCoordinates = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect()
    const size = width / 8
    const y = Math.floor((e.clientX - left) / size)
    const x = 7 - Math.floor((e.clientY - top) / size)
    return { x, y }
  }
  //Need to add insufficientMaterial
  //Need to add isStalem
  //Need to add isCheckMate


  const move = (e) => {
    const { x, y } = calculateCoordinates(e)
    const [piece, rank, file] = e.dataTransfer.getData('text').split(',')
    console.log('piece', piece[0], 'player Color', playerColor)
   
    if (piece[0] !== playerColor) return

    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      const opponent = piece.startsWith('b') ? 'w' : 'b'



 

      console.log(appState)
      if (!socket) return

      // ⬇️ Castling Handler
      if (piece.endsWith('k') || piece.endsWith('r')) {
        console.log('sending castling update')
        socket.emit('castlingUpdate', {
          roomId,
          castleDirection: appState.castleDirection,
          piece,
          rank,
          file,
        })
      }

      // Move Handler
      socket.emit('makeMove', {
        type: 'MAKE_MOVE',
        roomId,
        currentPosition,
        piece,
        rank,
        file,
        x,
        y,
        candidateMoves: appState.candidateMoves,
        castleDirection: appState.castleDirection, 
        opponent
      })

      
    }
    console.log('new appState', appState)
    dispatch(clearCandidates())
  }

  const onDrop = (e) => {
    e.preventDefault()
    move(e)
  }

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
