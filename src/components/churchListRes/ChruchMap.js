import React, { useState, useEffect, useRef } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ChurchMap.css'
import { useTranslation } from 'react-i18next'
import { fetchChurches } from '../../api';

import dot from './record.png';

const customIcon = new L.Icon({
  iconUrl: dot.src,
  className: 'church-icon',
  iconSize: [27, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

const customIcon2 = new L.Icon({
  iconUrl: dot.src,
  className: 'church-icon',
  iconSize: [35.1, 32.5],
  iconAnchor: [15, 27],
  popupAnchor: [0, -25],
});

function ChurchesMap() {
  const { i18n } = useTranslation();
  const [churches, setChurches] = useState([]);
  const mapRef = useRef(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChurches(i18n.language);
      console.log("Chruches:", data)
      setChurches(data.docs);
    };

    fetchData();
  }, [i18n.language]);

  useEffect(() => {
    const defaultLatitude = -7.3305;
    const defaultLongitude = 110.5084;
    if (!mapRef.current) {
      mapRef.current = L.map('map-container').setView([defaultLatitude, defaultLongitude], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && churches.length > 0) {
      churches.forEach((church) => {
        const marker = L.marker([church.coordinates.latitude, church.coordinates.longitude], {
          icon: customIcon
        }).addTo(mapRef.current);

        const popupContent = `
            <div class="popup-content">
              <img src="${church.previewImage.url}" alt="Church Team" />
              <div class="popup-text-block">
                <h3>${church.NameOfTheChurch}</h3>
                <p>${church.shortDescription}</p>
              </div>
            </div>
          `;

          const popup = L.popup({
            closeButton: false,
            offset: L.point(0, -30)
          }).setContent(popupContent);

          marker.bindPopup(popup);

          const icon = marker.getElement();

        marker.on('mouseover', function (e) {
          this.setIcon(customIcon2);
          icon.classList.remove('church-icon');
          icon.classList.add('church-icon-hover');
          this.openPopup();
        });

        marker.on('mouseout', function (e) {
          this.setIcon(customIcon);
          icon.classList.remove('church-icon-hover');
          icon.classList.add('church-icon');
          this.closePopup();
        });

        marker.on('click', function(e) {
          // Navigate to church detail page
          window.location.href = `/churches/${church.id}`;
        });
      });
    }
  }, [churches]);

  return <div id="map-container" style={{ height: '600px', width: '100%' }} />;
}

export default ChurchesMap;
