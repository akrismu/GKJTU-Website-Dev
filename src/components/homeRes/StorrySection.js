import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchBanner, fetchImages } from '../../api';

import './StorrySection.css'; 
import arrowimg from "./arrow.png";
import arrowHover from './arrow-blue.png'

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
      onClick={() => navigate('/about/history')}
    >
      <p className='seeMore'>{t('seeMoreBtn')}</p>
      <img src={arrowSrc.src} alt="Arrow" className='arrowImage'/>
    </button>
  );
}

function StorrySection() {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const imgID = 'home'

  const [imgData, setimgData] = useState(null);

  useEffect(() => {
    const loadBanner = async () => {
      const data = await fetchImages(imgID);
      if (data) {
        setimgData(data.docs[0]);
      } else {
        console.error('Failed to load banner');
      }
    };
 
    loadBanner();
  }, []);

  if (!imgData) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  function handleClick() {
    navigate('/about/history'); 
  }

  return (
      <div className='story'>
        <div>
          <h2>{t('storySection.title')}</h2>
          <p>{t('storySection.description')}</p>
          <div className="container">
            <div>
              <div className="story-card" onClick={handleClick}>
                <h3>{t('storySection.storyTitle')}</h3>
                <p>{t('storySection.story')}</p>
                <p className='moreButton'>{t('storySection.more')}</p>
              </div>
              <SeeMoreButton/>
            </div>
            <div className="story-image">
              <img src={imgData.image?.url? imgData.image.url : null} alt="Church Activity" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default StorrySection;