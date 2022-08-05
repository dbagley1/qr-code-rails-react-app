import { Button } from "../styles";

function QRCodeDownloadButtons(props) {
  const { label } = props;

  function downloadSvg() {
    const svg = document.querySelector(props.svgSelector);
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    let filename = props.fileName || "qr-code-" + new Date().getTime();
    filename = filename.replace(/[\\/:*?"<>|\.]/g, "_") + '.svg';

    link.href = url;
    link.download = filename;
    link.click();
  }

  return (
    <div style={{ display: "grid" }}>
      <Button color="secondary" onClick={downloadSvg} download>
        {label || 'Download SVG'}&nbsp;&nbsp;
        <i class="fa fa-download fa-6" aria-hidden="true"></i>
      </Button>
    </div>
  );
}

export default QRCodeDownloadButtons;
