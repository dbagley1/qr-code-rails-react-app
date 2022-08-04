import QRCode from "qrcode-svg";
import { useEffect, useState } from "react";

function QRCodeElement(props) {
  const [data, setData] = useState(props.data);
  const [svg, setSvg] = useState('');
  const [svgBlob, setSvgBlob] = useState('');
  // const [pngBlob, setPngBlob] = useState('');

  useEffect(() => {
    let svgQR = new QRCode({
      content: data || "Hello World",
      join: true,
      padding: 2,
      width: 800,
      height: 800,
    }).svg();

    setSvg(svgQR);

    let svgURL = URL.createObjectURL(new Blob([svgQR], { type: "image/svg+xml" }));
    setSvgBlob(svgURL);

    /*  Todo: Add PNG Download   
      let canvas = document.querySelector('canvas');
      Canvg.from(canvas.getContext('2d'), svgQR).then(v => v.start());
      setPngBlob(canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream"));
   */
  }, [data]);


  return (
    <div>
      <a href={svgBlob} download>Download SVG</a>
      {/* <a href={pngBlob} download>Download SVG</a> */}
    </div>
  );
}

export default QRCodeElement;
