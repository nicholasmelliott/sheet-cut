import React, { useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import generateReducedFractions from './Utils/fractions';

const denominator = 16;

const ResponsiveList = () => {
  const [rows, setRows] = useState([
    { width: '', 
    widthFraction: '',
    height: '', 
    heightFraction: '', 
    thicknessFraction: '' }
  ]);

  const handleInputChange = (e, index) => {
    console.log(rows);
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

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { width: '', widthFraction: '', height: '', heightFraction: '', thicknessFraction: '' }]);
  };

  const deleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <div className="d-flex justify-content-center flex-wrap" >
      {rows.map((row, index) => (
        <div key={index} style={{margin: '10px', padding: '10px', backgroundColor: 'lightGray', height: '300px'}}>
        <Form>
        <Row key={index}>
          <div className='col-8'>Sheet #{index + 1}</div>  
          <div className='d-flex justify-content-end col-4'>  
            <Button variant="danger" onClick={() => deleteRow(index)}>
                X
            </Button>
          </div>
        </Row>
        <Row className="mt-2">  
          <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Width</InputGroup.Text>
            <Form.Control
              type="text"
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
                <option key={fraction} value={fraction}>
                  {fraction}
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
          <InputGroup className="mb-3">
            <InputGroup.Text>Height</InputGroup.Text>
            <Form.Control
              type="text"
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
                <option key={fraction} value={fraction}>
                {fraction}
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
        <InputGroup className="mb-3">
            <InputGroup.Text>Thickness</InputGroup.Text> 
          <Form.Control
            as="select"
            name="thicknessFraction"
            value={row.thicknessFraction}
            onChange={(e) => handleInputChange(e, index)}
          >
            {generateReducedFractions(denominator).map((fraction) => (
              <option key={fraction} value={fraction}>
                {fraction}
              </option>
            ))}
          </Form.Control>
          </InputGroup>
        </Col>
      </Row>
      </Form>
      </div>
    ))}
    <div className='col-6 d-flex justify-content-center'>
        <Button className="text-align-center" style={{margin: '10px', padding: '10px', width: '50px', height: "50px"}} variant="primary" onClick={addRow}>
          +
        </Button>
    </div>
    <div className='col-6'></div>
   
  </div>
);
};

export default ResponsiveList;
