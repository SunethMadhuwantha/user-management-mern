import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { pdfjs } from 'react-pdf';
import PdfComp from './PdfComp';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

function SendPdf() {
    const [title, setTitle] = useState('');
    const [file, saveFile] = useState(null);
    const [allpdf, setAllPdf] = useState([]);
    const [pdfFile, setPDFFile] = useState(null);

    useEffect(() => {
        getpdf();
    }, []);

    const getpdf = async () => {
        try {
            const result = await axios.get('http://localhost:5000/getfile');
            setAllPdf(result.data.data || []);
        } catch (error) {
            console.error('Error fetching PDFs:', error);
        }
    };

    const submitPdf = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        try {
            const result = await axios.post(
                'http://localhost:5000/uploadfile',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            if (result.data.status === 200) {
                alert('PDF uploaded successfully!');
                getpdf();
            } else {
                alert('Failed to upload PDF');
            }
        } catch (error) {
            console.error('Failed uploading:', error.message);
            alert('Failed uploading');
        }
    };

    const showPdf = (pdf) => {
        setPDFFile(`http://localhost:5000/file/${pdf}`);
    };

    return (
        <div>
            <Nav />
            <h1>Send PDF</h1>
            <form onSubmit={submitPdf}>
                <label>PDF Title:</label>
                <br />
                <input
                    required
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Select PDF</label>
                <br />
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => saveFile(e.target.files[0])}
                    required
                />
                <br />
                <br />
                <button>Submit</button>
            </form>

            <div>
                <h4>PDF Details</h4>
                {allpdf.length > 0 ? (
                    allpdf.map((data) => (
                        <div key={data._id}>
                            <h1>Title: {data.title}</h1>
                            <button onClick={() => showPdf(data.pdf)}>View</button>
                        </div>
                    ))
                ) : (
                    <p>No PDFs available</p>
                )}
            </div>
            <PdfComp pdfFile={pdfFile} />
        </div>
    );
}

export default SendPdf;
