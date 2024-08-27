import React, { useState, useEffect } from 'react';
import {TemplatePage} from "templates/TemplatePage";
import s from "./TournamentsPage.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {PATHS} from "config/paths";
import {sendRequestGET} from 'requests';


export const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);

	useEffect(() => {
		console.log("chuuuuuuj");
		sendRequestGET(
			'tournaments/get'
		).then(async r => {
			let response = await r.json()
			setTournaments(response)
		})
	}, []);

  return (
	<TemplatePage>
		<div className={s.fullDiv}>
			<div className={s.transDiv}>
				<h1 className={s.headerUp}>Turnieje</h1>
				<h1><br></br></h1>
				{tournaments.map((item1: any) => (
					<div className={s.mainDiv}>
						<div className={s.header}>
							
							<Link to={`/tournament/${item1.tournamentId}`}>
								<h2 className={s.header2}>ID: {item1.tournamentId} | {item1.name}</h2>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	</TemplatePage>
  );
};
