import React from 'react'
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            {props.pdfFile ? (
                <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from({ length: numPages }, (_, i) => (
                        <Page
                            key={i}
                            pageNumber={i + 1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    ))}
                </Document>
            ) : (
                <p>No PDF selected</p>
            )}
            {numPages && (
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            )}
        </div>
    );
}


export default PdfComp