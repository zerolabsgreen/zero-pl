import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactComponent as BitcoinIcon } from '../../assets/enterArrowGreen.svg';
import { ReactComponent as FilecoinIcon } from '../../assets/enterArrowBlue.svg';
import { useSelectedProtocolStore } from '../../context';
import { BackButton, Wrapper } from '../../components/WizardThankYouPage/styled';
import { FilecoinColors } from '../../utils';

const WizardThankPage = () => {
  const selectedProtocol = useSelectedProtocolStore();
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;
  const router = useRouter();

  return (
    <Wrapper isFilecoin={isFilecoin}>
      <Grid item>
        <Typography
          color={isFilecoin ? FilecoinColors.primary : 'secondary'}
          fontSize={'32px'}
          fontWeight={700}
          textAlign={'center'}
          mb={'12px'}
        >
          Thank you for submitting your request
        </Typography>
        <Typography
          color={isFilecoin ? FilecoinColors.simpleText : undefined}
          fontSize={'20px'}
          fontWeight={500}
          textAlign={'center'}
        >
          Our team will be in contact with you very soon
        </Typography>
      </Grid>
      <Grid item>
        <BackButton
          isFilecoin={isFilecoin}
          endIcon={isFilecoin ? <FilecoinIcon /> : <BitcoinIcon />}
          onClick={() => router.push('/wizard')}
        >
          Back to beginning
        </BackButton>
      </Grid>
    </Wrapper>
  );
};

export default WizardThankPage;
