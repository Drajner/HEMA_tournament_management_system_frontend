import React, { useState } from 'react';
import s from './SwordDoubleDroplistPopup.module.scss';


interface Participant {
    participantId: number;
    fullName: string;
}

interface SwordDoubleDroplistPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: (firstParticipant: Participant | null, secondParticipant: Participant | null) => void;
    title: string;
    participants: Participant[];
}

export const SwordDoubleDroplistPopup: React.FC<SwordDoubleDroplistPopupProps> = ({
    isOpen,
    onClose,
    onAccept,
    title,
    participants
}) => {
    const [selectedFirstParticipant, setFirstSelectedParticipant] = useState<number | null>(null);
    const [selectedSecondParticipant, setSecondSelectedParticipant] = useState<number | null>(null);

    if (!isOpen) return null;

    const handleAccept = () => {
        const participant1 = participants.find(p => p.participantId === selectedFirstParticipant) || null;
        const participant2 = participants.find(p => p.participantId === selectedSecondParticipant) || null;
        onAccept(participant1, participant2);
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
                        value={selectedFirstParticipant || ""}
                        onChange={(e) => setFirstSelectedParticipant(Number(e.target.value))}
                        className={s.dropdown}
                    >
                        <option value="" disabled>Wybierz pierwszego zawodnika</option>
                        {participants.map((participant) => (
                            <option key={participant.participantId} value={participant.participantId}>
                                {participant.participantId}. {participant.fullName}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedSecondParticipant || ""}
                        onChange={(e) => setSecondSelectedParticipant(Number(e.target.value))}
                        className={s.dropdown}
                    >
                        <option value="" disabled>Wybierz drugiego zawodnika</option>
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