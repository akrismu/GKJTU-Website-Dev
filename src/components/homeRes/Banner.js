import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBanner } from '../../api';
import './Banner.css';

function Banner() {
  const { t } = useTranslation();
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
    <div 
      className="banner darker" 
      style={{ 
        backgroundImage: bannerData.image?.url ? `url(${bannerData.image.url})` : 'none',
        backgroundSize: 'auto',
        backgroundPosition: 'left bottom'
      }}
    >
      <h1 className="banner-content">{t('banner.welcomeMessage')}</h1>
    </div>
  );
}

export default Banner;