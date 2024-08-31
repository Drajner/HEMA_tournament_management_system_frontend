import React, { useState } from 'react';
import s from './SwordFloatPopup.module.scss';

interface SwordFloatPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: (value: number) => void;
    title: string;
    prompt: string;
}

export const SwordFloatPopup: React.FC<SwordFloatPopupProps> = ({ isOpen, onClose, onAccept, title, prompt }) => {
    const [inputValue, setInputValue] = useState<string>('');

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAccept = () => {
        const floatValue = parseFloat(inputValue);
        if (!isNaN(floatValue)) {
            onAccept(floatValue);
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
                    <label>{prompt}</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Wpisz liczbę rzeczywistą"
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