import React from 'react';
import './toBeCutDimsList.css';

const ToBeCutDimensionsList = ({ rectangles }) => {
  
  const processedColorIndexes = new Set();
  let setIndex = 0;

  return (
    <div>
      {rectangles.boxes.map((box) => {
        const backgroundColor = setIndex % 2 === 0 ? "#eee" : "#fff";
        if (!processedColorIndexes.has(box.colorIndex)) {
          processedColorIndexes.add(box.colorIndex);
          setIndex++;
          return (
            <div key={box.index}>
              <div className="row main" style={{ backgroundColor: backgroundColor, margin: 0}}>
                <div className="col-3 text-start box-index">
                  <span>
                    #{box.index + 1}
                  </span>
                </div>
                <div className="col-6 box-dims">
                  <span>
                    {box.w !== 0 && ` ${box.w}`}
                    {box.wFrac !== "0" && box.wFrac !== "" && ` ${box.wFrac}`}" x
                    {box.h !== 0 && ` ${box.h}`}
                    {box.hFrac !== "0" && box.hFrac !== "" && ` ${box.hFrac}`}"
                  </span>
                </div>
                <div className="col-3 text-end box-quantity" style={{paddingLeft: "0px"}}>
                  <span>
                    {`${rectangles.boxQuantity[box.colorIndex]} of ${box.quantity}`}
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
