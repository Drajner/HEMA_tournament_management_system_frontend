import React from "react";

export type SwordButtonPopupProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    variant?: 'default' | 'small';
  }
  