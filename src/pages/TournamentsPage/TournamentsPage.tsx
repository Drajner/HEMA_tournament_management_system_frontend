import React, { useState, useEffect } from 'react';
import {TemplatePage} from "templates/TemplatePage";
import s from "./TournamentsPage.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {PATHS} from "config/paths";
import {sendRequestGET, sendRequestPOST, sendBareRequestPOST, sendRequestDELETE} from 'requests';
import { SwordButtonPopup } from 'components/SwordButtonPopup';
import { SwordPopup } from 'components/SwordPopup';
import { SwordConfirmPopup } from 'components/SwordConfirmPopup'; 
import { SwordButton } from 'components/SwordButton';

export const TournamentPage = () => {
	const [tournaments, setTournaments] = useState([]);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [tournamentToDelete, setTournamentToDelete] = useState<number | null>(null);

	const fetchTournaments = () => {
	  sendRequestGET('tournaments/get').then(async r => {
	    let response = await r.json();
	    setTournaments(response);
	  });
	};

	useEffect(() => {
		fetchTournaments();  // Fetch tournaments on component mount
	}, []);

	const handleAddTournament = (inputString: string) => {
		sendBareRequestPOST(inputString, 'tournaments/add').then(async r => {
		  let response = await r.json();
		  if (r.ok) {
			fetchTournaments();
			setIsPopupOpen(false);
		  } else {
			alert('Nie udało się dodać turnieju');
		  }
		});
	};

	const handleDeleteTournament = () => {
		if (tournamentToDelete === null) return;
		sendRequestDELETE(`tournaments/delete/${tournamentToDelete}`).then(async r => {
		  if (r.ok) {
			fetchTournaments();
			setIsConfirmPopupOpen(false);
			setTournamentToDelete(null);
		  } else {
			alert('Nie udało się usunąć turnieju');
		  }
		});
	  };

	const openConfirmPopup = (tournamentId: number) => {
        setTournamentToDelete(tournamentId);
        setIsConfirmPopupOpen(true);
    };


	return (
		<TemplatePage>
		<div className={s.fullDiv}>
			<div className={s.transDiv}>
			<h1 className={s.headerUp}>Turnieje</h1>
			<h1><br/></h1>
			<div className={s.addButtonContainer}>
			<SwordButtonPopup onClick={() => setIsPopupOpen(true)} className={s.addButton}>
				Utwórz turniej
			</SwordButtonPopup>
			</div>
			{tournaments.map((tournament: any) => (
				<div className={s.mainDiv} key={tournament.tournamentId}>
				<div className={s.header}>
					<Link to={`/tournament/${tournament.tournamentId}`}>
					<h2 className={s.header2}>ID: {tournament.tournamentId} | {tournament.name}</h2>
					</Link>
					
				</div>
				<SwordButtonPopup
                    className={s.deleteButton}
                    onClick={() => openConfirmPopup(tournament.tournamentId)}
                    variant="small"
        	        >
                    Usuń
                </SwordButtonPopup>
				</div>
			))}
			<SwordPopup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				onAccept={handleAddTournament}
				title="Dodaj turniej"
				prompt="Wpisz nazwę turnieju"
			/>
			<SwordConfirmPopup
                isOpen={isConfirmPopupOpen}
                onClose={() => setIsConfirmPopupOpen(false)}
                onAccept={handleDeleteTournament}
                title="Usuń turniej"
                text="Czy jesteś pewny/a, że chcesz usunąć ten turniej?"
            />
			</div>
		</div>
		</TemplatePage>
	);
};
