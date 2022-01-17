import TableDesktop from './components/TableDesktop';
import { Theme } from '@mui/material/styles/createTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import TableMobile from './components/TableMobile';
import TableTablet from './components/TableTablet';
import type { TGenericTable } from './types'

export const GenericTable: TGenericTable = ({ headers, data }) => {
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (downMd && upSm) return (<TableTablet headers={headers} data={data} />)
  if (downSm) return (<TableMobile headers={headers} data={data} />)

  return (<TableDesktop headers={headers} data={data} />);
};
