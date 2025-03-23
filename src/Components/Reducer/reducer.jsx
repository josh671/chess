import actionTypes from "./Actions/actionTypes"

export const reducer = (state, action)=>{
    switch(action.type){
        case actionTypes.NEW_MOVE: {
            let {turn, position} = state
            position = [
                ...position, 
                action.payload.newPosition
            ]

            turn = turn ==='w' ? 'b' : 'w' 

            return {
                ...state, 
                turn,
                position
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES : {
            return {
                ...state, 
                candidateMoves : action.payload.candidateMoves
            }
        }

        case actionTypes.CLEAR_CADIDATE_MOVES : {
            return {
                ...state, 
                candidateMoves : []
            }
        }

        default:
            return state
    }


}