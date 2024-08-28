import React from 'react';
import clsx from 'clsx';
import s from './SwordPopup.module.scss';

interface SwordPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
    title: string;
    prompt: string;
  }
  
  export const SwordPopup: React.FC<SwordPopupProps> = ({ isOpen, onClose, onAccept, title, prompt }) => {
    const [inputValue, setInputValue] = React.useState('');
    if (!isOpen) return null;

    const handleAccept = () => {
        onAccept(inputValue);
        onClose();
      };
    
  
    return (
        <div className={s.overlay}>
          <div className={s.popup}>
            <div className={s.popupHeader}>
              <h2>{title}</h2>
              <button className={s.closeButton} onClick={onClose}>
                &times;
              </button>
            </div>
            <div className={s.popupContent}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={prompt}
              />
            </div>
            <div className={s.popupActions}>
              <button className={s.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button className={s.acceptButton} onClick={handleAccept}>
                Accept
              </button>
            </div>
          </div>
        </div>
      );
  };