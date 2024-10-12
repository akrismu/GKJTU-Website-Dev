import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewsCards from '../homeRes/NewsCards';

import './ChurchDetailPage.css';
import { fetchChurchById } from '../../api';

function ChurchDetailPage() {
  const [church, setChurch] = useState(null);
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const churchDetails = await fetchChurchById(id, i18n.language);
      setChurch(churchDetails);
    };
    fetchData();
  }, [id, i18n.language]);

  if (!church) return <div>Loading...</div>;

  return (
    <div className="church-detail-page">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${church.bannerUrl.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="banner-content">
          <h1>{church.NameOfTheChurch}</h1>
          <div className="divider"></div>
        </div>
      </div>
      <div className="church-detail-content">
        <div className="church-detail-text">
          <h1>{church.NameOfTheChurch}</h1>
          <h2>{t('churchPages.history')}</h2>
          <div className="church-description" dangerouslySetInnerHTML={{__html: church.description_html}}></div>
          <h2>{t('churchPages.service')}</h2>
          {church.services.map((item) => (
            <p key={item.id}>{item.service}</p>
          ))}
          <h2>{t('churchPages.contact')}</h2>
          <p>{church.contact.name}</p>
          <p>{church.contact.phone}</p>
          <p>{church.contact.address}</p>
        </div>
        {church.images.map((img) => (
          <img
            key={img.id}
            src={img.img.url}
            alt={`Church View ${img.id}`}
            className="church-img"
          />
        ))}
      </div>

      <NewsCards />
    </div>
  );
}

export default ChurchDetailPage;