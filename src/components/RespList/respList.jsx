import React, { useEffect, useRef } from 'react';
import { Form, Row, Col, Button, InputGroup, CloseButton } from 'react-bootstrap';
import generateReducedFractions from '../../utils/fractions';
import scrollLeft from '../../utils/scrollLeft';
import packBoxes from '../../helpers/binPacking';
import './respList.css';

const denominator = 16;

const ResponsiveList = (props) => {
  const {rows, setRows, rectangles, setRectangles} = props;
  const containerRef = useRef(null);

  const width = parseInt(rows[0].width) + parseFloat(rows[0].widthFraction);
  const height = parseInt(rows[0].height) + parseFloat(rows[0].heightFraction);


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setRows((prevRows) =>
      prevRows.map((row, i) => {
        if (i === index) {
          return { ...row, [name]: value };
        }
        return row;
      })
    );
  };

  //When rows is updated, viewbox is re-rendered
  useEffect(() => {
    const bins = packBoxes(rows);
    setRectangles(bins);
  },[rows]);

  //Scrolls to newly added input form
  useEffect(() => {
    scrollLeft(containerRef);
  },[rows.length]);

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { width: "", widthFraction: 0, height: "", heightFraction: 0, thicknessFraction: 0 }]);
  };

  const deleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="row">
        <div className='col-12 d-flex justify-content-center'>
            <Button className="addButton text-align-center" variant="primary" onClick={addRow}>
              Add New
            </Button>
        </div>
      </div>
      <div className="container testimonial-group">
        <div className="row"  ref={containerRef}>
        {rows.map((row, index) => (
          <div key={index} className="testGroupCol col-12 col-md-4">
          <Form>
          <Row key={index}>
            <div className='col-8 mb-1'>Sheet #{index + 1}</div>  
            <div className='d-flex justify-content-end col-4'>  
              {rows.length > 1 && (
                <CloseButton className="mb-1" variant="white" onClick={() => deleteRow(index)}/>
              )}
            </div>
          </Row>
          <Row>  
            <Col>
            <InputGroup>
              <InputGroup.Text>Width</InputGroup.Text>
              <Form.Control
                type="number"
                name="width"
                value={row.width}
                onChange={(e) => handleInputChange(e, index)}
              />
              <Form.Control
                as="select"
                name="widthFraction"
                value={row.widthFraction}
                onChange={(e) => handleInputChange(e, index)}
              >
                {generateReducedFractions(denominator).map((fraction) => (
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
            <InputGroup>
              <InputGroup.Text>Height</InputGroup.Text>
              <Form.Control
                type="number"
                name="height"
                value={row.height}
                onChange={(e) => handleInputChange(e, index)}
              />
              <Form.Control
                as="select"
                name="heightFraction"
                value={row.heightFraction}
                onChange={(e) => handleInputChange(e, index)}
              >
                {generateReducedFractions(denominator).map((fraction) => (
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
          <InputGroup>
              <InputGroup.Text>Thickness</InputGroup.Text> 
            <Form.Control
              as="select"
              name="thicknessFraction"
              value={row.thicknessFraction}
              onChange={(e) => handleInputChange(e, index)}
            >
              {generateReducedFractions(denominator).map((fraction) => (
                  <option key={fraction.fraction} value={fraction.decimal}>
                    {fraction.fraction}
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
