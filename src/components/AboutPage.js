import React, { useState, useEffect }  from 'react';
import { useTranslation } from 'react-i18next';
import { fetchEmployees, fetchBanner } from '../api'

import './aboutRes/sinodePage.css';



const Section = ({ title, people }) => (
  <div className="section">
    <h2>{title}</h2>
    <div className="employee-grid">
      {people.map(person => (
        <EmployeeCard key={person.id} employee={person} />
      ))}
    </div>
  </div>
);

const EmployeeCard = ({ employee }) => {

  return(
  <div className="employee-card">
    <div className="employee-image-wrapper">
      <img src={employee.picture.url} alt={`Headshot of ${employee.name}`} className="employee-image"/>
    </div>
    <div className="employee-info">
      <h3>{employee.name}</h3>
      <p className="role">{employee.Job}</p>
    </div>
  </div>
  )};

const AboutPage = () => {
  
  const { t } = useTranslation();

  const [bannerData, setBannerData] = useState(null);

  const [charimen, setCharimen] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const bannerID = `home`;
    async function loadData() {
      try {
        const { charimen, employees } = await fetchEmployees();
        setCharimen(charimen);
        setEmployees(employees);
      } catch (e) {
        setError('Failed to fetch employee data');
        console.error(e);
      }
    }

    async function loadBanner() {
      try {
        const data = await fetchBanner(bannerID);
        if (data) {
          setBannerData(data.docs[0]);
        } else {
          setError('Failed to load banner');
        }
      } catch (e) {
        setError('Failed to fetch banner data');
        console.error(e);
      }
    }

    Promise.all([loadData(), loadBanner()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return(
    <div>
      {bannerData && (
        <div 
          className="banner darker" 
          style={{ 
            backgroundImage: bannerData.image?.url ? `url(${bannerData.image.url})` : 'none', 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        <div className="banner-content">
          <h1>{t('aboutPage.title')}</h1>
          <div className="divider"></div>
          <p>{t('aboutPage.description')}</p>
        </div>
      </div>
      )}
      <div className="about-page">
        <Section title={t('aboutPage.chairmen')} people={charimen} />
        <Section title={t('aboutPage.employee')} people={employees} />
      </div>
    </div>
  );
  }
export default AboutPage;
