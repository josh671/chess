import './Pieces.css'
import Piece from './Piece'
import { useRef } from 'react'
import { useAppContext } from '../Context/Context'
import {   openPromotion } from '../Reducer/Actions/popup'
import { clearCandidates } from '../Reducer/Actions/move'
import { getCastlingDirections } from '../../Arbiter/GetMoves'
import { useSocket } from '../Context/SocketContenxt'
import { updateCastling, detectStalemate, detectInsufficientMaterial, detectCheckMate } from '../Reducer/Actions/game'

const Pieces = () => {
  const ref = useRef()
  const socket = useSocket()
  const { appState, dispatch } = useAppContext()
  const currentPosition = appState.position[appState.position.length - 1]

  const calculateCoordinates = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect()
    const size = width / 8
    const y = Math.floor((e.clientX - left) / size)
    const x = 7 - Math.floor((e.clientY - top) / size)
    return { x, y }
  }
  // STILL PROBLEMS WITH CASTLING 
  const move = (e) => {
    const { x, y } = calculateCoordinates(e)
    const [piece, rank, file] = e.dataTransfer.getData('text').split(',')

    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      const opponent = piece.startsWith('b') ? 'w' : 'b'

   const handleCastleUpdate = (direction)=>{
    console.log('castle direction', direction.action); 
    
      if(direction)
        dispatch(updateCastling(direction));
   }

   const openPromotionBox = (promotionInfo) =>{
    console.log("Promotion info", promotionInfo);
    if(!promotionInfo) return
     
    dispatch(promotionInfo.action); 
   }


    console.log(appState)
      if (!socket) return

      
      // ⬇️ Castling Handler
  if(piece.endsWith('k') || piece.endsWith('r')){
    console.log("sending castling update"); 
      socket.emit('castlingUpdate', {
        roomId: 'room1', 
        castleDirection: appState.castleDirection, 
        piece, 
        rank,
        file
      })
  }
    

      
     
      // Promotion Handler 
      socket.emit('makePromotion', {
        roomId: 'room1', 
        piece, 
        rank, 
        file, 
        x, 
        y 

      })


      // Move Handler
      socket.emit('makeMove', {
        roomId: 'room1',
        currentPosition,
        piece,
        rank,
        file,
        x,
        y,
        candidateMoves: appState.candidateMoves,
        
      }) 

      
      socket.on("castlingUpdate", handleCastleUpdate); 
      socket.on("openPromotionBox", openPromotionBox); 
       
    }
 console.log("new appState", appState)
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
          ) : null
        )
      )}
    </div>
  )
}

export default Pieces
