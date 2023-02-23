import React from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import generateReducedFractions from '../../utils/fractions';

const denominator = 16;

const ResponsiveList = (props) => {
  const {rows, setRows, rectangles, setRectangles} = props;

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

  const addRectangle = () => {
    console.log(rectangles);
    setRectangles([...rectangles, {
      "width": rows[0].width,
      "height": rows[0].height,
      "boxes": [
        {
          "width": 19,
          "height": 19,
          "constrainRotation": false,
          "x": 0,
          "y": 0,
          "packed": true
        }
      ],
      "heuristic": {},
      "freeRectangles": [
        {
          "x": 0,
          "y": 19,
          "width": 20,
          "height": 5
        },
        {
          "x": 19,
          "y": 0,
          "width": 1,
          "height": 24
        }
      ],
      "thickness": "2.500",
      "price": 16.99
    }]);
  };

  const deleteRectangle = (index) => {
    const rectIndex = rectangles.length + index - 1;
    setRectangles((prevRectangles) => prevRectangles.filter((_, i) => i !== rectIndex));
  };

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { width: '', widthFraction: '', height: '', heightFraction: '', thicknessFraction: '' }]);
  };

  const deleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    addRow();
    addRectangle();
  }

  const handleClose = (index) => {
    deleteRow(index);
    deleteRectangle(index);
  }

  return (
    <div className="d-flex justify-content-center flex-wrap" >
      {rows.map((row, index) => (
        <div key={index} style={{margin: '10px', padding: '10px', backgroundColor: 'lightGray', height: '300px'}}>
        <Form>
        <Row key={index}>
          <div className='col-8'>Sheet #{index + 1}</div>  
          <div className='d-flex justify-content-end col-4'>  
            <Button variant="danger" onClick={() => handleClose(index)}>
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
        <Button className="text-align-center" style={{margin: '10px', padding: '10px', width: '50px', height: "50px"}} variant="primary" onClick={handleAdd}>
          +
        </Button>
    </div>
    <div className='col-6'></div>
   
  </div>
);
};

export default ResponsiveList;
