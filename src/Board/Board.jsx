import './Board.css'
import { getCharacter } from './helper'
import Ranks from './bits/Ranks.jsx'; 
import Files from './bits/Files.jsx'; 

const Board = () => {
  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i)
  const files = Array(8)
    .fill()
    .map((x, i) => getCharacter(i))

    const getClassName = (i, j) =>{
        let c = ''; 
        c += (i + j) % 2 === 0 ? 'tile--light': 'tile--dark'; 
        return c; 
    }


  return (
    <div className='board'>
    <Ranks ranks={ranks}/>
      <div className="tiles">
        {ranks.map((rank, i) =>
          files.map((file, j) => (
            <div key={file+'-'+rank} className={getClassName(i, j)}>
              {rank}
              {file}
            </div>
          )),
        )}
      </div>
      <Files files={files}/> 
    </div>
 
  )
}

export default Board
