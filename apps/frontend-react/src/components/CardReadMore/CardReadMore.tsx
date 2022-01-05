import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import FilcoinLogo from '../../assets/svg/filecoinLogo.svg';
import { ReactComponent as Vector } from '../../assets/svg/vector-line.svg';
import { ReactComponent as People } from '../../assets/svg/people.svg';
import { useStyles } from './СardReadMore.styles';

const cardData = [
  'You can contribute to decarbonize the crypto sector by buying RECs that match your energy consumption',
];

export default function CardReadMore() {
  const styles = useStyles();

  const [showInfo, setShowInfo] = React.useState<boolean>(true);

  const toggleCardInfo = () => setShowInfo(!showInfo);

  return (
    <Card className={styles.card}>
      <Box width="111px" height="32px" mb={'16px'}>
        <CardMedia component="img" alt="Filcoin" image={FilcoinLogo} />
      </Box>
      <CardContent>
        <Typography color={variables.black}>
          Thanks for considering buying RECs!
        </Typography>
        <List>
          {cardData.map((el) => {
            return (
              <ListItem key={el} className={styles.listItem}>
                <ListItemIcon sx={{ minWidth: '20px' }}>•</ListItemIcon>
                <ListItemText className={styles.listItemText}>
                  {el}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          onClick={toggleCardInfo}
          className={styles.button}
          endIcon={
            showInfo ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          Read more
        </Button>
        {showInfo && (
          <Box>
            <Vector />
            <Box display="flex">
              <People />
              <Box ml={'21px'}>
                <Typography
                  color={variables.filcoinColor}
                  lineHeight={'20px'}
                  fontSize={'16px'}
                  fontWeight={700}
                >
                  Alan <br />
                  Protocol Labs
                </Typography>
                <Typography
                  color={variables.black}
                  lineHeight={'15.31px'}
                  fontSize={'12px'}
                  fontWeight={500}
                >
                  Power Systems <br /> Research Scientist
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}
