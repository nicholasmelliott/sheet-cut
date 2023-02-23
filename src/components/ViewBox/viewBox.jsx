import React from 'react';

const Rectangle = ({ width, height, x, y }) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    fill="green"
    stroke="black"
  />
);

const ViewBoxWrapper = (props) => {
  const {rectangles, setRectangles} = props;

  const addRectangle = () => {
    console.log(rectangles);
    const lastRectangle = rectangles[rectangles.length - 1];
    setRectangles([...rectangles, {
      "width": 20,
      "height": 24,
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

  let totalBoxes = 0;
  let priceTotal = 0;
  let prevHeight = 0;
  const cBorder = 200;
  const cMargin = cBorder/2;
  const multiplier = 25;

  const canvasDim = rectangles.reduce((acc, r) => {
    acc.width += r.width * multiplier + cBorder;
    acc.height += r.height * multiplier + cBorder;
    return acc;
  }, { width: 0, height: 0 });
  
  const maxWidth = Math.max(...rectangles.map(o => o.width)) * multiplier + cBorder;
  const viewboxWidth = Math.max(canvasDim.width, maxWidth);
  const viewboxHeight = canvasDim.height;

  return (
    <div>
      <svg viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}>
      {rectangles.map((r, i) => (
        <g key={i}>
          {/* Draw donor piece */}
          <rect
            x={cMargin}
            y={cMargin + prevHeight}
            width={r.width * multiplier}
            height={r.height * multiplier}
            fill="#82FFFF"
            stroke="black"
          />
          {/* Draw donor piece dimensions next to corresponding sides */}
          <text 
            x={cMargin + (r.width * multiplier) / 2} 
            y={cMargin - 10 + prevHeight} 
            textAnchor="middle" fontSize="12" 
            fill="#000000"
          >
            {r.width}
          </text>
          <text 
            x={cMargin - 15} 
            y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
            textAnchor="middle" 
            fontSize="12" 
            fill="#000000"
          >
            {r.height}
          </text>
          <text 
            x={cMargin + (r.width * multiplier) + 50} 
            y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
            textAnchor="middle" 
            fontSize="22" 
            fill="#00C800"
          >
            ${r.price}
          </text>
          {/* Draw piece to-be-cut inside donor piece */}
          {r.boxes.map((b, j) => (
            <div key={j}>
              <rect
                key={j}
                x={b.x * multiplier + cMargin}
                y={b.y * multiplier + cMargin + prevHeight}
                width={b.width * multiplier}
                height={b.height * multiplier}
                fill={`rgb(0, 255, 255)`}
                stroke="green"
              />
              {/* Draw the dimensions of the piece to-be-cut */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + prevHeight) + (b.height * multiplier / 2)}
                stroke="green"
                textAnchor="middle"
                fontSize={25}
              >
                {b.width} x {b.height} x {parseFloat(r.thickness).toFixed(1)}
              </text>
              {/* Draw the top dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + 15 + prevHeight)}
                fill="{`rgb(255, 255, 255)`}"
                textAnchor="middle"
                fontSize={15}
              >
                {b.width}
              </text>
              {/* Draw the bottom dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + b.height * multiplier - 5 + prevHeight)}
                fill={`rgb(255, 255, 255)`}
                textAnchor="middle"
                fontSize={15}
              >
                {b.width}
              </text>
              {/* Draw the left dimension */}
              <text
                x={(b.x * multiplier + cMargin + 15)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill={`rgb(255, 255, 255)`}
                textAnchor="start"
                fontSize={15}
              >
                {b.height}
              </text>
              {/* Draw the right dimension */}
              <text
                x={(b.x * multiplier + cMargin + b.width * multiplier - 15)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill={`rgb(255, 255, 255)`}
                textAnchor="end"
                fontSize={15}
              >
                {b.height}
              </text>
            </div>
          ))}
          {prevHeight += r.height * multiplier + cMargin}
          {totalBoxes += r.boxes.length}
          {priceTotal += r.price}
        </g>
      ))}
      <text x={cMargin*2} y={cMargin + prevHeight} fill="#00C800" fontSize="42" textAnchor="middle">
            ${parseFloat(priceTotal).toFixed(2)}
          </text>
      </svg>
      <button onClick={addRectangle}>Add Rectangle</button>
    </div>
  );
};

export default ViewBoxWrapper;
