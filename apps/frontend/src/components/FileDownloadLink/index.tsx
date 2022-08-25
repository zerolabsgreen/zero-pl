import LoopIcon from '@mui/icons-material/Loop';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';

export interface FileDownloadLinkProps {
  filename: string;
  downloadUrl: string;
  newTab?: boolean;
}

export const FileDownloadLink = ({
  downloadUrl,
  filename,
  newTab
}: FileDownloadLinkProps) => {
  const theme = useTheme();

  // This is a hacky way of downloading file, but it allows to use headers (API-KEY)
  // Previously downloading through Link from mui prevented from using custom headers
  const handleDownload = async (url: string | undefined) => {
    if (url) {
      return await axios({
        url,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
    };
    return;
  }

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
        <Box
          onClick={() => newTab ? openInNewTab(downloadUrl) : handleDownload(downloadUrl)}
          component={'span'}
          color={theme.palette.background.paper}
          fontSize={'16px'}
          fontWeight={600}
          lineHeight={'21px'}
          display={'flex'}
          alignItems={'center'}
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {filename}
          <FileDownloadOutlinedIcon
            sx={{ color: theme.palette.secondary.main, marginLeft: '8px' }}
          />
        </Box>
    );
  }
};

export default FileDownloadLink;
