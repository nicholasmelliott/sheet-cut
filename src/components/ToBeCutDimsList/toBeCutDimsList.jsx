import React from 'react';
import './toBeCutDimsList.css';

const ToBeCutDimensionsList = ({ rectangles }) => {
  
  const processedColorIndexes = new Set();
  let setIndex = 0;

  return (
    <div>
      {rectangles.boxes.map((b, j) => {
        const backgroundColor = setIndex % 2 === 0 ? "#eee" : "#fff";
          console.log(b);
        if (!processedColorIndexes.has(b.colorIndex)) {
          processedColorIndexes.add(b.colorIndex);
          setIndex++;
          return (
            <div key={j}>
              <div className="row main" style={{ backgroundColor: backgroundColor, margin: 0}}>
                <div className="col-3 text-start box-index">
                  <span>
                    #{b.index + 1}
                  </span>
                </div>
                <div className="col-6 box-dims">
                  <span>
                    {b.w !== 0 && ` ${b.w}`}
                    {b.wFrac !== "0" && b.wFrac !== "" && ` ${b.wFrac}`}" x
                    {b.h !== 0 && ` ${b.h}`}
                    {b.hFrac !== "0" && b.hFrac !== "" && ` ${b.hFrac}`}"
                  </span>
                </div>
                <div className="col-3 text-end box-quantity" style={{paddingLeft: "0px"}}>
                  <span>
                    {`${rectangles.boxQuantity[b.colorIndex]} of ${b.quantity}`}
                  </span>
                </div>
              </div>
            </div>         
          );
        }
      })}
    </div>
  );
};

export default ToBeCutDimensionsList;
