import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import {LoginPageAdmin} from "../pages/LoginPageAdmin";
import {LoginPageParticipant} from "../pages/LoginPageParticipant";
import {TournamentPage} from "../pages/TournamentsPage";
import {TournamentDetailsPage} from "../pages/TournamentDetailsPage";
import {GroupDetailsPage} from "../pages/GroupDetailsPage";
import {FinalsTreePage} from "../pages/FinalsTreePage";
import {RegisterPage} from "../pages/RegisterPage";
import { FightDetailsPage } from "../pages/FightDetailsPage";
import { ParticipantDetailsPage } from "../pages/ParticipantDetailsPage";
import {PATHS} from "./paths";


export const routes = createBrowserRouter([
	{
		path: PATHS.home,
		element: <HomePage/>,
	},
	{
		path: PATHS.loginAdmin,
		element: <LoginPageAdmin/>
	},
	{
		path: PATHS.loginParticipant,
		element: <LoginPageParticipant/>
	},
	{
		path: PATHS.tournament,
		element: <TournamentPage/>
	},
	{
		path: PATHS.tournamentDetails,
		element: <TournamentDetailsPage/>
	},
	{
		path: PATHS.groupDetails,
		element: <GroupDetailsPage/>
	},
	{
		path: PATHS.finals,
		element: <FinalsTreePage/>
	},
	{
		path: PATHS.register,
		element: <RegisterPage/>
	},
	{
		path: PATHS.fight,
		element: <FightDetailsPage/>
	},
	{
		path: PATHS.participant,
		element: <ParticipantDetailsPage/>
	},
	
])
