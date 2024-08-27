import React from 'react'
import s from "./SwordButton.module.scss"
import {SwordButtonProps} from "./SwordButton.types";
import clsx from "clsx";

export const SwordButton: React.FC<SwordButtonProps> = ({
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
