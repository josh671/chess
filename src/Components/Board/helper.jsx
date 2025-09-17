/**
 * Frontend Chess Board Helper Functions
 * Utilities for board creation, position manipulation, and chess notation
 */

/**
 * Converts a file number to its corresponding chess notation letter
 * @param {number} file - File number (0-7)
 * @returns {string} Chess notation letter ('a'-'h')
 */
export const getCharacter = file => String.fromCharCode(file + 96);

/**
 * Creates the initial chess board position with all pieces in starting positions
 * @returns {Array<Array<string>>} 8x8 array representing the initial chess board
 */
export const createPosition = () => {
    const position = new Array(8).fill('').map(x => new Array(8).fill(''));

    // Add pawns to board
    for (let i = 0; i < 8; i++) {
        position[6][i] = 'bp'; // Black pawns on rank 6
        position[1][i] = 'wp'; // White pawns on rank 1
    }

    // Set up white pieces on rank 0
    position[0][0] = 'wr'; // White rook
    position[0][1] = 'wn'; // White knight
    position[0][2] = 'wb'; // White bishop
    position[0][3] = 'wq'; // White queen
    position[0][4] = 'wk'; // White king
    position[0][5] = 'wb'; // White bishop
    position[0][6] = 'wn'; // White knight
    position[0][7] = 'wr'; // White rook

    // Set up black pieces on rank 7
    position[7][0] = 'br'; // Black rook
    position[7][1] = 'bn'; // Black knight
    position[7][2] = 'bb'; // Black bishop
    position[7][3] = 'bq'; // Black queen
    position[7][4] = 'bk'; // Black king
    position[7][5] = 'bb'; // Black bishop
    position[7][6] = 'bn'; // Black knight
    position[7][7] = 'br'; // Black rook

    return position;
} 
 

/**
 * Creates a deep copy of a chess board position
 * @param {Array<Array<string>>} position - Original 8x8 board position
 * @returns {Array<Array<string>>} New 8x8 board position (deep copy)
 */
export const copyPosition = (position) => {
    const newPosition = new Array(8).fill("").map(x => new Array(8).fill(""));

    for (let rank = 0; rank < position.length; rank++) {
        for (let file = 0; file < position[0].length; file++) {
            newPosition[rank][file] = position[rank][file];
        }
    }
    return newPosition;
}

/**
 * Determines if two board squares are the same color (light or dark)
 * @param {Object} coords1 - First coordinate {x: number, y: number}
 * @param {Object} coords2 - Second coordinate {x: number, y: number}
 * @returns {boolean} True if both squares are the same color
 */
export const areSameColorTiles = (coords1, coords2) =>
  (coords1.x + coords1.y) % 2 === (coords2.x + coords2.y) % 2
 
/**
 * Finds all coordinates of a specific piece type on the board
 * @param {Array<Array<string>>} position - 8x8 board position
 * @param {string} type - Piece type to search for (e.g., 'wk', 'bp')
 * @returns {Array<Object>} Array of coordinates {x: number, y: number}
 */
export const findPieceCoords = (position, type) => {
    let results = [];
    position.forEach((rank, i) => {
        rank.forEach((pos, j) => {
            if (pos === type) {
                results.push({ x: i, y: j });
            }
        })
    })
    return results;
}


/**
 * Generates chess algebraic notation for a move
 * @param {Object} params - Move parameters
 * @param {string} params.piece - The piece being moved (e.g., 'wk', 'bp')
 * @param {number} params.rank - Starting rank position
 * @param {number} params.file - Starting file position
 * @param {number} params.x - Target rank position
 * @param {number} params.y - Target file position
 * @param {Array<Array<string>>} params.position - Current board position
 * @param {string} [params.promotesTo] - Piece type for pawn promotion
 * @returns {string} Algebraic notation string (e.g., 'Nf3', 'O-O', 'exd4')
 */
export const getNewMoveNotation = ({
    piece,
    rank,
    file,
    x,
    y,
    position,
    promotesTo,
}) => {
    let note = "";

    rank = Number(rank);
    file = Number(file);

    // Handle castling moves
    if (piece[1] === "k" && Math.abs(file - y) === 2) {
        if (file < y) return "O-O";    // Kingside castling
        else return "O-O-O";          // Queenside castling
    }

    // Handle non-pawn pieces
    if (piece[1] !== "p") {
        note += piece[1].toUpperCase();
        if (position[x][y]) {
            note += "x"; // Capture notation
        }
    }
    // Handle pawn captures
    else if (rank !== x && file !== y) {
        note += getCharacter(file + 1) + "x";
    }

    // Add destination square
    note += getCharacter(y + 1) + (x + 1);

    // Add promotion notation
    if (promotesTo) note += "=" + promotesTo.toUpperCase();

    return note;
};