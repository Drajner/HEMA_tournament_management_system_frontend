import React from 'react'
import s from "./TemplatePage.module.scss"


export const TemplatePage: React.FC<React.PropsWithChildren> = ({children}) => {

	return (
		<>
			<div className={s.container}>
				{children}
			</div>
		</>
	)
}
