import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import './App.css';
import ResponsiveList from '../RespList/respList';
import Totals from '../Totals/totals';
import ViewBox from '../ViewBox/viewBox';
import print from '../../helpers/print';
import { MATERIALS } from '../../data/materials'

function App() { 
  const row = (index, colorIndex) => ({ 
    index,
    colorIndex,
    quantity: 1,
    width: "", 
    widthFraction: 0,
    widthFractionText: "",
    height: "", 
    heightFraction: 0,
    heightFractionText: "", 
    thicknessFraction: materials[0].thick,
    thicknessFractionText: materials[0].mat,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [rectangles, setRectangles] = useState([]);
  const [materials] = useState(MATERIALS);
  const [rows, setRows] = useState([row(0, 0)]);
  const printViewBoxRef = useRef(null);
  const printTotalsRef = useRef(null);

  const handlePrint = () => {
    print(printViewBoxRef, printTotalsRef);
  }

  // Handles dropdown menu button click
  const handleToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
    window.scrollTo(0, 0);
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
        <Totals rectangles={rectangles} printRef={printTotalsRef} />
        <ViewBox rectangles={rectangles} printRef={printViewBoxRef} />
      </div>
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
        <div className="d-flex align-items-center justify-content-center w-100" style={{backgroundColor: '#eee', height: '60px', width: "100%"}}>
          <Dropdown className="d-flex align-items-center justify-content-between p-2 w-100" autoClose={false} drop="up" onToggle={handleToggle} defaultShow={isMenuOpen}>
            <Button variant="primary" style={{width: "30%"}} onClick={handlePrint}>Print</Button>
            <Dropdown.Toggle variant="danger" id="dropdown-autoclose-false dropdown-button-drop-up" className='mx-auto' style={{width: "30%"}}>
              <span>&#9776;</span>
            </Dropdown.Toggle>
            <Button variant="secondary" style={{width: "30%"}} onClick={addRow} disabled={!isMenuOpen}>Add</Button>
            <Dropdown.Menu className="w-100 p-3" style={{background: 'transparent', border: "0px"}}>
              <ResponsiveList rows={rows} setRows={setRows} rectangles={rectangles} setRectangles={setRectangles} materials={materials}/>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default App
