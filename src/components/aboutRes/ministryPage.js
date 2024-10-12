import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowPNG from "./arrow-down-sign-to-navigate-blue.png";
import { useTranslation } from 'react-i18next';

import "./ministry.css";

function MinistryPage() {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const departments = t('ministryPage.departments', { returnObjects: true });

    return (
      <div>
        <div className="ministry-listing">
          {departments.map((ministry, index) => (
            <div key={index} className="ministry-item" onClick={ ()=> navigate(`/about/ministrys/${ministry.link}`)}>
              <div className="ministry-content">
                <h2>{ministry.title}</h2>
                <p className="description">{ministry.description}</p>
              </div>
              <img src={ArrowPNG.src} alt="arrow" className="arrow-icon"/>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default MinistryPage;