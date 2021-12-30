import { FC } from 'react';
import clsx from 'clsx';
import { Button, ButtonProps } from '@material-ui/core';
import { useStyles } from './styled-button.style';

export const StyledButton: FC<ButtonProps> = (props) => {
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
