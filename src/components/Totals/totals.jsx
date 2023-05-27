import React, { useRef } from 'react';

const Totals = ({ rectangles, printRef }) => {
  const donorBoxTotal = rectangles.length;
  const priceTotal = rectangles.reduce((acc, r) => acc + r.price, 0).toFixed(2);

  return (
    <div ref={printRef}>
        <div className="row text-center d-flex justify-content-between p-2">
          <div className="col-6 text-success">Total Price: ${priceTotal}</div>
          <div className="col-6 text-primary">Total Sheets: {donorBoxTotal}</div>
        </div>
    </div>
  );
};

export default Totals;
