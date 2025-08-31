import './Popup.css';
import {Status} from '../../Constants.js';
import { useAppContext } from '../Context/Context.jsx';
import { closePopup } from '../Reducer/Actions/popup.jsx';
import React from 'react';
const Popup = ({children})=>{
   const {appState : {status}, dispatch} = useAppContext(); 

    const onClosePopup = () =>{
        dispatch(closePopup())
    }

    if(status === Status.ongoing){
        return null; 
    }
    

    return(
        <div className="popup">
             {React.Children
            .toArray(children)
            .map(child => React.cloneElement(child, { onClosePopup }))}
            
        </div>
    )
}


export default Popup; 
