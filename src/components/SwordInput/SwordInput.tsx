import React from 'react'
import s from "./SwordInput.module.scss"
import {SwordInputProps} from "./SwordInput.types";
import clsx from "clsx";

export const SwordInput = React.forwardRef<any, SwordInputProps>((
	{
		className,
		variant = "primary",
		...props
	}, ref
) => {
	return (
		<label className={s.container}>
			<input
				className={clsx(s.input, s["variant-" + variant])}
				ref={ref}
				{...props}
			/>
		</label>
	)
})
