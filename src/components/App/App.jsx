import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import './App.css';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
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
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('rows');
    return savedRows ? JSON.parse(savedRows) : [row(0, 0)];
  }); 
  const printViewBoxRef = useRef(null);
  const printTotalsRef = useRef(null);

  const handlePrint = () => {
    try {
      print(printViewBoxRef, printTotalsRef);
    } catch (error) {
      console.error("An error occurred while printing:", error);
    }
  }

  // Handles dropdown menu button click
  const handleToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
    // Scrolls to top of page so Totals remains in view. Effect is minimal but important
    window.scrollTo(0, 0);
  };

  const addRow = () => {
    setRows((prevRows) => [...prevRows, row(prevRows.length, prevRows.length)]);
  };

  const clearRows = () => {
    setRows([row(0, 0)]);
    localStorage.removeItem('rows');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem('rows', JSON.stringify(rows));
  }, [rows]);

  return (
    <ErrorBoundary>
      <div className="App">
        <iframe id="ifmcontentstoprint" className='ifmcontentstoprint'></iframe>
        <div className="display-wrapper">
          <Totals rectangles={rectangles} printRef={printTotalsRef} />
          <ViewBox rectangles={rectangles} printRef={printViewBoxRef} />
        </div>
        <div className="dropdown-wrapper">
          <div className="d-flex align-items-center justify-content-center w-100 dropdown-background">
            <Dropdown className="d-flex align-items-center justify-content-between p-2 w-100" autoClose={false} drop="up" onToggle={handleToggle} defaultShow={isMenuOpen}>
              <Button variant="primary" className="main-nav-btn" onClick={handlePrint}>Print</Button>
              <Dropdown.Toggle variant="light" id="dropdown-autoclose-false dropdown-button-drop-up" className='mx-auto main-nav-btn' style={{"backgroundColor": "lightgray"}}>
                <span>&#9776;</span>
              </Dropdown.Toggle>
              <Button variant="success" className="main-nav-btn" onClick={addRow} disabled={!isMenuOpen}>Add</Button>
              <Dropdown.Menu className="w-100 p-3 dropdown-menu-background">
                <Button className="btn-sm reset-btn" variant="danger" style={{borderRadius: '50%'}} onClick={clearRows}>Reset Sheets</Button>
                <ResponsiveList rows={rows} setRows={setRows} rectangles={rectangles} setRectangles={setRectangles} materials={materials} />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
