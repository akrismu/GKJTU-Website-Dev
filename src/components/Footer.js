import React from 'react';
import './footerRes/Footer.css'; 
import ChurchLogo from './navRes/Unbenannt.png'; 
import YoutubeIco from'./footerRes/social media icon/youtube.png';
import InstagramIco from'./footerRes/social media icon/instagram.png';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img id="footer-logo" src={ChurchLogo.src} alt="Church Logo" />
        </div>
        <div className="footer-section footer-emails-address">
          <p>Addr: Jl. Letjend Sukowati 74 Salatiga - Indonesia</p>
          <p>Tel: +62 298-321149</p>
          <p>Email: gkjtu@indo.net.id</p>
        </div>
        <div className="footer-section footer-social-media">
          <img className="SocialMediaIco" src={YoutubeIco.src} alt='Youtube'></img>
          <img className="SocialMediaIco" src={InstagramIco.src} alt='Instagram'></img>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Gereja Kristen Jawa Tengah Utara</p>
      </div>
    </footer>
  );
}

export default Footer;
