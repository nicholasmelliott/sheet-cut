import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import './App.css';
import ResponsiveList from '../RespList/respList';
import ViewBox from '../ViewBox/viewBox';
import print from '../../helpers/printViewBox';

function App() {
  const row = (index, colorIndex) => ({ 
    index,
    colorIndex,
    width: "", 
    widthFraction: 0,
    widthFractionText: "",
    height: "", 
    heightFraction: 0,
    heightFractionText: "", 
    thicknessFraction: 0,
    thicknessFractionText: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rectangles, setRectangles] = useState([]);
  const [rows, setRows] = useState([row(0, 0)]);
  const printRef = useRef(null);

  const handlePrint = () => {
    print(printRef);
  }

  const handleToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  const addRow = () => {
    setRows((prevRows) => [...prevRows, row(prevRows.length, prevRows.length)]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <iframe id="ifmcontentstoprint" style={{"height": "0px", "width": "0px", "position": "absolute"}}></iframe>
      <div style={{height: "80vh"}}>
        <ViewBox rectangles={rectangles} printRef={printRef} />
      </div>
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
        <div className="d-flex align-items-center justify-content-center w-100" style={{backgroundColor: '#eee', height: '60px', width: "100%"}}>
          <Dropdown className="d-flex align-items-center justify-content-between p-2 w-100" autoClose={false} drop="up" onToggle={handleToggle}>
            <Button variant="primary" style={{width: "30%"}} onClick={handlePrint}>Print</Button>
            <Dropdown.Toggle variant="danger" id="dropdown-autoclose-false dropdown-button-drop-up" className='mx-auto' style={{width: "30%"}}>
              <span>&#9776;</span>
            </Dropdown.Toggle>
            <Button variant="secondary" style={{width: "30%"}} onClick={addRow} disabled={!isMenuOpen}>Add</Button>
            <Dropdown.Menu className="w-100 p-3" style={{backgroundColor: '#eee'}}>
              <ResponsiveList rows={rows} setRows={setRows} rectangles={rectangles} setRectangles={setRectangles} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default App
