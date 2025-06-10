import './i18n';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ChurchesListPage from './components/ChurchesListPage';
import ChurchDetailPage from './components/churches/ChurchDetailPage';
import Footer from './components/Footer';
import NewsBlock from "./components/NewsBlock";
import HistoryPage from './components/aboutRes/historyPage';
import MissionPage from './components/aboutRes/missionPage';
import NewsDetailPage from './components/newsRes/NewsDetailPage';
import MinistryPage from './components/aboutRes/ministryPage';
import KoinoniaSite from './components/aboutRes/ministrySites/koinoniaSite';
import MaturiaSite from './components/aboutRes/ministrySites/maturiaSite';
import DiakoniaSite from './components/aboutRes/ministrySites/diakoniaSite';
import SpiritualSite from './components/aboutRes/ministrySites/spiritualSite';
import Partners from './components/Patner'
import 'leaflet/dist/leaflet.css';



function App() {

  return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage  />} /> 
          <Route path="/about" element={<AboutPage />} />
          <Route path="/churches" element={<ChurchesListPage  />} />
          <Route path="/churches/:id" element={<ChurchDetailPage  />} />
          <Route path="/about/history" element={<HistoryPage />} />
          <Route path="/about/mission" element={<MissionPage />} />
          <Route path="/news" element={<NewsBlock />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/about/ministrys" element={<MinistryPage />} />
          <Route path='/about/ministrys/Koinonia' element={<KoinoniaSite />} />
          <Route path='/about/ministrys/Mauturia' element={<MaturiaSite />} />
          <Route path='/about/ministrys/Diakonia' element={<DiakoniaSite />} />
          <Route path='/about/ministrys/Spiritual' element={<SpiritualSite />} />
          <Route path='/patners' element={<Partners/>} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;