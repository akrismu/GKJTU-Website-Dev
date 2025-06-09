// components/SimpleDownloadList.jsx
import { useState, useEffect } from 'react';

export default function SimpleDownloadList() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetch('/downloads/metadata.json')
      .then(res => res.json())
      .then(data => setPdfs(data.pdfs));
  }, []);

  return (
    <div className="download-list">
      {pdfs.map(pdf => (
        <div key={pdf.id} className="download-item">
          <h3>{pdf.title}</h3>
          <p>{pdf.description}</p>
          <div className="download-info">
            <span>Größe: {pdf.size}</span>
            <span>Datum: {pdf.uploadDate}</span>
          </div>
          <a
            href={`/downloads/pdfs/${pdf.filename}`}
            download
            className="download-button"
          >
            PDF herunterladen
          </a>
        </div>
      ))}
    </div>
  );
}