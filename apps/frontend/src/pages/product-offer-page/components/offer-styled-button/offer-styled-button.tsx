import { FC } from 'react';
import clsx from 'clsx';
import { Button, ButtonProps } from '@mui/material';
import { useStyles } from './offer-styled-button.style';

export const OfferStyledButton: FC<ButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <Button
      {...props}
      className={clsx(props.className, {
        [classes.buttonPrimary]: props.color === 'primary',
      })}
      classes={{ root: classes.button, ...props.classes }}
    >
      {props.children}
    </Button>
  );
};
