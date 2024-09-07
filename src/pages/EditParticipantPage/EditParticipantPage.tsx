import React, { useState, useEffect } from 'react';
import { TemplatePage } from "templates/TemplatePage";
import s from './EditParticipantPage.module.scss';
import { sendRequestGET, sendRequestPOST } from 'requests';
import { SwordButtonPopup } from 'components/SwordButtonPopup';
import { useParams, useNavigate } from 'react-router-dom';
import { PATHS } from 'config/paths';

interface ParticipantDetails {
    participantId: number;
    name: string;
    surname: string;
    club: string;
    status: string;
    score: number;
    wins: number;
    doubles: number;
    cards: number;
    ranking: number;
    fullName: string;
}

export const EditParticipantPage: React.FC = () => {
    const redirect = useNavigate();
    const [participantDetails, setParticipantDetails] = useState<ParticipantDetails | null>(null);
    const { number } = useParams();
    
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [club, setClub] = useState('');
    const [status, setStatus] = useState('COMPETING');
    const [score, setScore] = useState(0);
    const [wins, setWins] = useState(0);
    const [doubles, setDoubles] = useState(0);
    const [cards, setCards] = useState(0);

    

    const fetchData = () =>{
        sendRequestGET('participants/get/' + number)
            .then(async response => {
                const participantData = await response.json();
                setParticipantDetails(participantData);

                setName(participantData.name || '');
                setSurname(participantData.surname || '');
                setClub(participantData.club || '');
                setStatus(participantData.status || 'COMPETING');
                setScore(participantData.score || 0);
                setWins(participantData.wins || 0);
                setDoubles(participantData.doubles || 0);
                setCards(participantData.cards || 0);
            })
            .catch(err => console.error("Error fetching participant details:", err));
    }

    useEffect(() => {
        fetchData();
    }, [number]);

    if (!participantDetails) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => 
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
        };

    const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<any>>) => 
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setter(e.target.value);
        };

	async function editParticipant(){
		let response = sendRequestPOST(
			{   "participantId": number,
                "name": name, 
                "surname": surname, 
                "club": club, 
                "status": status,
                "score": score, 
                "wins": wins, 
                "doubles": doubles, 
                "cards": cards,
            },
			'participants/replace'
		).then(async r => {
			if (r.ok && number != null) {
                fetchData();
				redirect(PATHS.participant.replace(":number", number))
			}
			else {
				alert("Nie udało się dokonać zmian");
			}
		})

	}

    return (
            <div className={s.background}>
                <div className={s.transDiv}>
                    <div className={s.participantDetailsContainer}>
                        <h1 className={s.header}>Zawodnik nr {number}</h1>
                        <div className={s.participantInfo}>
                            <p><span>Pełne imię:</span> {participantDetails.fullName}</p>
                            <label>
                                <span>Imię:</span>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={handleInputChange(setName)} 
                                    placeholder="Imię" 
                                />
                            </label>
                            <label>
                                <span>Nazwisko:</span>
                                <input 
                                    type="text" 
                                    value={surname} 
                                    onChange={handleInputChange(setSurname)} 
                                    placeholder="Nazwisko" 
                                />
                            </label>
                            <label>
                                <span>Klub:</span>
                                <input 
                                    type="text" 
                                    value={club} 
                                    onChange={handleInputChange(setClub)} 
                                    placeholder="Klub" 
                                />
                            </label>
                            <label>
                                <span>Status:</span>
                                <select 
                                    value={status} 
                                    onChange={handleSelectChange(setStatus)}
                                >
                                    <option value="COMPETING">COMPETING</option>
                                    <option value="ELIMINATED">ELIMINATED</option>
                                    <option value="DISQUALIFIED">DISQUALIFIED</option>
                                </select>
                            </label>
                            <label>
                                <span>Punktacja:</span>
                                <input 
                                    type="number" 
                                    value={score} 
                                    onChange={handleInputChange(setScore)} 
                                    placeholder="Punktacja" 
                                />
                            </label>
                            <label>
                                <span>Zwycięstwa:</span>
                                <input 
                                    type="number" 
                                    value={wins} 
                                    onChange={handleInputChange(setWins)} 
                                    placeholder="Zwycięstwa" 
                                />
                            </label>
                            <label>
                                <span>Duble:</span>
                                <input 
                                    type="number" 
                                    value={doubles} 
                                    onChange={handleInputChange(setDoubles)} 
                                    placeholder="Duble" 
                                />
                            </label>
                            <label>
                                <span>Kartki:</span>
                                <input 
                                    type="number" 
                                    value={cards} 
                                    onChange={handleInputChange(setCards)} 
                                    placeholder="Kartki" 
                                />
                            </label>
                        </div>
                    </div>
                    <div className={s.addButtonContainer}>
                    <SwordButtonPopup onClick={() => editParticipant()} className={s.addButton}>
                        Akceptuj zmiany
                    </SwordButtonPopup>
                    </div>
                </div>
            </div>
        );
};