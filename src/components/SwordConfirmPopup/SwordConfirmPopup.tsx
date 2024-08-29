import React from 'react';
import s from './SwordConfirmPopup.module.scss';

interface SwordConfirmPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept?: () => void;
    title: string;
    text: string;
}

export const SwordConfirmPopup: React.FC<SwordConfirmPopupProps> = ({ isOpen, onClose, onAccept, title, text }) => {
    if (!isOpen) return null;

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
                    <p>{text}</p> 
                </div>
                <div className={s.popupActions}>
                    {onAccept && (
                        <button className={s.acceptButton} onClick={onAccept}>
                            Akceptuj
                        </button>
                    )}
                    <button className={s.cancelButton} onClick={onClose}>
                        Odrzuć
                    </button>
                </div>
            </div>
        </div>
    );
};