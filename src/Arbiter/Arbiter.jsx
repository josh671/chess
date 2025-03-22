//Arbitor controller that will contain methods from GetMoves file
import {getRookMoves} from './GetMoves'

export const arbiter = {
    getRegularMoves : function({position, piece, rank, file}){
        return getRookMoves({position, piece, rank, file}); 
    }
}

 