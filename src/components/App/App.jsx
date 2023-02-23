import React, { useState } from 'react';
import './App.css'
import data from '../../packedBinsQOH.json';
import ResponsiveList from '../RespList/respList';
import ViewBox from '../ViewBox/viewBox';

function App() {
  const [rectangles, setRectangles] = useState(data);
  const [rows, setRows] = useState([
    { width: '', 
    widthFraction: '',
    height: '', 
    heightFraction: '', 
    thicknessFraction: '' }
  ]);

  return (
    <div className="App">
      <ViewBox rectangles={rectangles} />
      <div className="card">
        <ResponsiveList rows={rows} setRows={setRows} rectangles={rectangles} setRectangles={setRectangles} />
      </div>
    </div>
  )
}

export default App
