import { Box, Container, useTheme } from '@mui/material';
import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { ReactComponent as LogoFilecoin } from '../../assets/filecoin-logo.svg';
import { ReactComponent as ZeroLogo } from '../../assets/zero-labs-logo.svg';
import { FilecoinColors } from '../../utils';
import { useSelectedProtocolStore } from '../../context';

export const Header = () => {
  const selectedProtocol = useSelectedProtocolStore();
  const theme = useTheme();
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;

  return (
      <header
        style={{
          background: isFilecoin
            ? FilecoinColors.primary
            : theme.palette.primary.main
        }}
      >
        <Container maxWidth={'xl'}>
          <Box
            sx={{ height: '88px' }}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
          >
            {isFilecoin ? (
              <Box>
                <ZeroLogo style={{ marginRight: '40px' }} />
                <LogoFilecoin />
              </Box>
            ) : (
              <ZeroLogo />
            )}
          </Box>
        </Container>
      </header>
  );
};

export default Header;
