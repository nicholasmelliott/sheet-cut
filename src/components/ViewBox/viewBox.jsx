import React, { useEffect, useRef } from 'react';
import './viewBox.css';
import scrollLeft from '../../utils/scrollLeft';
import ToBeCutDimsList from '../ToBeCutDimsList/ToBeCutDimsList';
import DonorPiece from '../DonorPiece/donorPiece';
import {cBorder, multiplier, heightIncrement} from '../../constants/viewBoxConstants';

const ViewBoxWrapper = ({rectangles, printRef}) => {

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
    <div ref={printRef} style={{height: "100%"}}>
      <div className="container view-box-testimonial-group" style={{height: "100%"}}>
        <div className="row text-center" ref={containerRef} style={{height: "100%"}}>
          {rectangles.map((r, i) =>{ 
            return(
            <div key={i} className="col">
              <svg viewBox={`0 0 ${(r.width * multiplier) + cBorder} ${(r.height * multiplier) + cBorder + heightIncrement}`} width="100%" height="100%" preserveAspectRatio="none">
                <DonorPiece r={r} i={i} />
              </svg>
              <ToBeCutDimsList rectangles={r} />
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default ViewBoxWrapper;
