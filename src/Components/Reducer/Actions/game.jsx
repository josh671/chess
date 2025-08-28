import { initGameState } from "../../../Constants"
import actionTypes from "./actionTypes" 

export const updateCastling = (direction) => {
    console.log("Game Updating castling direction",direction.action.payload); 
    return {
        type: actionTypes.CAN_CASTLE,
        payload: direction.action,
    }
}

export const detectStalemate = () => {
    return {
        type: actionTypes.STALEMATE,
        
    }
}

export const detectCheckMate = (winner) => {
    return {
        type: actionTypes.WIN,
        payload: winner,
        
    }
}

export const setupNewGame = () => {
    return {
        type: actionTypes.NEW_GAME,
        payload : initGameState
    }
}

export const detectInsufficientMaterial = () => {
    return {
        type : actionTypes.INSUFFICIENT_MATERIAL,
        
    }


}