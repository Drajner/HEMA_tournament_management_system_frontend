import React, { useState, useEffect } from 'react';
import {TemplatePage} from "templates/TemplatePage";
import s from "./ReportsPage.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {PATHS} from "config/paths";
import {sendRequestGET, sendRequestPOST, sendBareRequestPOST, sendRequestDELETE} from 'requests';
import { SwordButtonPopup } from 'components/SwordButtonPopup';
import { SwordPopup } from 'components/SwordPopup';
import { SwordConfirmPopup } from 'components/SwordConfirmPopup'; 
import { SwordLinkButton } from 'components/SwordLinkButton';

export const ReportsPage = () => {
	const [reports, setReports] = useState([]);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<number | null>(null);


	const fetchTournaments = () => {
	  sendRequestGET('reports/get').then(async r => {
	    let response = await r.json();
	    setReports(response);
	  });
	};

	useEffect(() => {
		fetchTournaments();
	}, []);

	const handleDeleteTournament = () => {
		if (reportToDelete === null) return;
		sendRequestDELETE(`reports/delete/${reportToDelete}`).then(async r => {
		  if (r.ok) {
			fetchTournaments();
			setIsConfirmPopupOpen(false);
			setReportToDelete(null);
		  } else {
			alert('Nie udało się usunąć raportu');
		  }
		});
	  };

	const openConfirmPopup = (reportNumber: number) => {
        setReportToDelete(reportNumber);
        setIsConfirmPopupOpen(true);
    };


	return (
		<TemplatePage>
		<div className={s.fullDiv}>
			<div className={s.transDiv}>
			<h1 className={s.headerUp}>Raporty</h1>
			<h1><br/></h1>
			{reports.map((report: any, index: number) => (
				<div className={s.mainDiv} key={index}>
				<div className={s.header}>
					<Link to={`/report/${index}`}>
					<h2 className={s.header2}> RAPORT {index+1}. Autor: {report.username} Walka: {report.fightId}</h2>
					</Link>
					
				</div>
				<SwordButtonPopup
                    className={s.deleteButton}
                    onClick={() => openConfirmPopup(index)}
                    variant="small"
        	        >
                    Usuń
                </SwordButtonPopup>
				</div>
			))}
			<SwordConfirmPopup
                isOpen={isConfirmPopupOpen}
                onClose={() => setIsConfirmPopupOpen(false)}
                onAccept={handleDeleteTournament}
                title="Usuń raport"
                text="Czy jesteś pewny/a, że chcesz usunąć ten raport?"
            />
			</div>
		</div>
		</TemplatePage>
	);
};
