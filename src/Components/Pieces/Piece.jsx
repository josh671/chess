import { useAppContext } from "../Context/Context";
import { generateCandidateMoves } from "../Reducer/Actions/move";
import { useEffect } from "react";

/**
 * Individual chess piece component that handles drag and drop interactions
 * @param {Object} props - Component props
 * @param {string} props.piece - Piece identifier (e.g., 'wk', 'bp', 'wr')
 * @param {number} props.rank - Piece's rank (row) position (0-7)
 * @param {number} props.file - Piece's file (column) position (0-7)
 * @returns {JSX.Element} Draggable piece element
 */
const Piece = ({piece, rank, file}) =>{
   
    const { appState, dispatch, socket, playerColor } = useAppContext();
    const { turn, castleDirection, position : currentPosition } = appState
    
    // Determine if this piece can be moved by current player
    const isPlayerPiece = piece[0] === playerColor;
    const isPlayerTurn = turn === playerColor;
    const canDrag = isPlayerPiece && isPlayerTurn && !appState.isPromoting;
     
    /**
     * Handles the start of a drag operation
     * @param {DragEvent} e - Drag event object
     */
    const onDragStart = e =>{
        // Prevent drag if not player's piece or not player's turn
        if (!canDrag) {
            e.preventDefault();
            return;
        }
        
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain",`${piece},${rank},${file}`);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
 
        if (socket) {
            // Request valid moves from backend
            socket.emit('getValidMoves', {
                position: currentPosition[currentPosition.length - 1],
                castleDirection: castleDirection[turn],
                piece,
                rank,
                file
            });
        }
    }

    /**
     * Handles the end of a drag operation (restores piece visibility)
     * @param {DragEvent} e - Drag event object
     */
    const onDragEnd = e =>{
         e.target.style.display='block'
    }

    // Listen for valid moves from backend
    useEffect(() => {
        if (!socket) return;

        const handleValidMoves = (moveData) => {
            // Only process if this is for the current piece being dragged
            if (moveData.piece === piece && 
                moveData.rank === rank && 
                moveData.file === file) {
                dispatch(generateCandidateMoves({candidateMoves: moveData.validMoves}));
            }
        };

        socket.on('validMoves', handleValidMoves);
        
        return () => {
            socket.off('validMoves', handleValidMoves);
        };
    }, [socket, piece, rank, file, dispatch]);

    return (
        <>
            <div 
                className={`piece ${piece} p-${file}${rank} ${!canDrag ? 'piece--disabled' : ''}`} 
                draggable={canDrag}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                style={{
                    cursor: canDrag ? 'grab' : 'not-allowed',
                   
                }}
            />
        </>
    )
}

export default Piece; 