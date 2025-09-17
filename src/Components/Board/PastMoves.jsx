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





    return(
        <>
        <div className='pastMoves'>
            {pastMovesArray.map((acc, index) => (
                <p key={index}>{acc.currentMoveNotation}</p>
            ))}
        </div>
        </>
    )
} 

export default PastMoves; 