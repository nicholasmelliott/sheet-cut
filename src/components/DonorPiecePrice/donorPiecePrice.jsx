import React from 'react';

const DonorPiecePrice = ({ rectangles }) => {
    
  return (
    <div>
        <div className="row text-center d-flex justify-content-between p-2">
          <div className="col-6">${rectangles.price}</div>
          <div className="col-6">{rectangles.thicknessText}</div>
        </div>
    </div>
  );
};

export default DonorPiecePrice;
