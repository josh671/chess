import './Pieces.css'; 
import Piece from './Piece'; 
const Pieces = () =>{
    const position = new Array(8).fill('').map(x=> new Array(8).fill('')); 
    position[0][0] = 'br'; 
    position[7][7] = 'wr'; 
    return(
        <>
        <div className='pieces'>
            {position.map((r, rank) => 
            r.map((f, file) => 
                position[rank][file] ? <Piece rank={rank} file={file} piece={position[rank][file]} /> : null 
            ))}
        </div>
        </>
    )
}

export default Pieces; 