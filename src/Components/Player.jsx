import { useState } from "react"

export default function Player ({name, color, isActive}){ 
   const [isEditing, setIsEditing] = useState(false); 
   const [playerName, setPlayerName] = useState(name); 

   
    function editClickHandler(){
        setIsEditing((editing)=>!editing) 
    }
    
    function nameInputChangeHandler(event){
         setPlayerName(event.target.value)
    }
    let editablePlayerName = (<span className="player-name">{playerName}</span>)

    if(isEditing){
        editablePlayerName = (<input type="text" required  value={playerName} onChange={nameInputChangeHandler}/>)
    }

    return(
        <li className={isActive ? 'active':undefined}>
            <span className="player">
            {editablePlayerName}
            <span className='player-symbol'>{color}</span>
                <button onClick={editClickHandler}>{isEditing ? 'Save':'Edit'}</button>
            </span>
        </li>
    )
}

 