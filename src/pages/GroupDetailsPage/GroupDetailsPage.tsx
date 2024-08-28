import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./GroupDetailsPage.module.scss";
import { sendRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';

export const GroupDetailsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [fights, setFights] = useState([]);

  // Retrieve the dynamic number from the URL
  const { number } = useParams();

  useEffect(() => {
    // Fetch data for Zawodnicy (participants)
    console.log("number: "+number);
    sendRequestGET('participants/get/group/'+number)
      .then(async response => {
        const participantsData = await response.json();
        setParticipants(participantsData);
      })
      .catch(err => console.error("Error fetching participants:", err));

    // Fetch data for Grupy (groups)
    sendRequestGET('fights/get/'+number)
      .then(async response => {
        const groupsData = await response.json();
        setFights(groupsData);
      })
      .catch(err => console.error("Error fetching groups:", err));
  }, []);

  return (
    <TemplatePage>
      <div className={s.fullDiv}>
      <h1 className={s.headerUp}>Szczegóły grupy</h1>
        <div className={s.transDiv}>
          {/* Section for Zawodnicy */}
          <h1 className={s.headerUp}>Zawodnicy</h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>
            {participants.map((participant: any) => (
              <Link to={`/participant/${participant.participantId}`}>
              <div key={participant.id} className={s.mainDiv}>
                <div className={s.header}>
                  <h2 className={s.header2}>ID: {participant.participantId} | {participant.fullName}</h2>
                  <div className={s.header3}>
                  <ul>
                    <li>Punkty: {participant.score}</li>
                    <li>Wygrane walki: {participant.wins}</li>
                    <li>Duble: {participant.doubles}</li>
                    <li>Kartki: {participant.cards}</li>
                    <li>Status: {participant.status}</li>
                  </ul>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>

          <h1><br></br></h1>

          {/* Section for Grupy */}
          <h1 className={s.headerUp}>Walki</h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>
            {fights.map((fight: any, index: number) => (
              <div key={fight.id} className={s.mainDiv}>
                <div className={s.header}>
                  <Link to={`/fight/${fight.id}`}>
                  <h2 className={s.header2}>WALKA {index + 1}: {fight.firstParticipant.fullName} vs {fight.secondParticipant.fullName} {fight.firstParticipantPoints}:{fight.secondParticipantPoints}</h2>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TemplatePage>
  );
};