import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const TestDownload = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: () => componentRef,
    documentTitle: "Test Document",
    onAfterPrint: () => console.log("Print successful"),
  });

  return (
    <div>
      <h1>Test Download Page</h1>
      {/* Printable content */}
      <div ref={componentRef} style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h2>Document Title</h2>
        <p>This is the content that will be downloaded or printed.</p>
        <p>Ensure this block is properly referenced.</p>
      </div>
      <button onClick={handlePrint} style={{ marginTop: "20px" }}>
        Download PDF
      </button>
    </div>
  );
};

export default TestDownload;
