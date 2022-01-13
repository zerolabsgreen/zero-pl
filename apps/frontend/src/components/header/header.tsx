import { Box, Container, useTheme } from '@mui/material';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { ReactComponent as LogoFilecoin } from '../../assets/svg/filecoinLogo.svg';
import { ReactComponent as ZeroLogo } from '../../assets/svg/zero-labs-logo.svg';
import { useSelectedProtocolStore } from '../../context';

export const Header = () => {
  const selectedProtocol = useSelectedProtocolStore();
  const theme = useTheme();
  // bad should be more generic
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;

  return (
      <header
        style={{
          background: isFilecoin
            ? variables.filcoinBackgroundColor
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
