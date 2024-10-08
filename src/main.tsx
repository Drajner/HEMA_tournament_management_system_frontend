import React from 'react'
import ReactDOM from 'react-dom/client'
import 'styles/app.scss'
import {RouterProvider} from "react-router-dom";
import {routes} from "./config/routes";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={routes}/>
	</React.StrictMode>,
)
