import React from "react";

export type SwordButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	variant?: "default" | "small";
};
