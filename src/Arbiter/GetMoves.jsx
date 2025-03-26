//Logic for all the pieces and their movements

export const getRookMoves = ({ position, piece, rank, file }) => {
  const moves  = []; 
  const us = piece[0];
  const enemy = us === 'w' ? 'b' : 'w' 

  const direction = [
      [-1, 0], 
      [ 1, 0], 
      [0 , 1], 
      [0, -1]
  ]

  direction.forEach(dir =>{
      for(let i = 1; i < 8; i++){
          const x = rank + (i*dir[0]) 
          const y = file + (i*dir[1]) 
          if(position?.[x]?.[y] === undefined) 
              break; 
          if(position[x][y].startsWith(enemy)){
              moves.push([x,y])
              break;
          }
          if(position[x][y].startsWith(us))
              break; 

          moves.push([x,y])
      }
     
  })
  
  return moves; 
} 


export const getKngihtMoves = ({position, rank, file}) =>{
    const moves = []; 
    const enemy = position[rank][file].startsWith('w')?'b':'w'; 

    const candidates = [
        [2,1],
        [2,-1], 
        [-2,1],
        [-2,-1], 
        [-1,2], 
        [-1,-2], 
        [1,2],
        [1,-2]
    ]
    //checks each candidate is a valid move and if so pushes to moves array. 
    candidates.forEach(c =>{
        const cell = position?.[rank+c[0]]?.[file+c[1]] 
        if(cell != undefined && (cell.startsWith(enemy) || cell === '')){
            moves.push([rank+c[0],file+c[1]])
        }

    })
    
    return moves; 
} 

export const getBishopMoves = ({position, piece, rank, file}) =>{
    const moves = []; 
    const us = piece[0]; 
    const enemy = us === 'w' ? 'b' : 'w'; 
    const candidates = [
        [1, 1], 
        [1, -1],
        [-1, 1], 
        [-1, -1]
    ]

    candidates.forEach(c =>{
        for(let i = 1; i < 8; i++){
            const x = rank + (i*c[0]);
            const y = file + (i*c[1]); 

            if(position?.[x]?.[y] === undefined)
                break; 
            if(position[x][y].startsWith(enemy)){
                moves.push([x,y]); 
                break;
            }
                 
            if(position[x][y].startsWith(us))
                break; 

            moves.push([x,y])
        }
    })
      return moves; 
} 

export const getQueenMoves = ({position, piece, rank, file}) =>{
    const moves = []; 
    const rookMoves = getRookMoves({position, piece, rank, file});
    const bishopMoves = getBishopMoves({position, piece, rank, file});  
    return [...rookMoves, ...bishopMoves]; 
} 