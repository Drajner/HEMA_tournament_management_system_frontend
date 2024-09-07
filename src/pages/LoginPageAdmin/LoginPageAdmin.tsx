import React, { useState } from 'react'
import {TemplatePage} from "templates/TemplatePage";
import s from "./LoginPageAdmin.module.scss"
import {SwordButton} from "components/SwordButton";
import {SwordButtonAlt} from "components/SwordButtonAlt";
import {SwordLoginFailed} from "components/SwordLoginFailed";
import {Link, useNavigate} from "react-router-dom";
import {PATHS} from "config/paths";
import {SwordInput} from "components/SwordInput";
import {FieldValues, useForm} from "react-hook-form";
// import {useUserContext} from "context/UserContext";
import {sendRequestPOST} from 'requests';


export const LoginPageAdmin: React.FC = () => {
	const [isFailOpen, setIsFailOpen] = useState(false);
	const redirect = useNavigate();
	const {register, handleSubmit} = useForm();

	async function sendLoginRequest(data: FieldValues){
		let response = sendRequestPOST(
			{"username": data.username, "password": data.password},
			'users/login'
		).then(async r => {
			let response = await r.json()
			if (r.ok) {
				redirect(PATHS.tournament)
				localStorage.setItem("token", response.token);
				localStorage.setItem("role", response.status);
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
					<h1 className={s.headerUp}>LOGOWANIE</h1>
					<h3 className={s.headerDown}></h3>
					<form className={s.formContainer} onSubmit={handleSubmit(sendLoginRequest)}>
						<div className={s.inputContainer}>
							<SwordInput placeholder="Nazwa użytkownika" {...register("username")}/>
							<SwordInput type="password" placeholder="Hasło" {...register("password")}/>
							<SwordLoginFailed isOpen={isFailOpen}></SwordLoginFailed>
						</div>
						<SwordButtonAlt type="submit">Zaloguj się</SwordButtonAlt>
						<p className={s.signInCaption}>
							Nie masz konta?{" "}
							<Link to={PATHS.register}><b>Zarejestruj się</b></Link>
						</p>
					</form>
				</div>
			</div>
		</TemplatePage>
	)
}
