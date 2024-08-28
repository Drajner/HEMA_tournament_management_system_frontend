import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from './ParticipantDetailsPage.module.scss';
import { sendRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";


interface ParticipantDetails {
    participantId: number;
    name: string;
    surname: string;
    club: string;
    status: string;
    score: number;
    wins: number;
    doubles: number;
    cards: number;
    ranking: number;
    fullName: string;
}

export const ParticipantDetailsPage: React.FC = () => {
    const [participantDetails, setParticipantDetails] = useState(null);
    const { number } = useParams();


    useEffect(() => {
        sendRequestGET('participants/get/'+number)
        .then(async response => {
            const participantData = await response.json();
            setParticipantDetails(participantData);
        })
        .catch(err => console.error("Error fetching tournament:", err));
    }, []);


    if (!participantDetails) {
        return <div>Loading...</div>;
    }

    const {
        fullName,
        name,
        surname,
        club,
        status,
        score,
        wins,
        doubles,
        cards,
        ranking
    } = participantDetails;

    return (
        <div className={s.background}>
            <div className={s.transDiv}>
                <div className={s.participantDetailsContainer}>
                    <h1 className={s.header}>Zawodnik nr {number}</h1>
                    <div className={s.participantInfo}>
                        <p><span>Pełne imie:</span> {fullName}</p>
                        <p><span>Imie:</span> {name}</p>
                        <p><span>Nazwisko:</span> {surname}</p>
                        <p><span>Klub:</span> {club}</p>
                        <p><span>Status:</span> {status}</p>
                        <p><span>Punktacja:</span> {score}</p>
                        <p><span>Zwycięstwa:</span> {wins}</p>
                        <p><span>Duble:</span> {doubles}</p>
                        <p><span>Kartki:</span> {cards}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};