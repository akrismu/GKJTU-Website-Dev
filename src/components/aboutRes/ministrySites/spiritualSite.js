import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBanner } from '../../../api';

import './general.css'; 


function SpiritualSite() {

  const { t } = useTranslation();

  const departments = t('Spiritual.departments', { returnObjects: true });
  /* const goals = t('Spiritual.goal', { returnObjects: true }); */  const images = t('Spiritual.images', { returnObjects: true });

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
    <div className="ministry-page">
      <div className="banner darker" style={{ backgroundImage:bannerData.image?.url ? `url(${bannerData.image.url})` : 'none', backgroundSize: 'cover', 
    backgroundPosition: 'top'}}>
        <div className='banner-content'>
          <h1>{t('Spiritual.header')}</h1>
          <div className='divider'></div>
        </div>
      </div>
      <div className='ministry-content'>
        <section className='ministry-introduction'>
          <h2>{t('ministryPage.about')}</h2>  
          <p>{t('Spiritual.description')}</p>
        </section>
        <section className='ministry-departments'>
          <h1>{t('ministryPage.depart')}</h1>
          {departments.map((department, index) => (
              <article key={index} className='indent'>
                  <h3>{department.titel}</h3>
                  <p>{department.description}</p>
                  <ul className='department-programm'>
                    {department.program.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
              </article>
            ))}
        </section>
        <section className='image-wrapper'>
          {images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Church View ${index + 1}`}
                className="department-image"
              />
        ))}           
        </section>
      </div>

   </div>
  );
}

export default SpiritualSite;

