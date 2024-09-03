import React, { useState, useEffect } from 'react';
import s from './FightReportPage.module.scss';
import { sendRequestGET, sendRequestPOST } from 'requests';
import { useParams, useNavigate } from 'react-router-dom';
import { SwordButtonPopup } from 'components/SwordButtonPopup';
import { PATHS } from 'config/paths';

export const FightReportPage = () => {
    const [fightDetails, setFightDetails] = useState(null);
    const [participants, setParticipants] = useState([]);
    const redirect = useNavigate();
    const { number } = useParams();

    const [firstParticipantPoints, setFirstParticipantPoints] = useState(0);
    const [secondParticipantPoints, setSecondParticipantPoints] = useState(0);
    const [firstParticipantCards, setFirstParticipantCards] = useState(0);
    const [secondParticipantCards, setSecondParticipantCards] = useState(0);
    const [doubles, setDoubles] = useState(0);
    const [winnerId, setWinnerId] = useState(null);
    const [groupId, setGroupId] = useState(null);

    useEffect(() => {
        fetchFight();
    }, [number]);

    useEffect(() => {
        fetchParticipants();
    }, [groupId]);

    const fetchFight = () => {
        sendRequestGET('fights/getOne/' + number)
            .then(async response => {
                const fightData = await response.json();
                setFightDetails(fightData);

                setFirstParticipantPoints(fightData.firstParticipantPoints || 0);
                setSecondParticipantPoints(fightData.secondParticipantPoints || 0);
                setFirstParticipantCards(fightData.firstParticipantCards || 0);
                setSecondParticipantCards(fightData.secondParticipantCards || 0);
                setDoubles(fightData.doubles || 0);
                setWinnerId(fightData.winner?.participantId || null);
                setGroupId(fightData.groupId || null);
            })
            .catch(err => console.error("Error fetching fight details:", err));
    };

    const fetchParticipants = () => {
        if (groupId) {
            sendRequestGET(`participants/get/group/${groupId}`)
                .then(async response => {
                    const participantData = await response.json();
                    setParticipants(participantData);
                })
                .catch(err => console.error("Error fetching participants:", err));
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    async function editFight() {
        sendRequestPOST(
            { 
                "username": "TODO",
                "fightId": number,
                "firstParticipantId": fightDetails.firstParticipant.participantId,
                "secondParticipantId": fightDetails.secondParticipant.participantId,
                "firstParticipantPoints": firstParticipantPoints,
                "secondParticipantPoints": secondParticipantPoints,
                "firstParticipantCards": firstParticipantCards,
                "secondParticipantCards": secondParticipantCards,
                "doubles": doubles,
                "winner": winnerId,
            },
            'reports/send'
        ).then(async r => {
            if (r.ok) {
                fetchFight();
                fetchParticipants();
                redirect(PATHS.fight.replace(":number", number));
            } else {
                alert("Nie udało się dokonać zmian");
            }
        });
    }

    if (!fightDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className={s.background}>
            <div className={s.fightDetailsContainer}>
                <h1 className={s.header}>Szczegóły Walki nr {fightDetails.id}</h1>
                <div className={s.participantInfo}>
                    <div className={s.participantBox}>
                        <label>
                            <h2>{fightDetails.firstParticipant?.fullName || 'Nieznany zawodnik'}</h2>
                        </label>
                        <label>
                            <span>Punkty:</span>
                            <input
                                type="number"
                                value={firstParticipantPoints}
                                onChange={handleInputChange(setFirstParticipantPoints)}
                                placeholder="Punkty"
                            />
                        </label>
                        <label>
                            <span>Kartki:</span>
                            <input
                                type="number"
                                value={firstParticipantCards}
                                onChange={handleInputChange(setFirstParticipantCards)}
                                placeholder="Kartki"
                            />
                        </label>
                    </div>

                    <div className={s.vs}>VS</div>

                    <div className={s.participantBox}>
                        <label>
                            <h2>{fightDetails.secondParticipant?.fullName || 'Nieznany zawodnik'}</h2>
                        </label>
                        <label>
                            <span>Punkty:</span>
                            <input
                                type="number"
                                value={secondParticipantPoints}
                                onChange={handleInputChange(setSecondParticipantPoints)}
                                placeholder="Punkty"
                            />
                        </label>
                        <label>
                            <span>Kartki:</span>
                            <input
                                type="number"
                                value={secondParticipantCards}
                                onChange={handleInputChange(setSecondParticipantCards)}
                                placeholder="Kartki"
                            />
                        </label>
                    </div>
                </div>

                <div className={s.matchDetails}>
                    <label>
                        <span>Status:</span>
                        <p>{fightDetails.status}</p>
                    </label>
                    <label>
                        <span>Duble:</span>
                        <input
                            type="number"
                            value={doubles}
                            onChange={handleInputChange(setDoubles)}
                            placeholder="Duble"
                        />
                    </label>
                    <label>
                        <span>Zwycięzca:</span>
                        <select
                            value={winnerId}
                            onChange={handleInputChange(setWinnerId)}
                        >
                            <option value="">Nierozstrzygnięty</option>
                            {participants.map(participant => (
                                <option key={participant.participantId} value={participant.participantId}>
                                    {participant.fullName}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            <div className={s.addButtonContainer}>
                <SwordButtonPopup onClick={() => editFight()} className={s.addButton}>
                   Dodaj raport
                </SwordButtonPopup>
            </div>
        </div>
    );
};