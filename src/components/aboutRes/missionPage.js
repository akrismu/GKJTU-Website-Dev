import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next'; 
import { fetchBanner } from '../../api';
import './MissionPage.css';

function MissionPage() {
  const { t } = useTranslation();
  const statements = t('missionPage.statements', { returnObjects: true });

  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const bannerID = `home`;
    const loadBanner = async () => {
      const data = await fetchBanner(bannerID);
      if (data) {
        setBannerData(data.docs[0]);
      } else {
        console.error('Failed to load banner');
      }
    };
 
    loadBanner();
  }, []);

  if (!bannerData) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="mission-page">
      <div className="banner darker" style={{ backgroundImage: bannerData.image?.url ? `url(${bannerData.image.url})` : 'none',}}>
        <div className="banner-content">
          <h1>{t('missionPage.title')}</h1>
          <div className='divider'></div>
          <p>{t('missionPage.description')}</p>
        </div>
      </div>
      {statements.map((statement, index) => (
        <section key={index} className="mission-section">
          <div className="mission-header">
            <h2>{statement.title}</h2>
            {statement.description && <p className="mission-description">{statement.description}</p>}
          </div>
          <ol className="mission-text">
            {statement.text.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

export default MissionPage;
