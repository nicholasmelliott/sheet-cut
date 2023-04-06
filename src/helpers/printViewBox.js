const print = (printRef) => {
    const content = printRef.current.innerHTML;
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
          width: 33.33%;
          height: 33.33%;
        }
        /* Apply styling to the div containing Total Price and Total Sheets */
        .row.text-center.d-flex.justify-content-between.p-2 {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 0;
          margin: 20px;
        }
        .col-6.text-success {
          text-align: left;
          margin-right: 20px;
        }
        .col-6.text-primary {
          text-align: right;
          margin-left: 20px;
        }
        rect {
          fill: none;
        }
      }
    </style>
    </head>
    <body>
      <div id="print-content">${content}</div>
    </body>
    </html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

export default print;