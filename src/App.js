import { useState } from 'react';
import './App.css';

function App() {
  
  const [list, setList] = useState([]);
  const [redo, setRedo] = useState([]);
  const handleclick  = (event)=>{
    const newDot = {
      clientX : event.clientX,
      clientY : event.clientY,
    };
    console.log(newDot)
    setList((prev)=>[...prev,newDot])
    
  }
  
  const handleUndo = (event) => {
    event.stopPropagation();
    console.log('undo');

    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length - 1];
    setRedo((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  };

  const handleRedo = (event) => {
    event.stopPropagation();
    if (redo.length === 0) {
      return;
    }
    const recoverDot = redo[redo.length - 1] ;
    
    setRedo((prev)=>{
      const newArr = [...prev].slice(0,-1);
      return newArr;
    })
    setList((prev)=>[...prev, recoverDot]);
  };
  
  
  
  return (
    <div id='page' onClick={handleclick}>
    
    {list.map((item)=>(
      <div className='dot' style={{top:item.clientY, left:item.clientX}}></div>
      ))}
      <div className='buttonPosition'>
      
      <button onClick={handleUndo}> undo </button>
      <button onClick={handleRedo}> redo </button>
      </div>
      </div>
      );
    }
    
    export default App;
    