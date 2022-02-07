import { File } from '@energyweb/zero-protocol-labs-api-client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import FileDownloadLink from '../FileDownloadLink';
import PaperBox from '../PaperBox';

export interface DownloadSectionProps {
  fileList: File[];
}

export const DownloadSection = ({ fileList = [] }: DownloadSectionProps) => {
  const theme = useTheme();

  return (
    <PaperBox customPadding={'25px'} bgColor={theme.palette.primary.main}>
      <ResponsiveBox>
        <StyledTypography>
          Download official Attestation
        </StyledTypography>
        {fileList.map((file) => (
          <FileDownloadLink
            key={file.fileName + file.url}
            downloadUrl={file.url}
            filename={file.fileName ?? 'Official attestion'}
          />
        ))}
      </ResponsiveBox>
    </PaperBox>
  );
};

export default DownloadSection;

const ResponsiveBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  @media (max-width: 375px) {
    flex-direction: column;
  };
`;

const StyledTypography = styled(Typography)(({ theme }) => `
  font-size: 20px;
  color: ${theme.palette.text.primary};
  font-weight: 600;
  line-height: 22px;
  @media (max-width: 375px) {
    font-size: 18px;
  };
`)
