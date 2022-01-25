import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { useStyles } from './wire-transfer-instructions.style';

export const useWireTransferInstructionsEffects = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const uploadButtonText = isMobile
    ? 'Upload payment recipe'
    : 'Upload document';

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, application/pdf',
    multiple: false,
  });

  const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
    <Box key={file.path} className={classes.fileName}>
      {file.path}
    </Box>
  ));

  return {
    uploadButtonText,
    getRootProps,
    getInputProps,
    acceptedFileItems,
  };
};
