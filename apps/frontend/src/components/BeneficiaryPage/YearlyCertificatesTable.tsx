import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FC, SVGProps } from "react";
import { ReactComponent as EyeGreySVG } from '../../assets/svg/eye_grey.svg';

export type CertificatePerYear = {
  year: number;
  amount: number;
}

interface YearlyCertificatesTableProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  items: CertificatePerYear[];
  handleClick?: () => void;
  selected?: boolean;
}

const YearlyCertificatesTable: FC<YearlyCertificatesTableProps> = ({
  icon: Icon, title, subtitle, handleClick, selected = false, items
}) => {
  const theme = useTheme();
  const totalAmount = items.reduce((prev, current) => prev + current.amount, 0);

  return (
    <Box sx={{ cursor: 'pointer' }} onClick={handleClick}>
      <Box width="100%" display="flex" alignItems={'flex-end'} mb="14px">
        <Icon />
        <Box ml="16px" width="100%">
          <Typography color={selected ? 'secondary' : 'primary'} fontSize="24px" fontWeight={'bold'} lineHeight={'24px'}>
            {title}
          </Typography>
          <Typography color={selected ? 'secondary' : 'primary'} fontSize="10px" fontWeight={500} lineHeight={'13px'}>
            {subtitle}
          </Typography>
        </Box>
        <EyeGreySVG />
      </Box>
      <Box p="16px" bgcolor={selected ? theme.palette.secondary.light : theme.palette.background.default} borderRadius={'10px'} display={'flex'}>
        <Box>
          <Typography color="primary" fontSize={'14px'} fontWeight={500} lineHeight={'16px'} mb="4px">
            ALL
          </Typography>
          <Typography color="primary" fontSize={'16px'} fontWeight={700} lineHeight={'20px'}>
            {totalAmount}
          </Typography>
        </Box>
        <StyledDivider orientation="vertical" />
        {items.map(item => (
          <Box key={`${title}-${item.year}-${item.amount}`} mr="40px">
            <Typography color={item.amount === 0 ? 'inherit' : 'primary'} fontSize={'14px'} fontWeight={500} lineHeight={'16px'} mb="4px">
              {item.year}
            </Typography>
            <Typography color={item.amount === 0 ? 'inherit' : 'primary'} fontSize={'16px'} fontWeight={700} lineHeight={'20px'}>
              {item.amount}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const StyledDivider = styled(Divider)`
  height: 38px;
  width: 1px;
  background-color: #D0CBF0;
  margin: 0px 24px;
`

export default YearlyCertificatesTable
