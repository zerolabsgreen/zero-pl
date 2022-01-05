import PaperBox from '../paper-box/paper-box';
import { Box, Typography } from '@mui/material';
import FileDownloadLink from '../file-download-link/file-download-link';
import { File } from '@energyweb/zero-protocol-labs-api-client';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  style: {
    '@media (max-width: 375px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  styleText: {
    fontSize: 20,
    '@media (max-width: 375px)': {
      fontSize: 18,
    },
  },
}));

export interface DownloadSectionProps {
  fileList: File[];
}

export const DownloadSection = ({ fileList = [] }: DownloadSectionProps) => {
  const classes = useStyles();

  return (
    <PaperBox customPadding={'25px'} bgColor={'#2D1155'}>
      <Box
        className={classes.style}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Typography
          className={classes.styleText}
          color={'#fff'}
          fontWeight={600}
          lineHeight={'22px'}
        >
          Download official Attestation
        </Typography>
        {fileList.map((file, index) => (
          <FileDownloadLink
            key={file.fileName + file.url}
            downloadUrl={file.url}
            filename={file.fileName}
          />
        ))}
      </Box>
    </PaperBox>
  );
};

export default DownloadSection;
