import { Box, Link, useMediaQuery, Theme } from '@mui/material';
import { useStyles } from './footer-styles';

export const Footer = () => {
  const styles = useStyles();
  const windowRespWidth = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <footer className={styles.footer}>
      <Box className={styles.policy}>
        <Link className={styles.link} mr={`${!windowRespWidth && '32px'}`}>
          Privacy Policy
        </Link>
        <Link className={styles.link} mt={`${windowRespWidth && '4px'}`}>
          Cookies Policy
        </Link>
      </Box>
    </footer>
  );
};

export default Footer;
