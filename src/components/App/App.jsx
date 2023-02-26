import React, { useState } from 'react';
import './App.css'
import ResponsiveList from '../RespList/respList';
import ViewBox from '../ViewBox/viewBox';

function App() {
  const [rectangles, setRectangles] = useState([]);
  const [rows, setRows] = useState([
    { width: "", 
    widthFraction: 0,
    height: "", 
    heightFraction: 0, 
    thicknessFraction: 0}
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
