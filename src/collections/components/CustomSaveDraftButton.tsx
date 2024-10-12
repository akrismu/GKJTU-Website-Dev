"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from '@payloadcms/ui';
import { useLocale } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui';
import { Popup } from '@payloadcms/ui';

const baseClass = 'collection-save-button';

const CustomSaveDraftButton: React.FC = () => {

  const form = useForm();
  const currentLanguage = useLocale();
  const [toolTip, setToolTip] = useState('Please Change the Language at the top');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setToolTip(currentLanguage.code === 'en' ? 'Please Change the Language at the top' : 'Silakan Ubah Bahasa di bagian atas');
  }, [currentLanguage.code]);

  const handleSaveDraft = async () => {
    await form.submit();
    setShowPopup(true);
  };

  return (
    <div
      className={baseClass}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--base) / 4)',
      }}
    >
      <Button
        onClick={handleSaveDraft}
        buttonStyle="primary"
        disabled={form.disabled}
        tooltip={toolTip}
      >
        Save Draft in {String(currentLanguage.label)}
      </Button>
      {showPopup && (<Popup 
        button={null}
        forceOpen={true}
        horizontalAlign="center"
        size="large"
        verticalAlign="bottom"
        backgroundColor='#222222'
      >
        <div style={{ padding: '1rem'}}>
          <p>Draft saved successfully in Englisch! <br/>Please change the language at the top, to also edit the indonesian Version.</p>
        </div>
      </Popup>)}
    </div>
  );
};

export default CustomSaveDraftButton;