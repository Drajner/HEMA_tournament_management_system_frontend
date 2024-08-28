import React, {useState} from 'react'
import s from "./HomePage.module.scss"
import {SwordLinkButton} from "../../components/SwordLinkButton";
import {SwordLinkButtonAlt} from "../../components/SwordLinkButtonAlt";
import {PATHS} from "../../config/paths";
import {TemplatePage} from "../../templates/TemplatePage";

export const HomePage: React.FC = () => {

	return (
		<TemplatePage>
			<div className={s.pageDiv}>
				<div className={s.transBox}>
					<div className={s.buttonContainer}>
						<h1 className={s.headerUp}>SYSTEM ZARZĄDZANIA</h1>
						<h1></h1>
						<h1 className={s.headerUp}>TURNIEJAMI</h1>
						<h1></h1>
						<h1></h1>
						<h1></h1>
						<h1></h1>
						<h1></h1>
						<h1></h1>
						<h3 className={s.headerDown}>"Ma w sobie coś z rycerza – zakuty łeb"</h3>
						<h3></h3>
							<SwordLinkButton href={PATHS.tournament}>Lista Turniejów</SwordLinkButton>
							<SwordLinkButtonAlt href={PATHS.loginAdmin}>Logowanie</SwordLinkButtonAlt>
					</div>
				</div>
			</div>
		</TemplatePage>
	)
}
