import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { useAppContext } from "../Context/Context";
const PastMoves = () =>{

    const { socket } = useAppContext()
    const [pastMovesArray, setPastMovesArray] = useState([]); 

    const pastMoveHandler = useCallback((pastMoves) => {
        console.log(pastMoves)
        setPastMovesArray(prev => [...prev, pastMoves]);
    }, [])

    useEffect(() =>{


        socket.on('pastMoves', pastMoveHandler) 


        return ()=>{
            socket.off('pastMoves', pastMoveHandler)
        }
    },[socket, pastMoveHandler])

    const pastMovesStyleHandler = (index) =>{
        return index % 2 === 0 ? 'current_displayed_move_light' : 'current_displayed_moave_dark'; 
    }

 
    console.log('pastMovesArray', pastMovesArray.length); 
    return(
        <>
        <div className='pastMoves'> 
        <div className='movesList'>
            {pastMovesArray.map((acc, index) => (
                <p className={pastMovesStyleHandler(index) } key={index}>{acc.currentMoveNotation}</p>
            ))}
        </div>
        </div> 
        </>
    )
} 

export default PastMoves; 