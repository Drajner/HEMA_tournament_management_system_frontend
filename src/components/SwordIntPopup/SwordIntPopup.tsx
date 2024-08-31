import React, { useState } from 'react';
import s from './SwordIntPopup.module.scss';

interface SwordIntPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: (value: number) => void;
    title: string;
    prompt: string;
}

export const SwordIntPopup: React.FC<SwordIntPopupProps> = ({ isOpen, onClose, onAccept, title, prompt }) => {
    const [inputValue, setInputValue] = useState<string>('');

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAccept = () => {
        const intValue = parseInt(inputValue);
        if (!isNaN(intValue)) {
            onAccept(intValue);
            onClose();
        } else {
            alert('Podaj poprawną liczbę rzeczywistą');
        }
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
                        onChange={handleInputChange}
                        placeholder={prompt}
                    />
                </div>
                <div className={s.popupActions}>
                    <button className={s.cancelButton} onClick={onClose}>
                        Odrzuć
                    </button>
                    <button className={s.acceptButton} onClick={handleAccept}>
                        Akceptuj
                    </button>
                </div>
            </div>
        </div>
    );
};