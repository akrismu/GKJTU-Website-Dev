import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { fetchArticles } from '../api';

import filterimg from './newsRes/funnel.png';
import arrowUp from './aboutRes/arrow-down-sign-to-navigate.png';
import arrowDown from './aboutRes/arrow-down-sign-to-navigate - Kopie.png';
import './newsRes/NewsBlock.css';

function NewsBlockPage() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [showChurchOptions, setShowChurchOptions] = useState(false);

  const [filteredArticles, setFilteredArticles] = useState([]);
  const [churches, setChurches] = useState([]);
  const [selectedChurch, setSelectedChurch] = useState('');


  const navigate = useNavigate();
  const filterRef = useRef(); 

  const { t } = useTranslation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticles(i18n.language);
      setNewsArticles(data.docs); // Assuming the articles are in the 'docs' property
    };

    fetchData();
  }, [ i18n.language]);

  useEffect(() => {

    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  useEffect(() => {
    const churchList = Array.from(new Set(newsArticles.map(article => article.church))).sort();
    setChurches(churchList);


    const sortedArticles = [...newsArticles].sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredArticles(sortedArticles);
  }, [newsArticles]);

  useEffect(() => {
    sortAndFilterArticles(newsArticles, selectedChurch, sortOrder);
  }, [selectedChurch, sortOrder, newsArticles]);

  const sortAndFilterArticles = (articles, church, order) => {
    const sortedFilteredArticles = articles
      .filter(article => church === '' || article.church === church)
      .sort((a, b) => order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

    setFilteredArticles(sortedFilteredArticles);
  };

  const handleNavigation = (articleId) => {
    navigate(`/news/${articleId}`);
  };

  return (
    <div>
      <div className="filter-button" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
        <img src={filterimg.src} alt='filterimg' className="filter-image"/>
        <span>{t('newsBlock.filter')}</span>
      </div>
      {showFilterDropdown && (
        <div className="filter-dropdown" ref={filterRef}>
          <div className="dropdown-item" onClick={() => setShowChurchOptions(!showChurchOptions)}>
          {t('newsBlock.chruch')} <img src={showChurchOptions ? arrowUp.src : arrowDown.src} alt="Arrow" className="dropdown-arrow" />
          </div>
          {showChurchOptions && (
            <>
              <div className={`dropdown-subitem ${selectedChurch === '' ? 'selected' : ''}`} onClick={() => setSelectedChurch('')}>
                {t('newsBlock.allChurches')}
              </div>
              {churches.map((church, index) => (
                <div key={index} className={`dropdown-subitem ${selectedChurch === church ? 'selected' : ''}`} onClick={() => setSelectedChurch(church)}>
                  {church}
                </div>
              ))}
            </>
          )}
          <div className="dropdown-item" onClick={() => setShowDateOptions(!showDateOptions)}>
            {t('newsBlock.date')} <img src={showDateOptions ? arrowUp.src : arrowDown.src} alt="Arrow" className="dropdown-arrow" />
          </div>
          {showDateOptions && (
            <div>
              <div  className={`dropdown-subitem ${sortOrder === 'asc' ? 'selected' : ''}`}onClick={() => setSortOrder('asc')}>
                {t('newsBlock.ascending')}
              </div>
              <div  className={`dropdown-subitem ${sortOrder === 'desc' ? 'selected' : ''}`} onClick={() => setSortOrder('desc')}>
                {t('newsBlock.descending')}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="news-listing">
        {filteredArticles.map((article, index) => (
          <div key={index} className="news-article" onClick={() => handleNavigation(article.id)}>
            <h2>{article.title}</h2>
            <div className="article-meta">
              <span className="author">{article.author}</span>
              <span className="date">{new Date(article.date).toLocaleDateString()}</span>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsBlockPage;