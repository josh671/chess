import './Pieces.css'
import Piece from './Piece'
import { useState, useRef } from 'react'
import { createPosition, copyPosition } from '../Board/helper'
import { useAppContext } from '../Context/Context'
import { makeNewMove, clearCandidates } from '../Reducer/Actions/move'
const Pieces = () => {
    const ref = useRef(); 
    
    const {appState, dispatch} = useAppContext(); 

    const currentPosition = appState.position[appState.position.length-1]



  const calculateCoordinates = e =>{
    const {width, left, top} = ref.current.getBoundingClientRect()
    const size = width / 8; 
    const y = Math.floor((e.clientX - left)/ size); 
    const x = 7 -  Math.floor((e.clientY - top)/ size); 
     
    return {x,y}; 
  }

  const onDrop = e => {
    const newPosition = copyPosition(currentPosition); 
    
    const {x, y} = calculateCoordinates(e);  

    const [p, rank, file] = e.dataTransfer.getData('text').split(','); 

    if(appState.candidateMoves?.find(m =>m[0] === x && m[1] === y)){
      //En-Passant looks like campturing an empty square.
      if(p.endsWith('p') && !newPosition[x][y]  && x !== rank && y !== file){
        newPosition[rank][y] = ''; 
      }
      newPosition[rank][file] = ''; 
      newPosition[x][y] = p; 
      dispatch(makeNewMove({newPosition}))
    }

    dispatch(clearCandidates())

  }

  const onDragOver = e =>{
    e.preventDefault()
  }

  return (
      <div className="pieces" 
      ref={ref}
      onDrop={onDrop}
      onDragOver={onDragOver} 
      
      >
        {currentPosition.map((r, rank) =>
          r.map((f, file) =>
            currentPosition[rank][file] ? (
              <Piece 
                rank={rank} 
                file={file} 
                piece={currentPosition[rank][file]} key={rank+'-'+file} 
              />
            ) : null,
          ),
        )}
      </div>
  )
}

export default Pieces
