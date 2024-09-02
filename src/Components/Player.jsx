import { useState } from "react"

export default function Player ({name, color}){ 
   const [isEditing, setIsEditing] = useState(false); 
   const [playerName, setPlayerName] = useState(name); 

    let editablePlayerName = (<span className="player-name">{playerName}</span>)
   
    function editClickHandler(){
        setIsEditing((editing)=>!editing) 
    }
    
    function nameInputChangeHandler(event){
         setPlayerName(event.target.value)
    }
     
    if(isEditing){
        editablePlayerName = (<input type="text" onChange={nameInputChangeHandler}/>)
    }

    return(
        <li>
            <span className="player">
            {editablePlayerName}
            <span className='player-symbol'>{color}</span>
                <button onClick={editClickHandler}>{isEditing ? 'Save':'Edit'}</button>
            </span>
        </li>
    )
}

const white={
     width:'100%',
     height:'100%', 
     background:'white'
}

const black={
    background:'black', 
}
