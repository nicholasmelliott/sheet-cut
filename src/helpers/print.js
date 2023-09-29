const print = (printViewBoxRef, printTotalsRef) => {
    const content = printViewBoxRef.current.innerHTML;
    const totalsContent = printTotalsRef.current.innerHTML;
    const printWindow = document.getElementById("ifmcontentstoprint").contentWindow;
    printWindow.document.write(`<html><head><title>Print Component</title>
    <style>
      @media print {
        html, body {
          width: auto;
          height: 800px;
          margin: 0;
          padding: 0;
        }
        #print-content {
          width: auto;
          height: auto;
          margin: 0 auto;   
        }
        .view-box-testimonial-group > .row {
          height: auto;
          display: block;
        }
        .view-box-testimonial-group > .row > .col {
          display: inline-block;
          width: 30%;
          height: 40%;
          padding: 1.5%
        }
        /* Apply styling to the div containing Total Price and Total Sheets */
        .row.text-center.d-flex.justify-content-between.p-2 {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 0;
          margin: 20px;
        }
        .col-6.text-success, .col-6 {
          text-align: left;
          margin-right: 20px;
        }
        .col-6.text-primary, .col-6 {
          text-align: right;
          margin-left: 20px;
        }
        rect {
          fill: none;
        }
        
        /* Apply styling to ToBeCutDimsList component */
        .main {
          display: block;
          margin: 0;
          padding: 0;
          width: 100%;
          border: 1px solid lightGray;
          border-radius: 5px;
        }
  
        .box-index, .box-dims, .box-quantity {
          display: inline-block;
          margin: 0;
          padding: 0;
          // height: 5%;
          // padding: 1.5%
        }
  
        .box-index {
          width: 20%;
        }
  
        .box-dims {
          width: 60%;
          text-align: center;
        }
  
        .box-quantity {
          width: 20%;
        }
      }
    </style>
    </head>
    <body>
      <div>${totalsContent}</div>
      <div id="print-content">${content}</div>
    </body>
    </html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

export default print;