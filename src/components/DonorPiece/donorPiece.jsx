import React from 'react';
import ToBeCutPiece from '../ToBeCutPiece/toBeCutPiece';
import scaleWithWindow from '../../utils/scaleWithWindow';
import {
  prevHeight,
  cMargin, 
  multiplier,
  donorPieceFill,
  donorPieceStroke,
  donorTopDimDecrement,
  donorLeftDimDecrement,
  donorSidesFontSize,
  donorSidesTextFill
} from '../../constants/viewBoxConstants';

const DonorPiece = ({ r, i }) => {
    return (
        <g key={i}>
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
            {r.boxes.map((b, j) => (
              <ToBeCutPiece key={j} r={r} i={i} b={b} j={j} />
            ))}
        </g>
    );
  };
  

  export default DonorPiece;