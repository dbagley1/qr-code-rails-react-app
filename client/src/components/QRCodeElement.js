import QRCode from "qrcode-svg";
import { useEffect, useState } from "react";

function QRCodeElement(props) {
  const { data } = props;
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setSvg(new QRCode({
        content: data,
        join: true,
        padding: 0,
      }).svg());
    }
  }, [data]);

  return (
    <div dangerouslySetInnerHTML={{ __html: svg }} />
  );
}

export default QRCodeElement;
