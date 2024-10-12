import React, { useState, useEffect } from 'react';
import { fetchBanner } from '../../api';
import { useTranslation } from 'react-i18next';

import arrowDown from "./arrow-down-sign-to-navigate.png"
import arrowUp from "./arrow-down-sign-to-navigate-blue.png"
import './HistoryPage.css'; 

const TimelineEvent = ({ event, isExpandable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  
  const toggleEvent = () => {
    if(isExpandable) {
      setIsOpen(!isOpen);
    }
  };

  // Always show the description on larger screens
  const shouldShowDescription = isExpandable ? isOpen : true;
  const arrowIcon = isOpen ? arrowUp : arrowDown;

  const arrowStyle = {
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  return (
    <div className="timeline-event" onClick={toggleEvent}>
      {!isExpandable &&<div className="event-marker"></div>}
      <div className="event-content">
        <h3>{event.year}</h3>
        <h3>{t(event.title)} {isExpandable &&<img src={arrowIcon.src} alt="Toggle visibility" className="toggle-visibility" style={arrowStyle} />}</h3>
        {shouldShowDescription && <p>{t(event.description)}</p>}
      </div>
    </div>
  );
};



function HistoryPage() {
  const [isExpandable, setIsExpandable] = useState(false);

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
      const handleResize = () => {
          setIsExpandable(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);
      handleResize(); 
      return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { t } = useTranslation();
  const events = t('historyPage.events', { returnObjects: true });

  if (!bannerData) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="history-page">
      <div className="banner darker" style={{ backgroundImage: bannerData.image?.url ? `url(${bannerData.image.url})` : 'none', backgroundSize: 'cover',
    backgroundPosition: 'center'}}>
        <div className="banner-content">
          <h1>{t('historyPage.title')}</h1>
          <div className='divider'></div>
        </div>
      </div>
      <h2 className='TimelineHeading'>{t('historyPage.timeline')}</h2>
      <div className="timeline-container">
        <div className="timeline">
        {events.map((event, index) => (
          <TimelineEvent key={index} event={event} isExpandable={isExpandable} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;