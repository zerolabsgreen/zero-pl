import { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilecoinLogo from '../../assets/filecoinLogo.svg';
import { ReactComponent as Vector } from '../../assets/vector-line.svg';
import { ReactComponent as People } from '../../assets/people.svg';
import { FilecoinColors } from '../../utils';

const CardReadMore = () => {
  const [showInfo, setShowInfo] = useState(true);
  const toggleCardInfo = () => setShowInfo(!showInfo);

  return (
    <StyledCard>
      <Box width="111px" height="32px" mb='16px'>
        <CardMedia component="img" alt="Filcoin" image={FilecoinLogo} />
      </Box>
      <CardContent>
        <Typography color={FilecoinColors.simpleText}>
          Thanks for considering buying RECs!
        </Typography>
        <List>
          <StyledListItem>
            <ListItemIcon sx={{ minWidth: '20px' }}>•</ListItemIcon>
            <StyledListItemText>
              You can contribute to decarbonize the crypto sector by buying RECs that match your energy consumption
            </StyledListItemText>
          </StyledListItem>
        </List>
      </CardContent>
      <StyledCardActions>
        <StyledButton
          onClick={toggleCardInfo}
          endIcon={showInfo ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        >
          Read more
        </StyledButton>
        {showInfo && (
          <Box>
            <Vector />
            <Box display="flex">
              <People />
              <Box ml={'21px'}>
                <Typography
                  color={FilecoinColors.primary}
                  lineHeight={'20px'}
                  fontSize={'16px'}
                  fontWeight={700}
                >
                  Alan <br />
                  Protocol Labs
                </Typography>
                <Typography
                  color={FilecoinColors.simpleText}
                  lineHeight={'15px'}
                  fontSize={'12px'}
                  fontWeight={500}
                >
                  Power Systems <br /> Research Scientist
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </StyledCardActions>
    </StyledCard>
  );
}

export default CardReadMore;

const StyledCard = styled(Card)(({ theme }) => `
  max-width: 280px;
  position: absolute;
  top: 80px;
  right: 80px;
  padding: 32px 24px 31px 24px;
  background-color: ${theme.palette.background.paper};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
`);

const StyledListItem = styled(ListItem)`
  padding: 0;
  display: flex;
  align-items: flex-start;
`;

const StyledListItemText = styled(ListItemText)`
  & > span {
    color: ${FilecoinColors.simpleText};
  };
  margin: 0;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0%;
`;

const StyledButton = styled(Button)(({ theme }) => `
  &:hover {
    background-color: unset;
    color: ${theme.palette.primary.main}
  };
  color: ${theme.palette.primary.light};
  padding: 0;
  font-size: '14px';
  font-weight: 600;
`)
