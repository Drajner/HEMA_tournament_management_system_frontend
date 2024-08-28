import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from './FightDetailsPage.module.scss';
import { sendRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";

export const FightDetailsPage = () => {
    const [fightDetails, setFightDetails] = useState(null);

    const { number } = useParams();

    useEffect(() => {
        sendRequestGET('fights/getOne/'+number)
        .then(async response => {
            const fightData = await response.json();
            setFightDetails(fightData);
        })
        .catch(err => console.error("Error fetching tournament:", err));
    }, []);

    if (!fightDetails) {
        return <div>Loading...</div>;
    }

    const {
        firstParticipant,
        secondParticipant,
        firstParticipantPoints = 0,
        secondParticipantPoints = 0,
        firstParticipantCards = 0,
        secondParticipantCards = 0,
        doubles = 0,
        status = "PENDING",
        winner
    } = fightDetails;

    const renderParticipantBox = (participant: any, points: number, cards: number) => {
        const participantContent = (
            <div className={s.participantBox}>
                <h2>{participant?.fullName || "Oczekujący"}</h2>
                <p>Points: {points}</p>
                <p>Cards: {cards}</p>
            </div>
        );

        if (participant) {
            return (
                <Link to={`/participant/${participant.participantId}`}>
                    {participantContent}
                </Link>
            );
        }

        return participantContent;
    };

    return (
        <div className={s.background}>
            <div className={s.fightDetailsContainer}>
                <h1 className={s.header}>Szczegóły Walki nr {fightDetails.id}</h1>
                <div className={s.participantInfo}>
                    {firstParticipant ? (
                        <Link to={`/participant/${firstParticipant.participantId}`} className={s.participantBox}>
                            <h2>{firstParticipant.fullName}</h2>
                            <p>Points: {firstParticipantPoints}</p>
                            <p>Cards: {firstParticipantCards}</p>
                        </Link>
                    ) : (
                        <div className={s.participantBox}>
                            <h2>Oczekujący</h2>
                            <p>Points: {firstParticipantPoints}</p>
                            <p>Cards: {firstParticipantCards}</p>
                        </div>
                    )}
                    
                    <div className={s.vs}>VS</div>
                    
                    {secondParticipant ? (
                        <Link to={`/participant/${secondParticipant.participantId}`} className={s.participantBox}>
                            <h2>{secondParticipant.fullName}</h2>
                            <p>Points: {secondParticipantPoints}</p>
                            <p>Cards: {secondParticipantCards}</p>
                        </Link>
                    ) : (
                        <div className={s.participantBox}>
                            <h2>Oczekujący</h2>
                            <p>Points: {secondParticipantPoints}</p>
                            <p>Cards: {secondParticipantCards}</p>
                        </div>
                    )}
                    </div>
                <div className={s.matchDetails}>
                    <p>Status: {status}</p>
                    <p>Duble: {doubles}</p>
                    <p>Zwycięzca: {winner?.fullName || "Nierozstrzygnięty"}</p>
                </div>
            </div>
        </div>

    );
};