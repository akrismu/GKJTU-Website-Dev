// app/downloads/page.js
import SimpleDownloadList from '../../components/SimpleDownloadList.js';

export default function DownloadsPage() {
  return (
    <div className="downloads-page">
      <div className="container">
        <h1>Downloads</h1>
        <SimpleDownloadList />
      </div>
    </div>
  );
}