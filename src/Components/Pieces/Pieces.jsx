import './Pieces.css'
import Piece from './Piece'
import { useState, useRef } from 'react'
import { createPosition, copyPosition } from '../Board/helper'
const Pieces = () => {
    const ref = useRef(); 
    
  // sets current position of pieces
  const [state, setState] = useState(createPosition());


  const calculateCoordinates = e =>{
    const {width, left, top} = ref.current.getBoundingClientRect()
    const size = width / 8; 
    const y = Math.floor((e.clientX - left)/ size); 
    const x = 7 -  Math.floor((e.clientY - top)/ size); 
     
    return {x,y}; 
  }

  const onDrop = e => {
    const newPosition = copyPosition(state); 
    
    const {x, y} = calculateCoordinates(e);  

    const [piece, rank, file] = e.dataTransfer.getData('text').split(','); 

    newPosition[rank][file] = ''; 
    newPosition[x][y] = piece; 

    setState(newPosition); 
 
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
        {state.map((r, rank) =>
          r.map((f, file) =>
            state[rank][file] ? (
              <Piece rank={rank} file={file} piece={state[rank][file]} key={rank+'-'+file} />
            ) : null,
          ),
        )}
      </div>
  )
}

export default Pieces
