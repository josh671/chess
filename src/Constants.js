import { createPosition } from "./Components/Board/helper";

export const initGameState = {
    position: [createPosition()], 
    turn:'w',
    candidateMoves :  []
}