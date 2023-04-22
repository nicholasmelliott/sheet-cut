import React, { useEffect, useRef } from 'react';
import './viewBox.css';
import getHexColorByIndex from '../../utils/colorByIndex';
import scrollLeft from '../../utils/scrollLeft';

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
  const {rectangles, printRef} = props;

  const containerRef = useRef(null);
  const prevRectsLengthRef = useRef(rectangles.length);

  let donorBoxTotal = rectangles.length;
  let priceTotal = (rectangles.reduce((acc, r) => acc + r.price, 0)).toFixed(2);
  let prevHeight = 0;
  const cBorder = 250;
  const cMargin = cBorder/2;
  const multiplier = 15;
  const heightIncrement = 400;
  const minWidthSize = 8;
  const minHeightSize = 8;
  
  const windowWidth = window.innerWidth

  // const donorPieceFill = "#a1c5ff";
  const donorPieceFill = "#003d34";
  const donorPieceStroke = "#000";
  const donorTopDimDecrement = 10;
  const donorLeftDimDecrement = 25;
  const donorBottomPriceIncrement = 60;
  const donorSidesFontSize = 30;
  const donorPriceFontSize = 30; 
  const donorSidesTextFill = "#000";
  const donorPriceTextFill = "#000";
  const donorThicknessIncrement = 90;

  // {/*ToBeCut Dimensions List Component***************************************************************/}
  let toBeCutMainSpacing = 0;
  const toBeCutMainSpacingIncrement = 35;
  const toBeCutMainBGIncrement = 93;
  const toBeCutMainBGHeight= 40;
  const toBeCutMainBGMargin = 15;
  const toBeCutMainBottomIncrement = 120;
  const toBeCutMainDimFontSize= 25;
  // {/************************************************************************************************/}
  const toBeCutPieceFill = "#c7dcff";
  const toBeCutPieceStrokeDasharray = 10;
  const toBeCutPieceStroke = "#000";
  const toBeCutTopDimIncrement = 35;
  const toBeCutBottomDimDecrement = 15;
  const toBeCutLeftDimIncrement = 15;
  const toBeCutRightDimDecrement = 15;
  const toBeCutSheetNumFontSize= 25;
  const toBeCutSideDimsFontSize = 25;
  const toBeCutMainDimFill = "#000";
  const toBeCutSideDimsFill = "#FFF";

   // When rectangles length changes
   useEffect(() => {    
    // If row length increases
    if (rectangles.length > prevRectsLengthRef.current) {
      // scrolls to newly added rect
      scrollLeft(containerRef);
    }
    prevRectsLengthRef.current = rectangles.length;
  },[rectangles.length]);

  // Scales font size and spacing to maintain consistency across all SVG viewboxes.
  const scaleWithWindow = (viewBoxWidth, adjVal) => {
    const xlWindowMult = 3;
    const lgWindowMult = 2;
    if(windowWidth > 1200){
      return (((viewBoxWidth * multiplier) + cBorder)/ windowWidth) * (adjVal * xlWindowMult);
    }else if(windowWidth > 768){
      return (((viewBoxWidth * multiplier) + cBorder)/ windowWidth) * (adjVal * lgWindowMult);
    }else{
      return (((viewBoxWidth * multiplier) + cBorder)/ windowWidth) * adjVal;
    }
  }

  // Conditionally render text based on rect width.
  const renderHeightDim = (rect, minWidthSize) => {
    return rect.w > minWidthSize && (
      <>
        {rect.h !== 0 && rect.h}
        {rect.hFrac !== "0" && ` ${rect.hFrac} `}
      </>
    );
  };

  // Conditionally render text based on rect height.
  const renderWidthDim = (rect, minHeightSize) => {
    return rect.h > minHeightSize && (
      <>
        {rect.w !== 0 && rect.w}
        {rect.wFrac !== "0" && ` ${rect.wFrac} `}
      </>
    );
  };
  

  return (
    <div ref={printRef} style={{height: "100%"}}>
      <div className="container view-box-testimonial-group" style={{height: "100%"}}>
        {/*Total Price and Sheets Component***************************************************************/}
        <div className="row text-center d-flex justify-content-between p-2">
          <div className="col-6 text-success">Total Price: ${priceTotal}</div> 
          <div className="col-6 text-primary">Total Sheets: {donorBoxTotal}</div>
        </div>
        {/************************************************************************************************/}
        <div className="row text-center" ref={containerRef} style={{height: "100%"}}>
          {rectangles.map((r, i) =>{ 
            {/*ToBeCut Dimensions List Component***************************************************************/}
            const processedColorIndexes = new Set();
            let setIndex = 0;
            {/*************************************************************************************************/}
            return(
            <div key={i} className="col">
              <svg viewBox={`0 0 ${(r.width * multiplier) + cBorder} ${(r.height * multiplier) + cBorder + heightIncrement}`} width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`donorPieceGradient${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="10%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="40%" stopColor={donorPieceFill} stopOpacity="0.1" />
                  <stop offset="60%" stopColor={donorPieceFill} stopOpacity="0.1" />
                  <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <g key={i}>
            {/* Draw donor piece */}
            <rect
              x={cMargin}
              y={cMargin + prevHeight}
              width={r.width * multiplier}
              height={r.height * multiplier}
              fill={`url(#donorPieceGradient${i})`}
              stroke={donorPieceStroke}
            />
            {/* Draw donor piece dimensions next to corresponding sides */}
            <text 
              x={cMargin + (r.width * multiplier) / 2} 
              y={cMargin - scaleWithWindow(r.width, donorTopDimDecrement) + prevHeight} 
              textAnchor="middle" 
              fontSize={scaleWithWindow(r.width, donorSidesFontSize)}
              fill={donorSidesTextFill}
            >
              {r.width}
            </text>
            <text 
              x={cMargin - scaleWithWindow(r.width, donorLeftDimDecrement)} 
              y={cMargin + (r.height * multiplier) / 2 + prevHeight} 
              textAnchor="middle" 
              fontSize={scaleWithWindow(r.width, donorSidesFontSize)}
              fill={donorSidesTextFill}
            >
              {r.height}
            </text>
            <text 
              x={cMargin + (r.width * multiplier) / 2} 
              y={(cMargin + scaleWithWindow(r.width, donorBottomPriceIncrement)) + (r.height * multiplier)} 
              textAnchor="middle" 
              fontSize={scaleWithWindow(r.width, donorPriceFontSize)} 
              fill={donorPriceTextFill}
            >
              ${r.price} | {r.thicknessText}
            </text>
            {/* <text 
              x={cMargin + (r.width * multiplier) / 2} 
              y={(cMargin + scaleWithWindow(r.width, donorThicknessIncrement) + (r.height * multiplier))}
              fill={toBeCutMainDimFill}
              textAnchor="middle"
              fontSize={scaleWithWindow(r.width, toBeCutMainDimFontSize)}
            >
              {r.thicknessText}
            </text> */}
            {/* Draw piece to-be-cut inside donor piece */}
            {r.boxes.map((b, j) => (
              <g key={j}>
                <defs>
                  <linearGradient id={`toBeCutPieceGradient${i}${j}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                    <stop offset="10%" stopColor="#FFFFFF" stopOpacity="0.5" />
                    <stop offset="40%" stopColor={getHexColorByIndex(b.colorIndex)} stopOpacity="0.3" />
                    <stop offset="60%" stopColor={getHexColorByIndex(b.colorIndex)} stopOpacity="0.3" />
                    <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <rect
                  key={j}
                  x={b.x * multiplier + cMargin}
                  y={b.y * multiplier + cMargin + prevHeight}
                  width={b.width * multiplier}
                  height={b.height * multiplier}
                  fill={`url(#toBeCutPieceGradient${i}${j})`}
                  strokeDasharray={scaleWithWindow(r.width, toBeCutPieceStrokeDasharray)}
                  stroke={toBeCutPieceStroke}
                />
                {/* Draw index of the piece to-be-cut in center of rect */}
                <text
                  x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                  y={(b.y * multiplier + cMargin + prevHeight) + (b.height * multiplier / 2)}
                  fill={toBeCutMainDimFill}
                  textAnchor="middle"
                  fontSize={scaleWithWindow(r.width, toBeCutSheetNumFontSize)}
                >
                  ({b.index + 1})
                </text>
                {/*ToBeCut Dimensions List Component***************************************************************/}
                {/* Draw the dimensions of the piece to-be-cut */}
                {!processedColorIndexes.has(b.colorIndex) && (
                 <>
                 <rect
                  x={0} 
                  y={(cMargin + scaleWithWindow(r.width, toBeCutMainBGIncrement + toBeCutMainSpacing) + (r.height * multiplier))}
                  width="100%" 
                  height={scaleWithWindow(r.width, toBeCutMainBGHeight)} 
                  fill={setIndex % 2 == 0 ? "#eee" : "#fff"}
                />
                 <text
                  x={toBeCutMainBGMargin} 
                  y={(cMargin + scaleWithWindow(r.width, toBeCutMainBottomIncrement + toBeCutMainSpacing) + (r.height * multiplier))}
                  fill={toBeCutMainDimFill}
                  textAnchor="start"
                  fontSize={scaleWithWindow(r.width, toBeCutMainDimFontSize)}
                >
                  #{b.index + 1}
                </text> 
                <text
                  x={cMargin + (r.width * multiplier) / 2} 
                  y={(cMargin + scaleWithWindow(r.width, toBeCutMainBottomIncrement + toBeCutMainSpacing) + (r.height * multiplier))}
                  fill={toBeCutMainDimFill}
                  textAnchor="middle"
                  fontSize={scaleWithWindow(r.width, toBeCutMainDimFontSize)}
                >
                  {b.w !== 0 && ` ${b.w}`}{(b.wFrac !== "0" && b.wFrac !== "") && ` ${b.wFrac}`}" x{b.h !== 0 && ` ${b.h}`}{(b.hFrac !== "0" && b.hFrac !== "") && ` ${b.hFrac}`}"
                </text>
                <text
                  x={cBorder + (r.width * multiplier) - toBeCutMainBGMargin} 
                  y={(cMargin + scaleWithWindow(r.width, toBeCutMainBottomIncrement + toBeCutMainSpacing) + (r.height * multiplier))}
                  fill={toBeCutMainDimFill}
                  textAnchor="end"
                  fontSize={scaleWithWindow(r.width, toBeCutMainDimFontSize)}
                >
                   {`${r.boxQuantity[b.colorIndex]} of ${b.quantity} `}
                </text>
                {/* Update spacing between dimensions */}
                {processedColorIndexes.add(b.colorIndex)}
                {/* Update spacing between dimensions */}
                {toBeCutMainSpacing += toBeCutMainSpacingIncrement}
                {/* Update set Index */}
                {setIndex++}
                </>
                )}
                {/********************************************************************************************************/}
                {/* Draw the top dimension */}
                <text
                  x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                  y={(b.y * multiplier + cMargin + scaleWithWindow(r.width, toBeCutTopDimIncrement) + prevHeight)}
                  fill={toBeCutSideDimsFill}
                  textAnchor="middle"
                  fontSize={scaleWithWindow(r.width, toBeCutSideDimsFontSize)}
                >
                  {renderWidthDim(b, minHeightSize)}
                </text>
                {/* Draw the bottom dimension */}
                <text
                  x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
                  y={(b.y * multiplier + cMargin + b.height * multiplier - scaleWithWindow(r.width, toBeCutBottomDimDecrement) + prevHeight)}
                  fill={toBeCutSideDimsFill}
                  textAnchor="middle"
                  fontSize={scaleWithWindow(r.width, toBeCutSideDimsFontSize)}
                >
                  {renderWidthDim(b, minHeightSize)}
                </text>
                {/* Draw the left dimension */}
                <text
                  x={(b.x * multiplier + cMargin + scaleWithWindow(r.width, toBeCutLeftDimIncrement))}
                  y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                  fill={toBeCutSideDimsFill}
                  textAnchor="start"
                  fontSize={scaleWithWindow(r.width, toBeCutSideDimsFontSize)}
                >
                  {renderHeightDim(b, minWidthSize)}
                </text>
                {/* Draw the right dimension */}
                <text
                  x={(b.x * multiplier + cMargin + b.width * multiplier - scaleWithWindow(r.width, toBeCutRightDimDecrement))}
                  y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
                  fill={toBeCutSideDimsFill}
                  textAnchor="end"
                  fontSize={scaleWithWindow(r.width, toBeCutSideDimsFontSize)}
                >
                  {renderHeightDim(b, minWidthSize)}
                </text>
              </g>
            ))}
            {/*ToBeCut Dimensions List Component***************************************************************/}
            {/* Reset toBeCut dims spacing for each viewbox */}
            {toBeCutMainSpacing = 0}  
            {/************************************************************************************************/}
          </g>
              </svg>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default ViewBoxWrapper;
