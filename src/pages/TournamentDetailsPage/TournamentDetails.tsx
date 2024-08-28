import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./TournamentDetailsPage.module.scss";
import { sendRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";


export const TournamentDetailsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tournament, setTournament] = useState([]);

  // Retrieve the dynamic number from the URL
  const { number } = useParams();

  useEffect(() => {
    // Fetch data for Zawodnicy (participants)
    sendRequestGET('participants/get/tournament/'+number)
      .then(async response => {
        const participantsData = await response.json();
        setParticipants(participantsData);
      })
      .catch(err => console.error("Error fetching participants:", err));

    // Fetch data for Grupy (groups)
    sendRequestGET('groups/get/'+number)
      .then(async response => {
        const groupsData = await response.json();
        setGroups(groupsData);
      })
      .catch(err => console.error("Error fetching groups:", err));

    sendRequestGET('tournaments/get/'+number)
      .then(async response => {
        const tournamentData = await response.json();
        setTournament(tournamentData);
      })
      .catch(err => console.error("Error fetching tournament:", err));
  }, []);

  return (
    <TemplatePage>
      <div className={s.fullDiv}>
      <h1 className={s.headerUp}>{tournament.name ? tournament.name : "CHUUUJ"}</h1>
        <div className={s.transDiv}>
          {/* Section for Zawodnicy */}
          <h1 className={s.headerUp}>Zawodnicy</h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>
            {participants.map((participant: any) => (
              <div key={participant.id} className={s.mainDiv}>
                <Link to={`/participant/${participant.participantId}`}>
                <div className={s.header}>
                  <h2 className={s.header2}>ID: {participant.participantId} | {participant.fullName}</h2>
                  <div className={s.header3}>
                  <ul>
                    <li>Punkty: {participant.score}</li>
                    <li>Wygrane walki: {participant.wins}</li>
                    <li>Duble: {participant.doubles}</li>
                    <li>Kartki: {participant.cards}</li>
                  </ul>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>

          <h1><br></br></h1>

          {/* Section for Grupy */}
          <h1 className={s.headerUp}>Grupy</h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>
            {groups.map((group: any, index: number) => (
              <div key={group.id} className={s.mainDiv}>
                <div className={s.header}>
                  <Link to={`/group/${group.groupId}`}>
                  <h2 className={s.header2}>GRUPA {index + 1}</h2>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <h1><br></br></h1>
          <h1><br></br></h1>
          <div className={s.buttonContainer}>
          <SwordLinkButton href={`${PATHS.finals.replace(':number', number)}`}>Finały</SwordLinkButton>
          </div>

        </div>
      </div>
    </TemplatePage>
  );
};