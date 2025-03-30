//Arbitor controller that will contain methods from GetMoves file
import {getKngihtMoves, getRookMoves, getBishopMoves, getQueenMoves, getKingMoves} from './GetMoves'

export const arbiter = {
    getRegularMoves : function({position, piece, rank, file}){
        if(piece.endsWith('r'))
            return getRookMoves({position, piece, rank, file})
        if(piece.endsWith('n'))
            return getKngihtMoves({position, rank, file})
        if(piece.endsWith('b'))
            return getBishopMoves({position, piece, rank, file})
        if(piece.endsWith('q'))
            return getQueenMoves({position, piece, rank, file}) 
        if(piece.endsWith('k'))
            return getKingMoves({position, piece, rank, file})
    }
}

 