import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import type { FC } from "react"
import FieldLabel from "../common/FieldLabel"
import FieldValue from "../common/FieldValue"
import PaperBox from "../common/PaperBox"
import { ReactComponent as ZeroLabsLogo } from '../../assets/zero-labs-logo.svg'

interface UserInfoBlockProps {
  minerId?: string;
  userName?: string;
  userAddress?: string;
  buyerId?: string;
}

const UserInfoBlock: FC<UserInfoBlockProps> = ({ minerId, userName, userAddress, buyerId }) => {
  const theme = useTheme();
  return (
    <PaperBox bgColor={theme.palette.background.default}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems={'center'}>
            <ZeroLabsLogo />
            <Box marginLeft="16px">
              <Typography color="primary" fontWeight={700} fontSize="16px" lineHeight="16px">
                {minerId}
              </Typography>
              {userAddress &&
              <Typography color="primary" fontSize='12px' fontWeight={500} lineHeight={'13px'} >
                {userAddress}
              </Typography>}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box mr="30px">
            <FieldLabel fontSize={'14px'} lineHeight={"16px"} labelText={'Buyer ID'} />
            <FieldValue copyToClipboardEnabled valueText={buyerId} />
          </Box>
          <Box>
            <FieldLabel fontSize={'14px'} lineHeight={"16px"} labelText={'Buyer name'} />
            <FieldValue valueText={userName} />
          </Box>
        </Grid>
      </Grid>
    </PaperBox>
  )
}

export default UserInfoBlock
