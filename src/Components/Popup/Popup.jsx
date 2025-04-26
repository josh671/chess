import './Popup.css';
import PromotionBox from './PromotionBox/PromotionBox.jsx';
import {Status} from '../../Constants.js';
import { useAppContext } from '../Context/Context.jsx';
import { closePopup } from '../Reducer/Actions/popup.jsx';


const Popup = ()=>{
    const {appState, dispatch} = useAppContext(); 

    if(appState.status === Status.ongoing){
        return null; 
    }

    const onClosePopup = () =>{
        dispatch(closePopup())
        
    }
    return(
        <div className='popup'>
            <PromotionBox onClosePopup={onClosePopup} />
        </div>
    )
}


export default Popup; 
