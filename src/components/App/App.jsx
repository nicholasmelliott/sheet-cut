import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import './App.css';
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
      <div>
        <ViewBox rectangles={rectangles} printRef={printRef} />
      </div>
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
        <div className="d-flex align-items-center justify-content-center w-100" style={{backgroundColor: '#eee', height: '60px', width: "100%"}}>
          <Dropdown className="d-flex align-items-center justify-content-center w-100" autoClose={false} drop="up">
            <Dropdown.Toggle variant="danger" id="dropdown-autoclose-false dropdown-button-drop-up">
              <span>&#9776;</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100 p-3 overflow-auto" style={{backgroundColor: '#eee'}}>
              <Button variant="primary" style={{"width": "100%"}} onClick={handlePrint}>Print</Button>
              <Dropdown.Divider />
              <ResponsiveList rows={rows} setRows={setRows} rectangles={rectangles} setRectangles={setRectangles} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default App
