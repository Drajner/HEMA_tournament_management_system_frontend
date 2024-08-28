import React from 'react';
import clsx from 'clsx';
import {SwordButtonPopupProps} from "./SwordButtonPopup.types";
import s from './SwordButtonPopup.module.scss';

export const SwordButtonPopup: React.FC<SwordButtonPopupProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <button
      className={clsx(
        s.container,
        s['variant-' + variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};