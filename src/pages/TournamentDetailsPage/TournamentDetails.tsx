import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./TournamentDetailsPage.module.scss";
import { sendRequestGET, sendRequestPOST, sendBareRequestPOST, sendEmptyRequestPOST, sendRequestDELETE } from 'requests';
import { Link, useParams } from 'react-router-dom';
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";
import { SwordButton } from 'components/SwordButton';
import { SwordButtonPopup } from 'components/SwordButtonPopup';
import { SwordConfirmPopup } from 'components/SwordConfirmPopup';


export const TournamentDetailsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tournament, setTournament] = useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [isParticipantDeletePopupOpen, setIsParticipantDeletePopupOpen] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState<number | null>(null);


  const { number } = useParams();

  const fetchData = () => {
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
	};

  useEffect(() => {
      fetchData();
  }, []);

  const handleAddGroup = () => {
		sendEmptyRequestPOST('tournaments/addPool/'+number).then(async r => {
      console.log(r);
		  if (r.ok) {
			fetchData();
		  } else {
			alert('Nie udało się dodać grupy');
		  }
		});
	};

  const handleDeleteGroup = () => {
		if (groupToDelete === null) return;
		sendRequestDELETE(`groups/delete/${groupToDelete}`).then(async r => {
		  if (r.ok) {
			fetchData();
			setIsConfirmPopupOpen(false);
			setGroupToDelete(null);
		  } else {
			alert('Nie udało się usunąć grupy');
		  }
		});
	  };

  const handleDeleteParticipant = () => {
      console.log("CHUJ")
      console.log(participantToDelete)
      if (participantToDelete === null) return;
      sendRequestDELETE(`participants/delete/${participantToDelete}`).then(async r => {
        if (r.ok) {
        fetchData();
        setIsParticipantDeletePopupOpen(false);
        setParticipantToDelete(null);
        } else {
        alert('Nie udało się usunąć zawodnika');
        }
    });
    };

  const openConfirmPopup = (groupId: number) => {
        setGroupToDelete(groupId);
        setIsConfirmPopupOpen(true);
    };

  const openParticipantDeletePopup = (participantId: number) => {
      setParticipantToDelete(participantId);
      setIsParticipantDeletePopupOpen(true);
  };  

  return (
    <TemplatePage>
      <div className={s.fullDiv}>
      <h1 className={s.headerUp}>{tournament.name ? tournament.name : "CHUUUJ"}</h1>
        <div className={s.transDiv}>
          {/* Section for Zawodnicy */}
          <h1 className={s.headerUp}>Zawodnicy</h1>
          <h1><br></br></h1>
          <h1><br></br></h1>
          <Link to={`/addParticipant/${number}`}>
            <div className={s.addButtonContainer}>
            <SwordButton>Dodaj zawodnika</SwordButton>
            </div>
          </Link>
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
                <SwordButtonPopup
                    className={s.deleteButton}
                    onClick={() => openParticipantDeletePopup(participant.participantId)}
                    variant="small"
        	        >
                    Usuń
                </SwordButtonPopup>
              </div>
            ))}
          </div>

          <h1><br></br></h1>

          {/* Section for Grupy */}
          <h1 className={s.headerUp}>Grupy</h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>
          <h1><br></br></h1>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => handleAddGroup()} className={s.addButton}>
                Dodaj grupę
              </SwordButtonPopup>
            </div>
            {groups.map((group: any, index: number) => (
              <div key={group.id} className={s.mainDiv}>
                <div className={s.header}>
                  <Link to={`/group/${group.groupId}`}>
                  <h2 className={s.header2}>GRUPA {index + 1}</h2>
                  </Link>
                </div>
                <SwordButtonPopup
                    className={s.deleteButton}
                    onClick={() => openConfirmPopup(group.groupId)}
                    variant="small"
        	        >
                    Usuń
                </SwordButtonPopup>
              </div>
            ))}
          </div>
          <h1><br></br></h1>
          <h1><br></br></h1>
          <div className={s.addButtonContainer}>
          <SwordLinkButton href={`${PATHS.finals.replace(':number', number)}`}>Finały</SwordLinkButton>
          </div>
          <SwordConfirmPopup
                isOpen={isConfirmPopupOpen}
                onClose={() => setIsConfirmPopupOpen(false)}
                onAccept={handleDeleteGroup}
                title="Usuń grupę"
                text="Czy jesteś pewny/a, że chcesz usunąć tą grupę?"
            />
          <SwordConfirmPopup
                isOpen={isParticipantDeletePopupOpen}
                onClose={() => setIsParticipantDeletePopupOpen(false)}
                onAccept={handleDeleteParticipant}
                title="Usuń zawodnika"
                text="Czy jesteś pewny/a, że chcesz usunąć tego zawodnika?"
            />
        </div>
      </div>
    </TemplatePage>
  );
};