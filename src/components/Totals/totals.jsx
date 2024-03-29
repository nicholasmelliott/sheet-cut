import React from 'react';

const Totals = ({ rectangles, printRef }) => {
  const donorBoxTotal = rectangles.length;
  const priceTotal = rectangles.reduce((acc, r) => acc + r.price, 0).toFixed(2);

  if (rectangles.some(r => typeof r.price !== 'number')) {
    throw Error("Some rectangle objects have invalid 'price' property");
  }

  if (!Number.isInteger(donorBoxTotal) || donorBoxTotal < 0) {
    throw Error("Invalid donor total");
  }

  return (
    <div ref={printRef}>
        <div className="row text-center d-flex justify-content-between p-2">
          <div className="col-6 text-success">Total Price: ${priceTotal}</div>
          <div className="col-6 text-primary">Total Donor Sheets: {donorBoxTotal}</div>
        </div>
    </div>
  );
};

export default Totals;
