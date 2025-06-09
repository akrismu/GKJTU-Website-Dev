// components/SimpleDownloadList.js
import { useState, useEffect } from 'react';

export default function SimpleDownloadList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/downloads/metadata.json')
      .then(res => res.json())
      .then(data => {
        setPdfs(data.pdfs);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fehler beim Laden der Downloads:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Downloads werden geladen...</div>;
  }

  return (
    <div className="download-list">
      <h2>Verfügbare Downloads</h2>
      {pdfs.length === 0 ? (
        <p>Keine Downloads verfügbar.</p>
      ) : (
        pdfs.map(pdf => (
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
        ))
      )}
    </div>
  );
}