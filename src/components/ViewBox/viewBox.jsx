import React, {useEffect} from 'react';
import './viewBox.css';
import getHexColorByIndex from '../../utils/colorByIndex';

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
  
  const donorPieceFill = "#a1c5ff";
  const donorPieceStroke = "#000";
  const donorTopDimDecrement = 10;
  const donorLeftDimDecrement = 25;
  const donorBottomPriceIncrement = 60;
  const donorSidesFontSize = 25;
  const donorPriceFontSize = 30; 
  const donorSidesTextFill = "#000";
  const donorPriceTextFill = "#000";
  
  const toBeCutPieceFill = "#c7dcff";
  const toBeCutPieceStrokeDasharray = 10;
  const toBeCutPieceStroke = "#000";
  const toBeCutTopDimIncrement = 25;
  const toBeCutBottomDimDecrement = 15;
  const toBeCutLeftDimIncrement = 15;
  const toBeCutRightDimDecrement = 15;
  const toBeCutMainDimFontSize= 25;
  const toBeCutSideDimsFontSize = 15;
  const toBeCutMainDimFill = "#000";
  const toBeCutSideDimsFill = "#FFF";

  const totalPriceTextFill = "#000";

  const canvasDim = rectangles.reduce((acc, r) => {
    acc.width += r.width * multiplier + cBorder;
    acc.height += r.height * multiplier + cMargin;
    return acc;
  }, { width: 0, height: 0 });
  
  const viewboxWidth = Math.max(...rectangles.map(o => o.width)) * multiplier + (cBorder * 2);
  const viewboxHeight = canvasDim.height + cBorder;

  const responsiveLayout = true;

  console.log(rectangles);

  return (
    <div style={{height: "100%"}}>
      { responsiveLayout ? (
      <div className="container testimonial-group" style={{height: "100%"}}>
        <div className="row text-center" style={{height: "100%"}}>
        {rectangles.map((r, i) => (
          <div key={i} className="col">
            <svg viewBox={`0 0 ${(r.width * multiplier) + cBorder} ${(r.height * multiplier) + cBorder}`} width="100%" height="100%" preserveAspectRatio="none">
            <g key={i}>
          {/* Draw donor piece */}
          <rect
            x={cMargin}
            y={cMargin + prevHeight}
            width={r.width * multiplier}
            height={r.height * multiplier}
            fill={donorPieceFill}
            stroke={donorPieceStroke}
          />
          {/* Draw donor piece dimensions next to corresponding sides */}
          <text 
            x={cMargin + (r.width * multiplier) / 2} 
            y={cMargin - donorTopDimDecrement + prevHeight} 
            textAnchor="middle" 
            fontSize={donorSidesFontSize} 
            fill={donorSidesTextFill}
          >
            {r.width}
          </text>
          <text 
            x={cMargin - donorLeftDimDecrement} 
            y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
            textAnchor="middle" 
            fontSize={donorSidesFontSize}  
            fill={donorSidesTextFill}
          >
            {r.height}
          </text>
          <text 
            x={cMargin + (r.width * multiplier) / 2} 
            y={(cMargin + donorBottomPriceIncrement) + (r.height * multiplier)} 
            textAnchor="middle" 
            fontSize={donorPriceFontSize} 
            fill={donorPriceTextFill}
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
                fill={getHexColorByIndex(b.index)}
                strokeDasharray={toBeCutPieceStrokeDasharray}
                stroke={toBeCutPieceStroke}
              />
              {/* Draw the dimensions of the piece to-be-cut */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + prevHeight) + (b.height * multiplier / 2)}
                fill={toBeCutMainDimFill}
                textAnchor="middle"
                fontSize={toBeCutMainDimFontSize}
              >
                {b.width} x {b.height} x {parseFloat(b.thickness)} Sheet #{b.index + 1}
              </text>
              {/* Draw the top dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + toBeCutTopDimIncrement + prevHeight)}
                fill={toBeCutSideDimsFill}
                textAnchor="middle"
                fontSize={toBeCutSideDimsFontSize}
              >
                {b.width}
              </text>
              {/* Draw the bottom dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + b.height * multiplier - toBeCutBottomDimDecrement + prevHeight)}
                fill={toBeCutSideDimsFill}
                textAnchor="middle"
                fontSize={toBeCutSideDimsFontSize}
              >
                {b.width}
              </text>
              {/* Draw the left dimension */}
              <text
                x={(b.x * multiplier + cMargin + toBeCutLeftDimIncrement)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill={toBeCutSideDimsFill}
                textAnchor="start"
                fontSize={toBeCutSideDimsFontSize}
              >
                {b.height}
              </text>
              {/* Draw the right dimension */}
              <text
                x={(b.x * multiplier + cMargin + b.width * multiplier - toBeCutRightDimDecrement)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill={toBeCutSideDimsFill}
                textAnchor="end"
                fontSize={toBeCutSideDimsFontSize}
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
            fill={donorPieceFill}
            stroke={donorPieceStroke}
          />
          {/* Draw donor piece dimensions next to corresponding sides */}
          <text 
            x={cMargin + (r.width * multiplier) / 2} 
            y={cMargin - donorTopDimDecrement + prevHeight} 
            textAnchor="middle" 
            fontSize={donorSidesFontSize} 
            fill={donorSidesTextFill}
          >
            {r.width}
          </text>
          <text 
            x={cMargin - donorLeftDimDecrement} 
            y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
            textAnchor="middle" 
            fontSize={donorSidesFontSize} 
            fill={donorSidesTextFill}
          >
            {r.height}
          </text>
          <text 
            x={(cMargin * 2) + (r.width * multiplier)} 
            y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
            textAnchor="middle" 
            fontSize={donorPriceFontSize} 
            fill={donorPriceTextFill}
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
                fill={toBeCutPieceFill}
                strokeDasharray={toBeCutPieceStrokeDasharray}
                stroke={toBeCutPieceStroke}
              />
              {/* Draw the dimensions of the piece to-be-cut */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + prevHeight) + (b.height * multiplier / 2)}
                fill={toBeCutMainDimFill}
                textAnchor="middle"
                fontSize={toBeCutMainDimFontSize}
              >
                {b.width} x {b.height} x {parseFloat(r.thickness).toFixed(1)}
              </text>
              {/* Draw the top dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + toBeCutTopDimIncrement + prevHeight)}
                fill={toBeCutSideDimsFill}
                textAnchor="middle"
                fontSize={toBeCutSideDimsFontSize}
              >
                {b.width}
              </text>
              {/* Draw the bottom dimension */}
              <text
                x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                y={(b.y * multiplier + cMargin + b.height * multiplier - toBeCutBottomDimDecrement + prevHeight)}
                fill={toBeCutSideDimsFill}
                textAnchor="middle"
                fontSize={toBeCutSideDimsFontSize}
              >
                {b.width}
              </text>
              {/* Draw the left dimension */}
              <text
                x={(b.x * multiplier + cMargin + toBeCutLeftDimIncrement)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill={toBeCutSideDimsFill}
                textAnchor="start"
                fontSize={toBeCutSideDimsFontSize}
              >
                {b.height}
              </text>
              {/* Draw the right dimension */}
              <text
                x={(b.x * multiplier + cMargin + b.width * multiplier - toBeCutRightDimDecrement)}
                y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                fill={toBeCutSideDimsFill}
                textAnchor="end"
                fontSize={toBeCutSideDimsFontSize}
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
      <text x={cMargin*2} y={cMargin + prevHeight} fill={totalPriceTextFill} fontSize="42" textAnchor="middle">
            ${parseFloat(priceTotal).toFixed(2)}
          </text>
      </svg>
      )}
    </div>
  );
};

export default ViewBoxWrapper;
