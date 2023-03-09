import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className="App">
      <div style={{height: "60vh"}}>
        <ViewBox rectangles={rectangles} />
      </div>
      <div style={{height: "40vh"}}>
        <ResponsiveList rows={rows} setRows={setRows} rectangles={rectangles} setRectangles={setRectangles} />
      </div>
    </div>
  )
}

export default App
