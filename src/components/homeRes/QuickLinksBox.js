import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import arrowimg from "./arrow.png";
import arrowHover from './arrow-blue.png'
import { fetchChurches } from '../../api';

import './QuickLinksBox.css'; 

function SeeMoreButton() {
  const [arrowSrc, setArrowSrc] = useState(arrowimg); 

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleMouseEnter = () => setArrowSrc(arrowHover); 
  const handleMouseLeave = () => setArrowSrc(arrowimg); 

  return (
    <button
      className="seeMoreButton"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate('/churches')}
    >
      <p className='seeMore'>{t('seeMoreBtn')}</p>
      <img src={arrowSrc.src} alt="Arrow" className='arrowImage'/>
    </button>
  );
}

function QuickLinksBox() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { i18n } = useTranslation();
  const [churches, setChurches] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchChurches(i18n.language);
        setChurches(data.docs);
      };
  
      fetchData();
    }, [ i18n.language]);

    
  const handleNavigation = (churchId) => {

    navigate(`/churches/${churchId}`);
  };

  if (!churches) return <div>Loading...</div>;

  return (
    <div className="quick-links-box">
      <div className='quick-links-box-content'>
        <h2>{t('quickLinks.title')}</h2>
        <p>{t('quickLinks.description')}</p>
        <div className="quick-links">
          {churches.map((church) => (
            <button key={church.id} onClick={() => handleNavigation(church.id)}>
              {church.NameOfTheChurch}
            </button>
          ))}
        </div>
        <div>
          <SeeMoreButton/>
        </div>
      </div>
  </div>

  );
}

export default QuickLinksBox;