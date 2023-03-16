import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import ResponsiveList from '../RespList/respList';
import ViewBox from '../ViewBox/viewBox';
import print from '../../helpers/printViewBox';

function App() {
  const [rectangles, setRectangles] = useState([]);
  const [rows, setRows] = useState([
    { width: "", 
    widthFraction: 0,
    widthFractionText: "",
    height: "", 
    heightFraction: 0,
    heightFractionText: "", 
    thicknessFraction: 0,
    thicknessFractionText: "",
  }
  ]);
  const printRef = useRef(null);

  const handlePrint = () => {
    print(printRef);
  }


  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className="App">
      <iframe id="ifmcontentstoprint" style={{"height": "0px", "width": "0px", "position": "absolute"}}></iframe>
      <div style={{height: "60vh"}}>
        <ViewBox rectangles={rectangles} printRef={printRef} />
      </div>
      <button  style={{"width": "100%"}} onClick={handlePrint}>Print</button>
      <div style={{height: "40vh"}}>
        <ResponsiveList rows={rows} setRows={setRows} rectangles={rectangles} setRectangles={setRectangles} />
      </div>
    </div>
  )
}

export default App
