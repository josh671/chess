import './Popup.css';
import PromotionBox from './PromotionBox/PromotionBox.jsx';
import {Status} from '../../Constants.js';
import { useAppContext } from '../Context/Context.jsx';


const Popup = ()=>{
    const {appState} = useAppContext(); 

    if(appState.status === Status.ongoing){
        return null; 
    }
    return(
        <div className='popup'>
            <PromotionBox/>
        </div>
    )
}


export default Popup; 
