import { Button } from '@mui/material';
import useStyles from './button-details-style';
import IconTop from './assets/arrowTop.svg';

export interface ButtonDetailsProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isButtonUp: boolean;
}

export const ButtonDetails = ({
  onClick,
  name,
  isButtonUp
}: ButtonDetailsProps) => {
  const styles = useStyles();
  return (
    <Button onClick={onClick} className={styles.btn}>
      {name}
      <img
        className={!isButtonUp ? styles.iconRotate : styles.icon}
        src={IconTop}
        alt="icon-top"
      />
    </Button>
  );
};

export default ButtonDetails;
