import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./TournamentDetailsPage.module.scss";
import { sendRequestGET, sendRequestPOST, sendBareRequestPOST, sendEmptyRequestPOST, sendRequestDELETE, sendUnauthRequestGET} from 'requests';
import { Link, useParams } from 'react-router-dom';
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";
import { SwordButton } from 'components/SwordButton';
import { SwordButtonPopup } from 'components/SwordButtonPopup';
import { SwordConfirmPopup } from 'components/SwordConfirmPopup';
import { SwordPopup } from 'components/SwordPopup';
import { SwordIntPopup } from 'components/SwordIntPopup';


export const TournamentDetailsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tournament, setTournament] = useState<any>([]);
  const [isGroupDeletePopupOpen, setIsGroupDeletePopupOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [isParticipantDeletePopupOpen, setIsParticipantDeletePopupOpen] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState<number | null>(null);
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
  const [isGenerateGroupsPopupOpen, setIsGenerateGroupsPopupOpen] = useState(false);
  const [groupsNumber, setGroupsNumber] = useState<number>(1);
  const [isGenerateFinalsPopupOpen, setIsGenerateFinalsPopupOpen] = useState(false);
  const [ladderParticipants, setLadderParticipants] = useState<number>(4);
  const [isEvaluateFinalsPopupOpen, setIsEvaluateFinalsPopupOpen] = useState(false);
  const [isPurgeFinalsPopupOpen, setIsPurgeFinalsPopupOpen] = useState(false);

  const [role, setRole] = useState<string | null>(null);

  const { number } = useParams();

  const fetchData = () => {
	  sendUnauthRequestGET('participants/get/tournament/'+number)
      .then(async response => {
        const participantsData = await response.json();
        setParticipants(participantsData);
      })
      .catch(err => console.error("Error fetching participants:", err));

    sendUnauthRequestGET('groups/get/'+number)
      .then(async response => {
        const groupsData = await response.json();
        setGroups(groupsData);
      })
      .catch(err => console.error("Error fetching groups:", err));

    sendUnauthRequestGET('tournaments/get/'+number)
      .then(async response => {
        const tournamentData = await response.json();
        setTournament(tournamentData);
      })
      .catch(err => console.error("Error fetching tournament:", err));
	};

  useEffect(() => {
      setRole(localStorage.getItem("role"))
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
			setIsGroupDeletePopupOpen(false);
			setGroupToDelete(null);
		  } else {
			alert('Nie udało się usunąć grupy');
		  }
		});
	  };

  const handleDeleteParticipant = () => {
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

  const handleRenameTournament = (inputString: string) => {
      sendBareRequestPOST(inputString, `tournaments/rename/${number}`).then(async r => {
        if (r.ok) {
        fetchData();
        setIsRenamePopupOpen(false);
        } else {
        alert('Nie udało się zmienić nazwy turnieju');
        }
    });
    };

  const handleGenerateGroups = (groupsNumber: number) => {
      sendBareRequestPOST(groupsNumber.toString(), `tournaments/generateGroups/${number}`).then(async r => {
        if (r.ok) {
        fetchData();
        setIsGenerateGroupsPopupOpen(false);
        } else {
        alert('Nie udało się wygenerować grup');
        }
    });
    };

  const handleGenerateFinals = (participantsNumber: number) => {
      sendBareRequestPOST(participantsNumber.toString(), `tournaments/generateLadder/${number}`).then(async r => {
        if (r.ok) {
        fetchData();
        setIsGenerateFinalsPopupOpen(false);
        } else {
        alert('Nie udało się wygenerować finałów');
        }
    });
    };

  const handleEvaluateFinals = () => {
      sendEmptyRequestPOST(`tournaments/evaluateFinals/${number}`).then(async r => {
        if (r.ok) {
        fetchData();
        setIsEvaluateFinalsPopupOpen(false);
        } else {
        alert('Nie udało się ewaluować finałów');
        }
    });
    };  

  const handlePurgeFinals = () => {
      sendRequestDELETE(`tournaments/purgeFinals/${number}`).then(async r => {
        if (r.ok) {
        fetchData();
        setIsPurgeFinalsPopupOpen(false);
        } else {
        alert('Nie udało się wyczyścić finałów');
        }
    });
    };  

  const openGroupDeletePopup = (groupId: number) => {
        setGroupToDelete(groupId);
        setIsGroupDeletePopupOpen(true);
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
          {role === 'ADMIN' && ( 
          <Link to={`/addParticipant/${number}`}>
            <div className={s.addButtonContainer}>
            <SwordButton>Dodaj zawodnika</SwordButton>
            </div>
          </Link>
          )}
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
                {role === 'ADMIN' && ( 
                <SwordButtonPopup
                    className={s.deleteButton}
                    onClick={() => openParticipantDeletePopup(participant.participantId)}
                    variant="small"
        	        >
                    Usuń
                </SwordButtonPopup>
                )}
              </div>
            ))}
          </div>

          <h1><br></br></h1>

          {/* Section for Grupy */}
          <h1 className={s.headerUp}>Grupy</h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>
          <h1><br></br></h1>
            {role === 'ADMIN' && ( 
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => handleAddGroup()} className={s.addButton}>
                Dodaj grupę
              </SwordButtonPopup>
            </div>
            )}
            {groups.map((group: any, index: number) => (
              <div key={group.id} className={s.mainDiv}>
                <div className={s.header}>
                  <Link to={`/group/${group.groupId}`}>
                  <h2 className={s.header2}>GRUPA {index + 1}</h2>
                  </Link>
                </div>
                {role === 'ADMIN' && ( 
                <SwordButtonPopup
                    className={s.deleteButton}
                    onClick={() => openGroupDeletePopup(group.groupId)}
                    variant="small"
        	        >
                    Usuń
                </SwordButtonPopup>
                )}
              </div>
            ))}
          </div>
          <h1><br></br></h1>
          <h1><br></br></h1>
          <div className={s.addButtonContainer}>
          <SwordLinkButton href={`${PATHS.finals.replace(':number', number || "")}`}>Finały</SwordLinkButton>
          </div>

          {role === 'ADMIN' && ( 
          <>
          <h1 className={s.headerUp}>Funkcje turnieju</h1>
          <h1><br></br></h1>
          <h1><br></br></h1>

          <div className={s.contentRow}>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => setIsRenamePopupOpen(true)} className={s.addButton}>
                Zmień nazwę turnieju
              </SwordButtonPopup>
            </div>
            <h1><br></br></h1>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => setIsGenerateGroupsPopupOpen(true)} className={s.addButton}>
                Generuj grupy
              </SwordButtonPopup>
            </div>
            <h1><br></br></h1>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => setIsGenerateFinalsPopupOpen(true)} className={s.addButton}>
                Generuj drabinkę finałową
              </SwordButtonPopup>
            </div>
            <h1><br></br></h1>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => setIsEvaluateFinalsPopupOpen(true)} className={s.addButton}>
                Ewaluuj finały
              </SwordButtonPopup>
            </div>
            <h1><br></br></h1>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => setIsPurgeFinalsPopupOpen(true)} className={s.addButton}>
                Wyczyść finały
              </SwordButtonPopup>
            </div>
          </div>
          <SwordConfirmPopup
                isOpen={isGroupDeletePopupOpen}
                onClose={() => setIsGroupDeletePopupOpen(false)}
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
          <SwordPopup
                isOpen={isRenamePopupOpen}
                onClose={() => setIsRenamePopupOpen(false)}
                onAccept={handleRenameTournament}
                title="Zmień nazwę turnieju"
                prompt={tournament.name}
            />
          <SwordIntPopup
                isOpen={isGenerateGroupsPopupOpen}
                onClose={() => setIsGenerateGroupsPopupOpen(false)}
                onAccept={handleGenerateGroups}
                title="Wygeneruj grupy"
                prompt="Podaj liczbę generowanych grup"
            />
          <SwordIntPopup
                isOpen={isGenerateFinalsPopupOpen}
                onClose={() => setIsGenerateFinalsPopupOpen(false)}
                onAccept={handleGenerateFinals}
                title="Wygeneruj drabinkę finałową"
                prompt="Podaj liczbę zawodników"
            />
          <SwordConfirmPopup
                isOpen={isEvaluateFinalsPopupOpen}
                onClose={() => setIsEvaluateFinalsPopupOpen(false)}
                onAccept={handleEvaluateFinals}
                title="Ewaluuj finały"
                text="Ta opcja zewaluuje wyniki walk w drabince finałowej. Zewaluowane walki będą liczone do wyników, a zwycięzcy zostaną awansowani do kolejnej fazy. Czy jesteś pewny/a, że chcesz ewaluować finały?"
            />
          <SwordConfirmPopup
                isOpen={isPurgeFinalsPopupOpen}
                onClose={() => setIsPurgeFinalsPopupOpen(false)}
                onAccept={handlePurgeFinals}
                title="Wyczyść finały"
                text="UWAGA! Ta opcja całkowicie usuwa drzewo finałowe z jego zawartością. Akcja jest nieodwracalna. Czy chcesz wyczyścić finały?"
            />
            </>
          )}
        </div>
      </div>
    </TemplatePage>
  );
};