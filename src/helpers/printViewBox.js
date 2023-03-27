const print = (printRef) => {
    const content = printRef.current.innerHTML;
    const printWindow = document.getElementById("ifmcontentstoprint").contentWindow;
    printWindow.document.write(`<html><head><title>Print Component</title>
    <style>
      @media print {
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        #print-content {
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
        .testimonial-group > .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 0;
          height: 0;
        }
        .testimonial-group > .row > .col {
          /* Set the width of each column to one-third of the display */
          flex-basis: calc(33.33% - 20px);
          height: calc(33.33% - 20px);
          margin-right: 20px;
          flex-shrink: 0;
          padding: 0;
        }
        .testimonial-group > .row > .col:last-child {
          margin-right: 0;
        }    
        /* Apply styling to the div containing Total Price and Total Sheets */
        .row.text-center.d-flex.justify-content-between.p-2 {
          display: flex;
          justify-content: center;
          align-items: center;
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