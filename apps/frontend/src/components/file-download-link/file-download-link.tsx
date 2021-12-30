import { Box, Link } from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';
import FileDownloadOutlinedIcon from '@material-ui/icons/FileDownloadOutlined';
/* eslint-disable-next-line */
export interface FileDownloadLinkProps {
  filename?: string;
  downloadUrl?: string;
}

export const FileDownloadLink = ({
  downloadUrl,
  filename,
}: FileDownloadLinkProps) => {
  if (!downloadUrl) {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        color={'#00D08A'}
        fontSize={'16px'}
        fontWeight={600}
        lineHeight={'21px'}
      >
        In progress... <LoopIcon sx={{ marginLeft: '8px' }} />
      </Box>
    );
  } else {
    return (
      <Link color={'#00D08A'} href={downloadUrl}>
        <Box
          component={'span'}
          color={'#fff'}
          fontSize={'16px'}
          fontWeight={600}
          lineHeight={'21px'}
          display={'flex'}
          alignItems={'center'}
          sx={{ textDecoration: 'underline' }}
        >
          {filename}
          <FileDownloadOutlinedIcon
            sx={{ color: '#00D08A', marginLeft: '8px' }}
          />
        </Box>
      </Link>
    );
  }
};

export default FileDownloadLink;
