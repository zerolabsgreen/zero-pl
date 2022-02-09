import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import { FilecoinNodeDto } from "@energyweb/zero-protocol-labs-api-client"
import FieldLabel from "../common/FieldLabel"
import FieldValue from "../common/FieldValue"
import PaperBox from "../common/PaperBox"
import { ReactComponent as ZeroLabsLogo } from '../../assets/zero-labs-logo.svg'
import { FC } from "react"

interface UserInfoBlockProps {
  userName?: string;
  userAddress?: string;
  filecoinNodes?: FilecoinNodeDto[];
  buyerId?: string;
}

const UserInfoBlock: FC<UserInfoBlockProps> = ({ userName, userAddress, filecoinNodes, buyerId }) => {
  const theme = useTheme();
  const minerIdsText = filecoinNodes.map(node => node.id).join(', ')
  return (
    <PaperBox bgColor={theme.palette.background.default}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Box display="flex" alignItems={'center'}>
            <ZeroLabsLogo />
            <Box marginLeft="10px">
              <Typography color="primary" fontWeight={700} fontSize="14px" lineHeight="16px">
                {userName}
              </Typography>
              <Typography color="primary" fontSize='10px' fontWeight={500} lineHeight={'13px'} >
                {userAddress}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box mr="30px">
            <FieldLabel fontSize={'14px'} lineHeight={"16px"} labelText={'Buyer ID'} />
            <FieldValue copyToClipboardEnabled valueText={buyerId} />
          </Box>
          <Box>
            <FieldLabel fontSize={'14px'} lineHeight={"16px"} labelText={'Filecoin Miner IDs'} />
            <FieldValue fontSize={'14px'} lineHeight={"16px"} valueText={minerIdsText} />
          </Box>
        </Grid>
      </Grid>
    </PaperBox>
  )
}

export default UserInfoBlock
