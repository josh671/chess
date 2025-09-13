import actionTypes from "./Actions/actionTypes"
import { Status } from "../../Constants"

export const reducer = (state, action) => {
    console.log('Reducer action:', action);
    console.log('Reducer state:', state);
    
    switch (action.type) {
        // ========================================
        // UI STATE MANAGEMENT (Frontend Only)
        // ========================================
        
        case actionTypes.GENERATE_CANDIDATE_MOVES: {
            return {
                ...state, 
                candidateMoves: action.payload.candidateMoves
            }
        }

        case actionTypes.CLEAR_CANDIDATE_MOVES: {
            return {
                ...state, 
                candidateMoves: []
            }
        }

        case actionTypes.PROMOTION_OPEN: {
            return {
                ...state, 
                status: Status.promoting, 
                promotionSquare: {...action.payload} 
            }
        }

        case actionTypes.PROMOTION_CLOSE: {
            return {
                ...state, 
                status: Status.ongoing,
                promotionSquare: null,
                isPromoting: false,
                promotingPlayer: null
            }
        }

        case 'SET_PROMOTION_STATUS': {
            return {
                ...state,
                isPromoting: action.payload.isPromoting,
                promotingPlayer: action.payload.promotingPlayer
            }
        }

        // ========================================
        // SERVER DATA UPDATES (Receiving from Backend)
        // ========================================
        
        case actionTypes.NEW_MOVE: {
            return {
                ...state,
                position: [
                    ...state.position,
                    action.payload.newPosition
                ],
                turn: action.payload.turn
            }
        }

        case actionTypes.NEW_GAME: {
            return {
                ...action.payload
            }
        }

        case 'UPDATE_CHECK_STATUS': {
            return {
                ...state,
                checkStatus: action.payload
            }
        }

        // ========================================
        // BACKEND-DETERMINED GAME STATUS (Receiving Only)
        // ========================================
        
        case actionTypes.CAN_CASTLE: {
            return {
                ...state,
                castleDirection: {
                    ...state.castleDirection,
                    [action.payload.player]: action.payload.direction
                }
            }
        }

        case actionTypes.STALEMATE: {
            return {
                ...state, 
                status: Status.stalemate
            }
        }

        case actionTypes.INSUFFICIENT_MATERIAL: {
            return {
                ...state, 
                status: Status.insufficient
            }
        }   

        case actionTypes.WIN: {
            return {
                ...state, 
                status: action.payload === 'w' ? Status.white : Status.black
            }
        }

        default: 
            return state
    }
}