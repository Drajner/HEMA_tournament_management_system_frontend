import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from "./GroupDetailsPage.module.scss";
import { sendRequestGET, sendRequestDELETE, sendBareRequestDELETE, sendRequestPOST, sendBareRequestPOST, sendEmptyRequestPOST, sendUnauthRequestGET } from 'requests';
import { Link, useParams } from 'react-router-dom';
import { SwordConfirmPopup } from 'components/SwordConfirmPopup';
import { SwordButtonPopup } from 'components/SwordButtonPopup';
import { SwordDroplistPopup } from 'components/SwordDroplistPopup';
import { SwordDoubleDroplistPopup } from 'components/SwordDoubleDroplistPopup';
import { SwordFloatPopup } from 'components/SwordFloatPopup';

export const GroupDetailsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [fights, setFights] = useState([]);
  const [isParticipantDeletePopupOpen, setIsParticipantDeletePopupOpen] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState<any>(null);
  const [isFightDeletePopupOpen, setIsFightDeletePopupOpen] = useState(false);
  const [fightToDelete, setFightToDelete] = useState<number | null>(null);
  const [isAddParticipantPopupOpen, setIsAddParticipantPopupOpen] = useState(false);
  const [tournamentParticipants, setTournamentParticipants] = useState([]);
  const [tournamentNumber, setTournamentNumber] = useState<number | null>(null);
  const [isAddFightPopupOpen, setIsAddFightPopupOpen] = useState(false);
  const [modifier, setModifier] = useState<number>(1);
  const [isEvaluatePopupOpen, setIsEvaluatePopupOpen] = useState(false);
  const [isGeneratePopupOpen, setIsGeneratePopupOpen] = useState(false);
  const [isModifierPopupOpen, setIsModifierPopupOpen] = useState(false);

  const [role, setRole] = useState<string | null>(null);

  const { number } = useParams();

  const fetchData = () => {
	  console.log("number: "+number);
    sendUnauthRequestGET('participants/get/group/'+number)
      .then(async response => {
        const participantsData = await response.json();
        setParticipants(participantsData);
      })
      .catch(err => console.error("Error fetching participants:", err));

    sendUnauthRequestGET('fights/get/'+number)
      .then(async response => {
        const groupsData = await response.json();
        setFights(groupsData);
      })
      .catch(err => console.error("Error fetching groups:", err));

    sendUnauthRequestGET('groups/getOne/'+number)
      .then(async response => {
        const groupData = await response.json();
        setTournamentNumber(groupData.tournamentId);
        setModifier(groupData.modifier);
      })
      .catch(err => console.error("Error fetching tournament data", err));

	};

  const fetchTournamentParticipants = () => {
    sendUnauthRequestGET('participants/get/tournament/'+tournamentNumber)
      .then(async response => {
        const tpData = await response.json();
        setTournamentParticipants(tpData);
      })
      .catch(err => console.error("Error fetching tournament participants", err));
  }

  useEffect(() => {
    setRole(localStorage.getItem("role"))
    fetchData();
  }, []);

  const handleDeleteFight = () => {
    if (fightToDelete === null) return;
    sendRequestDELETE(`fights/delete/${fightToDelete}`).then(async r => {
      if (r.ok) {
      fetchData();
      setIsFightDeletePopupOpen(false);
      setFightToDelete(null);
      } else {
      alert('Nie udało się usunąć walki');
      }
    });
  };

  const handleDeleteParticipant = () => {
    if (participantToDelete === null) return;
    sendBareRequestDELETE(participantToDelete, `groups/deleteParticipant/${number}`).then(async r => {
      if (r.ok) {
      fetchData();
      setIsParticipantDeletePopupOpen(false);
      setParticipantToDelete(null);
      } else {
      alert('Nie udało się usunąć zawodnika');
      }
    });
  };

  const handleAddParticipant = (participant: any) => {
    sendBareRequestPOST(participant.participantId, `groups/addParticipant/${number}`).then(async r => {
      if (r.ok) {
      fetchData();
      setIsAddParticipantPopupOpen(false);
      } else {
      alert('Nie udało się dodać zawodnika');
      }
    });
  };

  const handleAddFight = (firstParticipant: any, secondParticipant: any) => {
    if (firstParticipant && secondParticipant) {
      const fightData = {
          firstParticipantId: firstParticipant.participantId,
          secondParticipantId: secondParticipant.participantId
      };

      sendRequestPOST(fightData, `groups/addFight/${number}`)
          .then(async r => {
              if (r.ok) {
                fetchData();
                setIsAddFightPopupOpen(false);
              } else {
                alert("Nie udało się dodać walki");
              }
          });
    } else {
        alert("Nie wybrano dwóch zawodników.");
    }
  };

  const handleEvaluate = () => {
    sendEmptyRequestPOST(`groups/evaluateGroup/${number}`).then(async r => {
      if (r.ok) {
      fetchData();
      setIsEvaluatePopupOpen(false);
      } else {
      alert('Nie udało się zewaluować grupy');
      }
    });
  };

  const handleGenerate = () => {
    sendEmptyRequestPOST(`groups/autoGenerateFights/${number}`).then(async r => {
      if (r.ok) {
      fetchData();
      setIsGeneratePopupOpen(false);
      } else {
      alert('Nie udało się wygenerować walki');
      }
    });
  };

  const handleModifier = (newModifier: number) => {
    sendBareRequestPOST(newModifier.toString(), `groups/setModifier/${number}`).then(async r => {
      if (r.ok) {
      fetchData();
      setIsModifierPopupOpen(false);
      } else {
      alert('Nie udało się wygenerować walki');
      }
    });
  };

  const openFightDeletePopup = (fightId: number) => {
      setFightToDelete(fightId);
      setIsFightDeletePopupOpen(true);
  };

  const openParticipantDeletePopup = (participantId: number) => {
      setParticipantToDelete(participantId);
      setIsParticipantDeletePopupOpen(true);
  };  

  const openAddParticipantPopup = () => {
    fetchTournamentParticipants();
    setIsAddParticipantPopupOpen(true);
  };  

  const openAddFightPopup = () => {
    fetchTournamentParticipants();
    setIsAddFightPopupOpen(true);
  };

  const openEvaluatePopup = () => {
    setIsEvaluatePopupOpen(true);
  }; 

  const openGeneratePopup = () => {
    setIsGeneratePopupOpen(true);
  }; 

  const openModifierPopup = () => {
    setIsModifierPopupOpen(true);
  }; 

  return (
    <TemplatePage>
      <div className={s.fullDiv}>
      <h1 className={s.headerUp}>Szczegóły grupy</h1>
        <div className={s.transDiv}>
          <h1 className={s.headerUp}>Zawodnicy</h1>
          <h1><br></br></h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>
            {role === 'ADMIN' && ( 
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => openAddParticipantPopup()} className={s.addButton}>
                Dodaj zawodnika
              </SwordButtonPopup>
            </div>
            )}

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
                    <li>Status: {participant.status}</li>
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

          <h1 className={s.headerUp}>Walki</h1>
          <h1><br></br></h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>

            {role === 'ADMIN' && ( 
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => openAddFightPopup()} className={s.addButton}>
                Dodaj walkę
              </SwordButtonPopup>
            </div>
            )}
            {fights.map((fight: any, index: number) => (
              <div key={fight.id} className={s.mainDiv}>
                <div className={s.header}>
                  <Link to={`/fight/${fight.id}`}>
                  <h2 className={s.header2}>WALKA {index + 1}: {fight.firstParticipant.fullName} vs {fight.secondParticipant.fullName} {fight.firstParticipantPoints}:{fight.secondParticipantPoints}</h2>
                  </Link>
                </div>

                {role === 'ADMIN' && ( 
                <SwordButtonPopup
                    className={s.deleteButton}
                    onClick={() => openFightDeletePopup(fight.id)}
                    variant="small"
        	        >
                    Usuń
                </SwordButtonPopup>
                )}
              </div>
            ))}
          </div>

          {role === 'ADMIN' && ( 
          <>
          <h1 className={s.headerUp}>Funkcje grupy</h1>
          <h1><br></br></h1>
          <h1><br></br></h1>
          <div className={s.contentRow}>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => openModifierPopup()} className={s.addButton}>
                Zmień modyfikator M = {modifier}
              </SwordButtonPopup>
            </div>
            <h1><br></br></h1>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => openEvaluatePopup()} className={s.addButton}>
                Ewaluuj wyniki walk
              </SwordButtonPopup>
            </div>
            <h1><br></br></h1>
            <div className={s.addButtonContainer}>
              <SwordButtonPopup onClick={() => openGeneratePopup()} className={s.addButton}>
                Wygeneruj walki
              </SwordButtonPopup>
            </div>
          </div>
          <SwordConfirmPopup
                isOpen={isFightDeletePopupOpen}
                onClose={() => setIsFightDeletePopupOpen(false)}
                onAccept={handleDeleteFight}
                title="Usuń walkę"
                text="Czy jesteś pewny/a, że chcesz usunąć tą walkę?"
            />
          <SwordConfirmPopup
                isOpen={isParticipantDeletePopupOpen}
                onClose={() => setIsParticipantDeletePopupOpen(false)}
                onAccept={handleDeleteParticipant}
                title="Usuń zawodnika"
                text="Czy jesteś pewny/a, że chcesz usunąć tego zawodnika z grupy?"
            />
          <SwordDroplistPopup
                isOpen={isAddParticipantPopupOpen}
                onClose={() => setIsAddParticipantPopupOpen(false)}
                onAccept={handleAddParticipant}
                title="Dodaj zawodnika do grupy"
                participants={tournamentParticipants}
            />
          <SwordDoubleDroplistPopup
                isOpen={isAddFightPopupOpen}
                onClose={() => setIsAddFightPopupOpen(false)}
                onAccept={handleAddFight}
                title="Dodaj walkę pomiędzy"
                participants={participants}
            />
          <SwordFloatPopup
                isOpen={isModifierPopupOpen}
                onClose={() => setIsModifierPopupOpen(false)}
                onAccept={handleModifier}
                title="Wybierz modyfikator"
                prompt="Wpisz liczbę rzeczywistą"
            />
          <SwordConfirmPopup
                isOpen={isEvaluatePopupOpen}
                onClose={() => setIsEvaluatePopupOpen(false)}
                onAccept={handleEvaluate}
                title="Ewaluuj wyniki walk"
                text="Ta opcja zewaluuje wyniki walk w tej grupie. Zewaluowane walki będą liczone do wyników. Czy jesteś pewny/a, że chcesz ewaluować tą grupę?"
            />
          <SwordConfirmPopup
                isOpen={isGeneratePopupOpen}
                onClose={() => setIsGeneratePopupOpen(false)}
                onAccept={handleGenerate}
                title="Wygeneruj walki"
                text="Ta opcja wygeneruje walki pomiędzy wszystkimi zawodnikami. Czy jesteś pewny/a, że chcesz wygenerować walki?"
            />
          </>
          )}
        </div>
      </div>
    </TemplatePage>
  );
};