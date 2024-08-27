import React from 'react'
import {SwordLinkButtonProps} from "./SwordLinkButton.types";
import {Link} from "react-router-dom";
import {SwordButton} from "../SwordButton";
import clsx from "clsx";
import s from "./SwordLinkButton.module.scss";

export const SwordLinkButton: React.FC<SwordLinkButtonProps> = (
	{
		children,
		className,
		buttonClassName,
		href,
		variant = 'default',
		...props
	}) => {

	return (
		<Link className={clsx(className, s["variant-" + variant])} to={href}>
			<SwordButton
				className={buttonClassName}
				variant={variant}
				{...props}
			>
				{children}
			</SwordButton>
		</Link>
	)
}
