import React, { useEffect, useRef } from 'react';
import { Form, Row, Col, Button, InputGroup, CloseButton } from 'react-bootstrap';
import generateReducedFractions from '../../utils/fractions';
import scrollLeft from '../../utils/scrollLeft';
import packBoxes from '../../helpers/binPacking/binPacking';
import getHexColorByIndex from '../../utils/colorByIndex';
import './respList.css';
import areDimensionsValid from '../../helpers/validateDimensions';

const DENOMINATOR = 16;

const ResponsiveList = (props) => {
  const {rows, setRows, rectangles, setRectangles, materials} = props;
  const containerRef = useRef(null);
  const firstInputRef = useRef(null);  
  const prevRowsLengthRef = useRef(rows.length);

  const handleInputChange = (e, index, valueParser) => {
    const { name, value } = e.target;
    const innerText = e.target.options?.[e.target.selectedIndex]?.innerText || "";
    setRows((prevRows) =>
      prevRows.map((row, i) =>
      i === index
        ? {
            ...row,
            [name]: value === "" ? "" : valueParser(value),
            [`${name}Text`]: innerText,
          }
        : row
      )
    );
  };

  const handleIntInputChange = (e, index) => {
    const { value } = e.target;
    
    // Prevents 0 from being input option
    if (value === "0") {
      return;
    }

    handleInputChange(e, index, parseInt);
  };

  const handleFloatInputChange = (e, index) => {
    handleInputChange(e, index, parseFloat);
  };

  const handleIntKeyDown = (e) => {
    // Prevent 'e', '-', '+', or '.' from being entered
    if (['e', 'E', '-', '+', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    firstInputRef.current.focus();
    firstInputRef.current.onClick;
  }, []);

  //When rows is updated, viewbox is re-rendered
  useEffect(() => {
    const duplicatedRows = rows.flatMap((row) =>
      Array(row.quantity).fill({ ...row})
    );
    const bins = packBoxes(duplicatedRows);
    setRectangles(bins);
    console.log("Rows", rows, "Duplicate Rows", duplicatedRows, "Rectangles", rectangles);
  },[rows]);

  // When rows length changes
  useEffect(() => {    
    // If row length increases
    if (rows.length > prevRowsLengthRef.current) {
      // scrolls to newly added input form
      scrollLeft(containerRef);
      // focuses on first input
      firstInputRef.current.focus()
    }
    prevRowsLengthRef.current = rows.length;
  },[rows.length]);

  const deleteRow = (index) => {
    setRows((prevRows) => 
      prevRows
        .filter((_, i) => i !== index)
        .map((row, i) => ({...row, index: i, colorIndex: i}))
    );
  };

  return (
    <div>
      <div className="resp-list-container resp-list-testimonial-group">
        <div className="row"  ref={containerRef}>
          {rows.map((row, index) => (
            <div key={index} className="testGroupCol col-11 col-md-4 col-xxl-3 offset-half">
              <Form>
                <Row key={index}>
                  <div className='col-8 mb-1 pl-4 pb-2'>
                    <span className="fs-5" style={{ borderBottom: `3px solid ${getHexColorByIndex(row.colorIndex)}`, borderBottomRightRadius: "10px", paddingRight: "8px",  paddingBottom: "2px"}}>Sheet #{index + 1}</span>  
                  </div>
                  <div className='d-flex justify-content-end col-4'>  
                    {rows.length > 1 && (
                      <CloseButton className="mb-1" variant="white" onClick={() => deleteRow(index)}/>
                    )}
                  </div>
                </Row>
                {
                  (
                    (row.width !== 0 && row.width !== "" && row.height !== 0 && row.height !== "") 
                  ) 
                  ? (!areDimensionsValid([row]) ? <span className="text-danger">Dimensions are too large.</span> : null) 
                  : null
                }
                <Row>  
                  <Col>
                    {(row.height || row.heightFraction) && !(row.width || row.widthFraction) ? <span className="text-danger">Second dimension required.</span> : null}
                    <InputGroup className='input-group-lg'>
                      <InputGroup.Text className="input-label p-2">
                        Width (in)
                      </InputGroup.Text>
                      <Form.Control
                        inputMode="numeric"
                        type="number"
                        min="0"
                        name="width"
                        value={row.width}
                        onChange={(e) => handleIntInputChange(e, index)}
                        onKeyDown={handleIntKeyDown}
                        ref={firstInputRef}
                      />
                      <Form.Control
                        className="p-2"
                        as="select"
                        name="widthFraction"
                        value={row.widthFraction}
                        onChange={(e) => handleFloatInputChange(e, index)}
                      >
                        <option value={0} defaultValue disabled>+ Frac. in</option>
                        {generateReducedFractions(DENOMINATOR).map((fraction) => (
                          <option key={fraction.fraction} value={fraction.decimal}>
                            {fraction.fraction}
                          </option>
                        ))}
                      </Form.Control>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>  
                  <Col className='d-flex justify-content-center'>
                    <span> x </span>
                  </Col>
                </Row>
                <Row className="mt-2">  
                  <Col>
                    {!(row.height || row.heightFraction) && (row.width || row.widthFraction) ? <span className="text-danger">Second dimension required.</span> : null}
                    <InputGroup className='input-group-lg'>
                      <InputGroup.Text className="input-label p-2">
                        Height (in)
                      </InputGroup.Text>
                      <Form.Control
                        inputMode="numeric"
                        type="number"
                        min="0"
                        name="height"
                        value={row.height}
                        onChange={(e) => handleIntInputChange(e, index)}
                        onKeyDown={handleIntKeyDown}
                      />
                      <Form.Control
                        className="p-2"
                        as="select"
                        name="heightFraction"
                        value={row.heightFraction}
                        onChange={(e) => handleFloatInputChange(e, index)}
                      >
                        <option value={0} defaultValue disabled>+ Frac. in</option>
                        {generateReducedFractions(DENOMINATOR).map((fraction) => (
                          <option key={fraction.fraction} value={fraction.decimal}>
                            {fraction.fraction}
                          </option>
                        ))}
                      </Form.Control>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>  
                  <Col className='d-flex justify-content-center'>
                    <span> x </span>
                  </Col>
                </Row>
                <Row className="mt-2">  
                  <Col>
                    <InputGroup className='input-group-lg'>
                      <InputGroup.Text className="input-label p-2">
                        Thickness
                      </InputGroup.Text> 
                      <Form.Control
                        style={{ width: '30%' }}
                        as="select"
                        name="thicknessFraction"
                        value={row.thicknessFraction}
                        onChange={(e) => handleFloatInputChange(e, index)}
                      >
                        {materials.map((material, i) => (
                            <option key={i} value={material.thick}>
                              {material.mat}
                            </option>
                        ))}
                      </Form.Control>
                      <Form.Control
                        as="select"
                        name="quantity"
                        value={row.quantity}
                        onChange={(e) => handleIntInputChange(e, index)}
                      >
                        <option value={1} defaultValue disabled>Qty</option>
                        {Array.from({ length: 50 }, (_, i) => i + 1).map((val, i) => (
                            <option key={i} value={val}>
                              {val}
                            </option>
                        ))}
                      </Form.Control> 
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveList;
