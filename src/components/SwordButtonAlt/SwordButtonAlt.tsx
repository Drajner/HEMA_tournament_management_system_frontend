import React from 'react'
import s from "./SwordButtonAlt.module.scss"
import {SwordButtonAltProps} from "./SwordButtonAlt.types";
import clsx from "clsx";

export const SwordButtonAlt: React.FC<SwordButtonAltProps> = ({
		children,
		className,
		variant = "default",
		...props
	}) => {
	return (
		<button className={clsx(
			s.container,
			s["variant-" + variant],
		)}>
			{children}
		</button>
	)
}
