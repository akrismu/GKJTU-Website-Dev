import i18n from '../i18n';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import logo from "./navRes/Unbenannt.png"
import hamburger from './navRes/menu.png'
import closeimg from './navRes/close.png'
import './navRes/NavigationBar.css'; 

function NavigationBar() {

  const navigate = useNavigate();
  const menuRef = useRef(); 
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [shadow, setShadow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldSetShadow = window.pageYOffset > 0;
      setShadow(shouldSetShadow);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
          setIsMenuOpen(false); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = (event) => {
    event.preventDefault();
    if (isDropdownOpen) {
      navigate('/about'); 
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
      
    } else {
      setIsDropdownOpen(true);
    }
  };

  const handleClickDropDown = () => {
    setIsMenuOpen(false)
    setIsDropdownOpen(false)
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLang(language); 
  };

  return (
    <header className={`navbar ${shadow ? 'sticky' : ''}`}>
      <div className='navbar__menu-icon' onClick={toggleMenu}>
        <img id='hamburger-icon' src={hamburger.src} alt='hamburger'/>
      </div>
      <div ref={menuRef} className={`navbar__popup-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="close-button" onClick={() => setIsMenuOpen(false)}>
            <img src={closeimg.src} alt="Close" />
        </div>
        <div className='popup-menu-links'>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('navBar.home')}</Link>
          <Link to="/news" onClick={() => setIsMenuOpen(false)}>{t('navBar.news')}</Link>
          <Link to="/churches" onClick={() => setIsMenuOpen(false)}>{t('navBar.churches')}</Link>
          <div className="dropdown" >
              <Link onClick={toggleDropdown}>{t('navBar.about')}</Link>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/about" onClick={() => handleClickDropDown()}>{t('navBar.sinode')}</Link>
                    <Link to="/about/history" onClick={() => handleClickDropDown()}>{t('navBar.history')}</Link>
                    <Link to="/about/mission" onClick={() => handleClickDropDown()}>{t('navBar.mission')}</Link>
                    <Link to="/about/ministrys" onClick={() => handleClickDropDown()}>{t('navBar.ministry')}</Link>
                  </div>
                )}
            </div>
          </div>
      </div>
    <div className="navbar__logo" >
      <Link to="/"><img src={logo.src} alt="Church Logo" /></Link>
    </div>
    <nav className='navbar__links'>
    <Link to="/">{t('navBar.home')}</Link>
          <Link to="/news">{t('navBar.news')}</Link>
          <Link to="/churches">{t('navBar.churches')}</Link>
            <div className="dropdown">
            <Link to="/about" className="dropbtn">{t('navBar.about')}</Link>
              <div className="dropdown-content">
                <Link to="/about">{t('navBar.sinode')}</Link>
                <Link to="/about/history">{t('navBar.history')}</Link>
                <Link to="/about/mission">{t('navBar.mission')}</Link>
                <Link to="/about/ministrys">{t('navBar.ministry')}</Link>
              </div>
            </div>
        
      </nav>
      <div className="navbar__language-switch">
        <button 
          onClick={() => changeLanguage('en')}
          className={currentLang === 'en' ? 'active-lang' : ''}
        >
          EN
        </button>
        <button 
          onClick={() => changeLanguage('id')}
          className={currentLang === 'id' ? 'active-lang' : ''}
        >
          ID
        </button>
      </div>
    </header>
  );
}

export default NavigationBar;