import React, { useEffect } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import generateReducedFractions from '../../utils/fractions';
import packBoxes from '../../helpers/binPacking';

const denominator = 16;

const ResponsiveList = (props) => {
  const {rows, setRows, rectangles, setRectangles} = props;

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
  },[rows.length]);

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { width: "", widthFraction: 0, height: "", heightFraction: 0, thicknessFraction: 0 }]);
  };

  const deleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <div>
    <div className="d-flex justify-content-center flex-wrap" >
      {rows.map((row, index) => (
        <div key={index} style={{margin: '10px', padding: '10px', backgroundColor: 'lightGray', height: '300px'}}>
        <Form>
        <Row key={index}>
          <div className='col-8'>Sheet #{index + 1}</div>  
          <div className='d-flex justify-content-end col-4'>  
            {rows.length > 1 && (
              <Button variant="danger" onClick={deleteRow}>
                X
              </Button>
            )}
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
        <InputGroup className="mb-3">
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
    <Row style={{margin: '10px', padding: '10px', height: '100px'}}>
      <div className='col-12 d-flex justify-content-center'>
          <Button className="text-align-center" style={{margin: '10px', padding: '10px', width: '100px', height: "50px"}} variant="primary" onClick={addRow}>
            Add New
          </Button>
      </div>
    </Row>
  </div>
);
};

export default ResponsiveList;
