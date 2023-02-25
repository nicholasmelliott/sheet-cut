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
  const {rectangles} = props;

  let totalBoxes = 0;
  let priceTotal = 0;
  let prevHeight = 0;
  const cBorder = 200;
  const cMargin = cBorder/2;
  const multiplier = 25;

  const canvasDim = rectangles.reduce((acc, r) => {
    acc.width += r.width * multiplier + cBorder;
    acc.height += r.height * multiplier + cMargin;
    return acc;
  }, { width: 0, height: 0 });
  
  const viewboxWidth = Math.max(...rectangles.map(o => o.width)) * multiplier + (cBorder * 2);
  const viewboxHeight = canvasDim.height + cBorder;

  const responsiveLayout = true;

  return (
    <div>
      { responsiveLayout ? (
      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2">
        {rectangles.map((r, i) => (
          <div key={i} className="col mb-4">
            <svg viewBox={`0 0 ${(r.width * multiplier) + cBorder} ${(r.height * multiplier) + cBorder}`}>
            <g key={i}>
          {/* Draw donor piece */}
          <rect
            x={cMargin}
            y={cMargin + prevHeight}
            width={r.width * multiplier}
            height={r.height * multiplier}
            fill="#a1c5ff"
            stroke="black"
          />
          {/* Draw donor piece dimensions next to corresponding sides */}
          <text 
            x={cMargin + (r.width * multiplier) / 2} 
            y={cMargin - 10 + prevHeight} 
            textAnchor="middle" 
            fontSize="25" 
            fill="#000000"
          >
            {r.width}
          </text>
          <text 
            x={cMargin - 25} 
            y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
            textAnchor="middle" 
            fontSize="25" 
            fill="#000000"
          >
            {r.height}
          </text>
          <text 
            x={cMargin + (r.width * multiplier) / 2} 
            y={(cMargin * 2) + (r.height * multiplier)} 
            textAnchor="middle" 
            fontSize="30" 
            fill="#000"
          >
            ${r.price}
          </text>
          {/* Draw piece to-be-cut inside donor piece */}
          {r.boxes.map((b, j) => (
            <g key={j}>
              <rect
                key={j}
                x={b.x * multiplier + cMargin}
                y={b.y * multiplier + cMargin + prevHeight}
                width={b.width * multiplier}
                height={b.height * multiplier}
                fill="#c7dcff"
                strokeDasharray="10"
                stroke="black"
              />
              {/* Draw the dimensions of the piece to-be-cut */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + prevHeight) + (b.height * multiplier / 2)}
                stroke="black"
                textAnchor="middle"
                fontSize={25}
              >
                {b.width} x {b.height} x {parseFloat(r.thickness).toFixed(1)}
              </text>
              {/* Draw the top dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + 25 + prevHeight)}
                fill="#fff"
                textAnchor="middle"
                fontSize={15}
              >
                {b.width}
              </text>
              {/* Draw the bottom dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + b.height * multiplier - 15 + prevHeight)}
                fill="#fff"
                textAnchor="middle"
                fontSize={15}
              >
                {b.width}
              </text>
              {/* Draw the left dimension */}
              <text
                x={(b.x * multiplier + cMargin + 15)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill="#fff"
                textAnchor="start"
                fontSize={15}
              >
                {b.height}
              </text>
              {/* Draw the right dimension */}
              <text
                x={(b.x * multiplier + cMargin + b.width * multiplier - 15)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill="#fff"
                textAnchor="end"
                fontSize={15}
              >
                {b.height}
              </text>
            </g>
          ))}
          {/* {prevHeight += r.height * multiplier + cMargin}
          {totalBoxes += r.boxes.length} */}
          {priceTotal += r.price}
        </g>
            </svg>
          </div>
        ))}
      </div>
      ) : (
      <svg viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}>
      {rectangles.map((r, i) => (
        <g key={i}>
          {/* Draw donor piece */}
          <rect
            x={cMargin}
            y={cMargin + prevHeight}
            width={r.width * multiplier}
            height={r.height * multiplier}
            fill="#a1c5ff"
            stroke="black"
          />
          {/* Draw donor piece dimensions next to corresponding sides */}
          <text 
            x={cMargin + (r.width * multiplier) / 2} 
            y={cMargin - 10 + prevHeight} 
            textAnchor="middle" 
            fontSize="25" 
            fill="#000000"
          >
            {r.width}
          </text>
          <text 
            x={cMargin - 25} 
            y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
            textAnchor="middle" 
            fontSize="25" 
            fill="#000000"
          >
            {r.height}
          </text>
          <text 
            x={(cMargin * 2) + (r.width * multiplier)} 
            y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
            textAnchor="middle" 
            fontSize="30" 
            fill="#000"
          >
            ${r.price}
          </text>
          {/* Draw piece to-be-cut inside donor piece */}
          {r.boxes.map((b, j) => (
            <g key={j}>
              <rect
                key={j}
                x={b.x * multiplier + cMargin}
                y={b.y * multiplier + cMargin + prevHeight}
                width={b.width * multiplier}
                height={b.height * multiplier}
                fill="#c7dcff"
                strokeDasharray="10"
                stroke="black"
              />
              {/* Draw the dimensions of the piece to-be-cut */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + prevHeight) + (b.height * multiplier / 2)}
                stroke="black"
                textAnchor="middle"
                fontSize={25}
              >
                {b.width} x {b.height} x {parseFloat(r.thickness).toFixed(1)}
              </text>
              {/* Draw the top dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + 25 + prevHeight)}
                fill="#fff"
                textAnchor="middle"
                fontSize={15}
              >
                {b.width}
              </text>
              {/* Draw the bottom dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + b.height * multiplier - 15 + prevHeight)}
                fill="#fff"
                textAnchor="middle"
                fontSize={15}
              >
                {b.width}
              </text>
              {/* Draw the left dimension */}
              <text
                x={(b.x * multiplier + cMargin + 15)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill="#fff"
                textAnchor="start"
                fontSize={15}
              >
                {b.height}
              </text>
              {/* Draw the right dimension */}
              <text
                x={(b.x * multiplier + cMargin + b.width * multiplier - 15)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill="#fff"
                textAnchor="end"
                fontSize={15}
              >
                {b.height}
              </text>
            </g>
          ))}
          {prevHeight += r.height * multiplier + cMargin}
          {totalBoxes += r.boxes.length}
          {priceTotal += r.price}
        </g>
      ))}
      <text x={cMargin*2} y={cMargin + prevHeight} fill="#000" fontSize="42" textAnchor="middle">
            ${parseFloat(priceTotal).toFixed(2)}
          </text>
      </svg>
      )}
    </div>
  );
};

export default ViewBoxWrapper;
