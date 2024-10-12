"use client";
import React, { useEffect, useRef } from 'react';
import { useField } from '@payloadcms/ui';

interface Address {
  display_name: string;
  lat: number;
  lon: number;
}

interface SelectAddressFieldProps {
  path: string;
}

export const SelectAddressField: React.FC<SelectAddressFieldProps> = () => {
  const path = "addressResults";
  const { value: addresses } = useField<number>({ path });

  const latitudeField = useField({ path: 'coordinates.latitude' });
  const longitudeField = useField({ path: 'coordinates.longitude' });
  const checkBox = useField({ path: 'gotCoordinates' });

  const addressResultsRef = useRef<Address[]>([]);

  if (addresses && addresses > 0) {
    addressResultsRef.current = [];
    for (let i = 0; i < addresses; i++) {
      const displayNamePath = `addressResults.${i}.display_name`;
      const latPath = `addressResults.${i}.lat`;
      const lonPath = `addressResults.${i}.lon`;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { value: displayName } = useField<string>({ path: displayNamePath });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { value: latValue } = useField<number>({ path: latPath });
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { value: lonValue } = useField<number>({ path: lonPath });

      if (displayName && latValue !== undefined && lonValue !== undefined) {
        addressResultsRef.current.push({
          display_name: displayName,
          lat: latValue,
          lon: lonValue
        });
      }
    }
  }

  useEffect(() => {
    console.log("SelectAddressField component rendered");
    console.log("addressResults:", addressResultsRef.current);
  }, [addresses]);

  const handleAddressChange = (newValue: Address) => {
    console.log("New Value: ", newValue);
    latitudeField.setValue(newValue.lat);
    longitudeField.setValue(newValue.lon);
    checkBox.setValue(true);
  };

  if (!addresses || addresses === 0 || addressResultsRef.current.length === 0) {
    return (
      <div>
        <h3>Select the correct address:</h3>
        <p>Please enter the Village and then save the Form, to see the Options.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Select the correct address:</h3>
      {addressResultsRef.current.map((result, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`address-${index}`}
            name="address"
            value={result.display_name}
            onChange={() => handleAddressChange(result)}
          />
          <label htmlFor={`address-${index}`}>{result.display_name}</label>
        </div>
      ))}
    </div>
  );
};

export default SelectAddressField;