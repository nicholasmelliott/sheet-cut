import React from 'react';

const ToBeCutDimensionsList = ({ rectangles }) => {
  const toBeCutMainBGIncrement = 0;
  const toBeCutMainBGHeight = 40;
  const toBeCutMainBGMargin = 15;
  const toBeCutMainDimFontSize = 25;
  const toBeCutMainDimFill = "#000";
  const toBeCutSideDimsFill = "#FFF";

  return (
    <div>
      {rectangles.map((r, i) => {
        const processedColorIndexes = new Set();
        let setIndex = 0;
        console.log(r);
        return (
          <div key={i}>
            {r.boxes.map((b, j) => {
              const backgroundColor = setIndex % 2 === 0 ? "#eee" : "#fff";
                console.log(b);
              if (!processedColorIndexes.has(b.colorIndex)) {
                processedColorIndexes.add(b.colorIndex);
                setIndex++;
                return (
                    <div key={j}>
                    <div
                      className="row"
                      style={{
                        width: "100%",
                        height: toBeCutMainBGHeight,
                        backgroundColor: backgroundColor,
                        border: "1px solid #eee",
                        borderRadius: "10px",
                        marginBottom: toBeCutMainBGIncrement,
                      }}
                    >
                      <div className="col-4">
                        <span
                          style={{
                            fill: toBeCutMainDimFill,
                            fontSize: toBeCutMainDimFontSize,
                            marginLeft: toBeCutMainBGMargin,
                            height: "10px"
                          }}
                        >
                          #{b.index + 1}
                        </span>
                      </div>
                      <div className="col-4">
                        <span
                          style={{
                            fill: toBeCutMainDimFill,
                            fontSize: toBeCutMainDimFontSize,
                            textAlign: "center",
                          }}
                        >
                          {b.w !== 0 && ` ${b.w}`}
                          {b.wFrac !== "0" && b.wFrac !== "" && ` ${b.wFrac}"`} x
                          {b.h !== 0 && ` ${b.h}`}
                          {b.hFrac !== "0" && b.hFrac !== "" && ` ${b.hFrac}"`}
                        </span>
                      </div>
                      <div className="col-4">
                        <span
                          style={{
                            fill: toBeCutMainDimFill,
                            fontSize: toBeCutMainDimFontSize,
                            textAlign: "end",
                          }}
                        >
                          {`${r.boxQuantity[b.colorIndex]} of ${b.quantity}`}
                        </span>
                      </div>
                    </div>
                  </div>
                         
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ToBeCutDimensionsList;
