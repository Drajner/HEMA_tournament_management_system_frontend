import React from 'react'
import {SwordLinkButtonAltProps} from "./SwordLinkButtonAlt.types";
import {Link} from "react-router-dom";
import {SwordButtonAlt} from "../SwordButtonAlt";
import clsx from "clsx";
import s from "./SwordLinkButtonAlt.module.scss";

export const SwordLinkButtonAlt: React.FC<SwordLinkButtonAltProps> = (
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
			<SwordButtonAlt
				className={buttonClassName}
				variant={variant}
				{...props}
			>
				{children}
			</SwordButtonAlt>
		</Link>
	)
}
