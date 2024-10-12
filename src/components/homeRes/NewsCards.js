import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { fetchArticles } from '../../api';
import arrowImage from '../newsRes/arrow-white.png'
import arrowSeeMore from "./arrow.png";
import arrowHover from './arrow-blue.png'
import './NewsCards.css';

function SeeMoreButton() {
  const [arrowSrc, setArrowSrc] = useState(arrowSeeMore.src);
  const navigate = useNavigate();

  const handleMouseEnter = () => setArrowSrc(arrowHover.src);
  const handleMouseLeave = () => setArrowSrc(arrowSeeMore.src);

  return (
    <button
      className="seeMoreButton"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate('/news')}
    >
      <p className='seeMore'>See More</p>
      <img src={arrowSrc} alt="Arrow" className='arrowImage'/>
    </button>
  );
}

function NewsCards() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [newsArticles, setNewsArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticles(i18n.language);
      setNewsArticles(data.docs);
    };

    fetchData();
  }, [i18n.language]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsArticles.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsArticles.length) % newsArticles.length);
  };

  const shownImages = Math.min(3, newsArticles.length);

  if (newsArticles.length === 0) {
    return <div></div>;
  }

  const carouselStyle = {
    transform: `translateX(-${currentIndex * 105}%)`
  };

  return (
    <div className={`news-container ${shownImages === 1 ? "one-slide" : shownImages === 2 ? "two-slides" : ""}`}>
      <div className="news-carousel" >
        {newsArticles.map((article) => (
          <div 
            className="news-block"
            key={article.id} 
            onClick={() => navigate(`/news/${article.id}`)}
            style={carouselStyle}
          >
            <div className="news-image-container">
              <img src={article.previewImage.url} alt={article.title}/>
            </div>
            <div className="news-info">
              <h3>{article.title}</h3>
              <span className="news-date">{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='navigation'>
        <div className='dummyDiv'></div>
        <div className='news-navigation'>
          <button onClick={handlePrevious} className='navigation-button'><img src={arrowImage.src} alt='arrowImage' width={'15px'}/></button>
          <button onClick={handleNext} className='navigation-button'><img src={arrowImage.src} alt='arrowImage' id='nexzImg' width={'15px'}/></button>
        </div>
        <SeeMoreButton/>
      </div>
    </div>
  );
}

export default NewsCards;