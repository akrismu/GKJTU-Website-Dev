import React from 'react';
import ChurchesMap from './churchListRes/ChruchMap'; 
import { useTranslation } from 'react-i18next';
import './churchListRes/ChurchesListPage.css'; 

function ChurchesListPage() {
  const { t } = useTranslation();

  const churchList = t('churchList', {returnObjects: true});

  return (
    <div>
      <div className="churches-list-page">
        <ChurchesMap /> 
      </div>
      <div className='church-text'>
        <h2>{t('churchList.title')}</h2>
        <div>
          {churchList.story.map((stor, index) => (
            <p key={index}>
              {stor}
            </p>

          ))}
        </div>
      </div>
    </div>
  );
}

export default ChurchesListPage;