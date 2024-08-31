import React, { useState } from 'react';
import s from './SwordDroplistPopup.module.scss';

interface SwordDroplistPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: (selectedParticipant: any | null) => void;
    title: string;
    participants: []; // List of participants objects
}

export const SwordDroplistPopup: React.FC<SwordDroplistPopupProps> = ({
    isOpen,
    onClose,
    onAccept,
    title,
    participants
}) => {
    const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null);

    if (!isOpen) return null;

    const handleAccept = () => {
        const selectedParticipant = participants.find(p => p.participantId === selectedParticipantId) || null;
        onAccept(selectedParticipant);
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
                    <select
                        value={selectedParticipantId || ""}
                        onChange={(e) => setSelectedParticipantId(Number(e.target.value))}
                        className={s.dropdown}
                    >
                        <option value="" disabled>Wybierz zawodnika</option>
                        {participants.map((participant) => (
                            <option key={participant.participantId} value={participant.participantId}>
                                {participant.participantId}. {participant.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={s.popupActions}>
                    <button className={s.cancelButton} onClick={onClose}>
                        Anuluj
                    </button>
                    <button className={s.acceptButton} onClick={handleAccept}>
                        Akceptuj
                    </button>
                </div>
            </div>
        </div>
    );
};