import { Box, Link, useTheme } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export interface FileDownloadLinkProps {
  filename?: string;
  downloadUrl?: string;
}

export const FileDownloadLink = ({
  downloadUrl,
  filename,
}: FileDownloadLinkProps) => {
  const theme = useTheme();

  if (!downloadUrl) {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        color={theme.palette.secondary.main}
        fontSize={'16px'}
        fontWeight={600}
        lineHeight={'21px'}
      >
        In progress... <LoopIcon sx={{ marginLeft: '8px' }} />
      </Box>
    );
  } else {
    return (
      <Link color={theme.palette.secondary.main} href={downloadUrl}>
        <Box
          component={'span'}
          color={theme.palette.background.paper}
          fontSize={'16px'}
          fontWeight={600}
          lineHeight={'21px'}
          display={'flex'}
          alignItems={'center'}
          sx={{ textDecoration: 'underline' }}
        >
          {filename}
          <FileDownloadOutlinedIcon
            sx={{ color: theme.palette.secondary.main, marginLeft: '8px' }}
          />
        </Box>
      </Link>
    );
  }
};

export default FileDownloadLink;
