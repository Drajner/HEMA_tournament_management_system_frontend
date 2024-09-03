import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from './ReportsDetailsPage.module.scss';
import { sendRequestGET, sendEmptyRequestPOST } from 'requests';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";
import { SwordButtonPopup } from 'components/SwordButtonPopup';

export const ReportDetailsPage = () => {
    const [reportDetails, setReportDetails] = useState(null);
    const [firstParticipant, setFirstParticipant] = useState(null);
    const [secondParticipant, setSecondParticipant] = useState(null);
    const [sinner, setWinner] = useState(null);
    const redirect = useNavigate();



    const { number } = useParams();

    useEffect(() => {
        sendRequestGET('reports/get/'+number)
        .then(async response => {
            const reportData = await response.json();
            setReportDetails(reportData);
        })
        .catch(err => console.error("Error fetching report:", err));
    }, []);

    useEffect(() => {
        console.log("DUPA")
        if (reportDetails) {
            console.log("CHUJ")

            sendRequestGET('participants/get/' + reportDetails.firstParticipantId)
                .then(async (response) => {
                    const participantData = await response.json();
                    setFirstParticipant(participantData);
                })
                .catch(err => console.error("Error fetching first participant:", err));

            sendRequestGET('participants/get/' + reportDetails.secondParticipantId)
                .then(async (response) => {
                    const participantData = await response.json();
                    setSecondParticipant(participantData);
                })
                .catch(err => console.error("Error fetching second participant:", err));
            sendRequestGET('participants/get/' + reportDetails.winnerId)
                .then(async (response) => {
                    const participantData = await response.json();
                    setWinner(participantData);
                })
                .catch(err => console.error("Error fetching second participant:", err));
        }
    }, [reportDetails]);

    if (!reportDetails) {
        return <div>Loading...</div>;
    }

    async function acceptReport(){
		let response = sendEmptyRequestPOST('reports/accept/'+number)
        .then(async r => {
			if (r.ok) {
				redirect(PATHS.participant.replace(":number", number))
			}
			else {
				alert("Nie udało się dokonać zmian");
			}
		})

	}

    const {
        firstParticipantPoints = 0,
        secondParticipantPoints = 0,
        firstParticipantCards = 0,
        secondParticipantCards = 0,
        doubles = 0,
        status = "PENDING",
        winner
    } = reportDetails;

    return (
        <div className={s.background}>
            <div className={s.transDiv}>
                <div className={s.fightDetailsContainer}>
                    <h1 className={s.header}>Raport walki: {reportDetails.fightId} Autor: {reportDetails.username}</h1>
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
                <h1><br></br></h1>
                <h1><br></br></h1>
                <div className={s.addButtonContainer}>
                <SwordButtonPopup onClick={() => acceptReport()} className={s.addButton}>
                   Akceptuj raport
                </SwordButtonPopup>
            </div>
            </div>
        </div>

    );
};