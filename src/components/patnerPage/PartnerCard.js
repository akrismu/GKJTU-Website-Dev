// PartnerCard.js

import './PatnerPage.css'

const PartnerCard = ({ title, description, logoSrc, logoAlt }) => {
  return (
    <div className="partner-card">
      <div className="partner-info">
        <h3 className="partner-title">{title}</h3>
        <p className="partner-description">{description}</p>
      </div>
      <div className="partner-logo">
        <img src={logoSrc} alt={logoAlt} width={200} height={100} />
      </div>
    </div>
  );
};

export default PartnerCard;