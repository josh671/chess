//Arbitor controller that will contain methods from GetMoves file
import {getKngihtMoves, getRookMoves, getBishopMoves} from './GetMoves'

export const arbiter = {
    getRegularMoves : function({position, piece, rank, file}){
        if(piece.endsWith('r'))
            return getRookMoves({position, piece, rank, file})
        if(piece.endsWith('n'))
            return getKngihtMoves({position, rank, file})
        if(piece.endsWith('b'))
            return getBishopMoves({position, piece, rank, file})
    }
}

 