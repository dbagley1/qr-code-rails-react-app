import QRCode from "qrcode-svg";
import { useEffect, useState } from "react";

function QRCodeElement(props) {
  const { url, size, color, containerId } = props;
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    if (url && url.length > 0) {
      setSvg(new QRCode({
        content: url,
        color: color || '#000000',
        join: true,
        padding: 0,
        width: size || 200,
        height: size || 200,
        container: "svg-viewbox",
      }).svg());
    }
  }, [url, color, size]);

  return (
    <div dangerouslySetInnerHTML={{ __html: svg }}
      id={containerId} />
  );
}

export default QRCodeElement;
