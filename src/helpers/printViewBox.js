const print = (printRef) => {
    const content = printRef.current.innerHTML;
    const printWindow = document.getElementById("ifmcontentstoprint").contentWindow;
    printWindow.document.write(`<html><head><title>Print Component</title>
    <style>
      @media print {
        html, body {
          width: 50%;
          height: 50%;
          margin: 0;
          padding: 0;
        }
        .print-content {
          width: 100%;
          height: 100%;
          margin: 0 auto;
          display: inline-block;
        }
      }
    </style>
    </head>
    <body>
      <div class="print-content">${content}</div>
    </body>
    </html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

export default print;