// Partners.js
import PartnerCard from './patnerPage/PartnerCard';
import logo1 from './patnerPage/logos/logo1.png';
import logo2 from './patnerPage/logos/logo2.png';
import './patnerPage/PatnerPage.css';

const partnersData = [
  {
    title: 'Fakultas Bahasa dan Seni',
    description: 'Memiliki 3 Program studi dan 1 Program Magister untuk mendorong menjadi versi terbaik',
    logoSrc: {logo1},
    logoAlt: 'Fakultas Bahasa dan Seni Logo',
  },
  {
    title: 'Fakultas Biologi',
    description: 'Memiliki 2 Program studi dan 1 Program Magister untuk mendorong menjadi versi terbaik',
    logoSrc: {logo2},
    logoAlt: 'Fakultas Biologi Logo',
  },
  // Add more partner data as needed
];

const Partners = () => {
  return (
    <div className="partners-container">
      {partnersData.map((partner, index) => (
        <PartnerCard
          key={index}
          title={partner.title}
          description={partner.description}
          logoSrc={partner.logoSrc}
          logoAlt={partner.logoAlt}
        />
      ))}
    </div>
  );
};

export default Partners;