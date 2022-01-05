import { Button, SvgIconProps } from '@mui/material';
import { useStyles } from './welcome-page-submit-button.styles';

export interface IWelcomePageSubmitButtonProps {
  name: string;
  icon: SvgIconProps;
  onClick?: () => void;
}

export const WelcomePageSubmitButton = ({
  name,
  icon,
  onClick,
}: IWelcomePageSubmitButtonProps) => {
  const styles = useStyles();
  return (
    <Button
      className={styles.btn}
      type="submit"
      variant={'contained'}
      endIcon={icon}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default WelcomePageSubmitButton;
