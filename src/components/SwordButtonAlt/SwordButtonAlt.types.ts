import React from "react";

export type SwordButtonAltProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	variant?: "default" | "small";
};
