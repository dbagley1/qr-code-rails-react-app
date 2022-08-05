// import QRCode from "qrcode-svg";
// import { useEffect, useRef, useState } from "react";

function QRCodeElement(props) {
  function downloadSvg() {
    const svg = document.querySelector(props.svgSelector);
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    let filename = props.fileName || "qr-code-" + new Date().getTime();
    filename = filename.replace(/[\\/:*?"<>|]/g, "_");

    link.href = url;
    link.download = filename;
    link.click();
  }

  /*   useEffect(() => {
      let svgQR = new QRCode({
        content: data || "Hello World",
        join: true,
        padding: 2,
        width: 800,
        height: 800,
      }).svg();
  
      setSvg(svgQR);
  
      let svgURL = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
      setSvgBlob(svgURL);
  
      // Todo: Add PNG Download   
      //  let canvas = document.querySelector('canvas');
      //  Canvg.from(canvas.getContext('2d'), svgQR).then(v => v.start());
      //  setPngBlob(canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream"));
    }, [data, svg]);
   */

  return (
    <div>
      <button onClick={downloadSvg} download>Download SVG</button>
      {/* <a href={pngBlob} download>Download SVG</a> */}
    </div>
  );
}

export default QRCodeElement;
