import React from 'react';
import getHexColorByIndex from '../../utils/colorByIndex';
import scaleWithWindow from '../../utils/scaleWithWindow';
import {
    prevHeight,
    cMargin, 
    multiplier,
    toBeCutPieceStrokeDasharray,
    toBeCutPieceStroke,
    toBeCutTopDimIncrement,
    toBeCutBottomDimDecrement,
    toBeCutLeftDimIncrement,
    toBeCutRightDimDecrement,
    toBeCutSheetNumFontSize,
    toBeCutSideDimsFontSize,
    toBeCutMainDimFill,
    toBeCutSideDimsFill
} from '../../constants/viewBoxConstants';

const ToBeCutPiece = ({ r, i, b, j }) => {
    const renderIndexMinSizeWH = 1;
    const minWidthSize = 20;
    const minHeightSize = 20;
    
    // Conditionally render index text based on rect width and height.
    const renderIndex = (rect, minSize) => {
      if(rect.w <= minSize || rect.h <= minSize) {
        return null; 
      }
      return (
        <>
          #{rect.index + 1}
        </>
      );
    };

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
        <g>
            <defs>
              <linearGradient id={`toBeCutPieceGradient${i}${j}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={getHexColorByIndex(b.colorIndex)} stopOpacity="0.3" />
                <stop offset="10%" stopColor={getHexColorByIndex(b.colorIndex)} stopOpacity="0.3" />
                <stop offset="40%" stopColor={getHexColorByIndex(b.colorIndex)} stopOpacity="1" />
                <stop offset="60%" stopColor={getHexColorByIndex(b.colorIndex)} stopOpacity="1" />
                <stop offset="90%" stopColor={getHexColorByIndex(b.colorIndex)} stopOpacity="0.3" />
                <stop offset="100%" stopColor={getHexColorByIndex(b.colorIndex)} stopOpacity="0.3" />
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
              dominantBaseline="middle"
            >
              {renderIndex(b, renderIndexMinSizeWH)}
            </text>
            {/* Draw the top dimension */}
            <text
              x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
              y={(b.y * multiplier + cMargin + scaleWithWindow(r.width, toBeCutTopDimIncrement) + prevHeight)}
              fill={toBeCutSideDimsFill}
              textAnchor="middle"
              fontSize={scaleWithWindow(r.width, toBeCutSideDimsFontSize)}
            >
              {renderWidthDim(b, minHeightSize) && renderHeightDim(b, minWidthSize)}
            </text>
            {/* Draw the bottom dimension */}
            <text
              x={(b.x * multiplier + cMargin) + (b.width * multiplier / 2)}
              y={(b.y * multiplier + cMargin + b.height * multiplier - scaleWithWindow(r.width, toBeCutBottomDimDecrement) + prevHeight)}
              fill={toBeCutSideDimsFill}
              textAnchor="middle"
              fontSize={scaleWithWindow(r.width, toBeCutSideDimsFontSize)}
            >
              {renderWidthDim(b, minHeightSize) && renderHeightDim(b, minWidthSize)}
            </text>
            {/* Draw the left dimension */}
            <text
              x={(b.x * multiplier + cMargin + scaleWithWindow(r.width, toBeCutLeftDimIncrement))}
              y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
              fill={toBeCutSideDimsFill}
              textAnchor="start"
              fontSize={scaleWithWindow(r.width, toBeCutSideDimsFontSize)}
              dominantBaseline="middle"
            >
              {renderHeightDim(b, minWidthSize) && renderWidthDim(b, minHeightSize)}
            </text>
            {/* Draw the right dimension */}
            <text
              x={(b.x * multiplier + cMargin + b.width * multiplier - scaleWithWindow(r.width, toBeCutRightDimDecrement))}
              y={(b.y * multiplier + cMargin + (b.height * multiplier / 2) + prevHeight)}
              fill={toBeCutSideDimsFill}
              textAnchor="end"
              fontSize={scaleWithWindow(r.width, toBeCutSideDimsFontSize)}
              dominantBaseline="middle"
            >
              {renderHeightDim(b, minWidthSize) && renderWidthDim(b, minHeightSize)}
            </text>
        </g>
    );
  };
  

  export default ToBeCutPiece;