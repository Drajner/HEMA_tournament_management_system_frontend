import React, { useState } from 'react'
import {TemplatePage} from "templates/TemplatePage";
import s from "./AddParticipantPage.module.scss"
import {SwordButton} from "components/SwordButton";
import {SwordButtonAlt} from "components/SwordButtonAlt";
import {SwordLoginFailed} from "components/SwordLoginFailed";
import { Link, useParams, useNavigate } from 'react-router-dom';
import {PATHS} from "config/paths";
import {SwordInput} from "components/SwordInput";
import {FieldValues, useForm} from "react-hook-form";
// import {useUserContext} from "context/UserContext";
import {sendRequestPOST} from 'requests';


export const AddParticipantPage: React.FC = () => {
	const [isFailOpen, setIsFailOpen] = useState(false);
	const redirect = useNavigate();
	const {register, handleSubmit} = useForm();

    const { number } = useParams();

	async function addParticipant(data: FieldValues){
		let response = sendRequestPOST(
			{"name": data.name, "surname": data.surname, "teamName": data.teamName},
			'participants/add/tournament/'+number
		).then(async r => {
			if (r.ok) {
				redirect(PATHS.tournamentDetails.replace(':number', number))
			}
			else {
				setIsFailOpen(true)
			}
		})
	}

	return (
		<TemplatePage>
			<div className={s.fullDiv}>
				<div className={s.transDiv}>
					<h3 className={s.headerDown}>Dodawanie zawodnika</h3>
					<form className={s.formContainer} onSubmit={handleSubmit(addParticipant)}>
						<div className={s.inputContainer}>
							<SwordInput placeholder="Imie" {...register("name")}/>
							<SwordInput placeholder="Nazwisko" {...register("surname")}/>
                            <SwordInput placeholder="Klub" {...register("teamName")}/>
							<SwordLoginFailed isOpen={isFailOpen}></SwordLoginFailed>
						</div>
						<SwordButtonAlt type="submit">Dodaj zawodnika</SwordButtonAlt>
					</form>
				</div>
			</div>
		</TemplatePage>
	)
}