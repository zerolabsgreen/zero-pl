import { Button } from '@mui/material';
import Icon from './assets/arrow.svg';
import useStyles from './button-right-style';

export const ButtonRight = () => {
  const styles = useStyles();
  return (
    <Button className={styles.btn}>
      <img src={Icon} />
    </Button>
  );
};
