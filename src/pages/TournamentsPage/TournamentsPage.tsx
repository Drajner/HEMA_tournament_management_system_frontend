import React, { useState, useEffect } from 'react';
import {TemplatePage} from "templates/TemplatePage";
import s from "./TournamentsPage.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {PATHS} from "config/paths";
import {sendRequestGET, sendRequestPOST, sendBareRequestPOST} from 'requests';
import { SwordButtonPopup } from 'components/SwordButtonPopup';
import { SwordPopup } from 'components/SwordPopup';
import { SwordButton } from 'components/SwordButton';

export const TournamentPage = () => {
	const [tournaments, setTournaments] = useState([]);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

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
		  console.log(response)
		  if (r.ok) {
			// Update tournaments list
			fetchTournaments();
			setIsPopupOpen(false);
		  } else {
			alert('Failed to add tournament');
		  }
		});
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
			{tournaments.map((item1: any) => (
				<div className={s.mainDiv} key={item1.tournamentId}>
				<div className={s.header}>
					<Link to={`/tournament/${item1.tournamentId}`}>
					<h2 className={s.header2}>ID: {item1.tournamentId} | {item1.name}</h2>
					</Link>
				</div>
				</div>
			))}
			<SwordPopup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				onAccept={handleAddTournament}
				title="Dodaj turniej"
				prompt="Wpisz nazwę turnieju"
			/>
			</div>
		</div>
		</TemplatePage>
	);
};
