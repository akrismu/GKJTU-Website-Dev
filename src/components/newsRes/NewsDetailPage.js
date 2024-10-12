import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchArticleById } from '../../api';

import styles from './NewsDetailPage.css';

function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticleById(id, i18n.language);
      setArticle(data);
      console.log(data)
    };

    fetchData();
  }, [id, i18n.language]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.newsDetailPage}>
      <div className="banner" style={{ backgroundImage: `url(${article.bannerImage.url})`}}>
        <div className="banner-content">
          <h1>{article.title}</h1>
        </div>
      </div>

      <div className="news-detail-page">
        
      <div className="news-content" dangerouslySetInnerHTML={{__html: article.content_html}}></div>

        {article.images && article.images.length > 0 && (
          <div className="news-images">
            {article.images.map((imgData, index) => (
              <div key={index} className="image-container">
                <img
                  src={imgData.image.url}
                  className="news-article-image"
                  alt='News Article image'
                />
                {imgData.image.description && (
                  <em className="image-description">{imgData.image.description}</em>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsDetailPage;
