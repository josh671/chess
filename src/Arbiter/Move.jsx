import { copyPosition } from "../Components/Board/helper";

export const movePiece = ({position, piece, rank, file, x, y}) =>{
    const newPosition = copyPosition(position); 
    newPosition[rank][file] = ''; 
    newPosition[x][y] = piece; 

    return newPosition;
}

export const movePawn = ({position, prevPosition, piece, rank, file,x, y }) =>{
    const newPosition = copyPosition(position); 
   if(!newPosition[x][y] && x !== rank && y !== file){
        newPosition[rank][y] = ''; 
        newPosition[x][y] = piece; 

        return newPosition; 
   }
}