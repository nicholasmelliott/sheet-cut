import React from 'react';

const DonorPiecePrice = ({ rectangles }) => {
    
  return (
    <div>
        <div className="row text-center d-flex justify-content-between p-2">
          <div className="col-6 text-success">${rectangles.price}</div>
          <div className="col-6 text-primary">{rectangles.thicknessText}</div>
        </div>
    </div>
  );
};

export default DonorPiecePrice;
