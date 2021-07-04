export const printPage = () => {
  // Get HTML to print from element
  const prtHtml = document.getElementById("print").innerHTML;

  // Get all stylesheets HTML
  let stylesHtml = "";
  for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
    stylesHtml += node.outerHTML;
  }

  // Open the print window
  const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

  WinPrint.document.write(`<!DOCTYPE html>
  <html>
    <head>
      ${stylesHtml}
      <style>
        .uitleg {
          flex-direction: column;
          margin: 0;
        }
        .uitleg img {
          align-self: flex-start;
          margin: 3rem 0;
        }
      </style>
    </head>
    <body>
      ${prtHtml}
    </body>
  </html>`);

  WinPrint.document.close();
  window.setTimeout(() => {WinPrint.focus(); WinPrint.print()}, 1000);
}