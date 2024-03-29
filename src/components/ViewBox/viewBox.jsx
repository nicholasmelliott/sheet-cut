import React, { useEffect, useRef } from 'react';
import './viewBox.css';
import scrollLeft from '../../utils/scrollLeft';
import ToBeCutDimsList from '../ToBeCutDimsList/toBeCutDimsList';
import DonorPiece from '../DonorPiece/donorPiece';
import DonorPiecePrice from '../DonorPiecePrice/donorPiecePrice';
import {cBorder, multiplier, heightIncrement} from '../../constants/viewBoxConstants';

const ViewBoxWrapper = ({rectangles, printRef, useNewDefs}) => {

  const containerRef = useRef(null);
  const prevRectsLengthRef = useRef(rectangles.length);
 
   // When rectangles length changes
   useEffect(() => {    
    // If row length increases
    if (rectangles.length > prevRectsLengthRef.current) {
      // scrolls to newly added rect
      scrollLeft(containerRef);
    }
    prevRectsLengthRef.current = rectangles.length;
  },[rectangles.length]);

  return (
    <div ref={printRef} className="container">
      <div className="view-box-testimonial-group">
        <div className="row text-center" ref={containerRef}>
          {rectangles.map((r, i) =>{ 
            return(
            <div key={i} className="col">
              <DonorPiecePrice rectangles={r} />
              <ToBeCutDimsList rectangles={r} />
              <svg className="svg-container" viewBox={`0 0 ${(r.width * multiplier) + cBorder} ${(r.height * multiplier) + cBorder + heightIncrement}`} preserveAspectRatio="none">
                <DonorPiece r={r} i={i} useNewDefs={useNewDefs}/>
              </svg>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default ViewBoxWrapper;
