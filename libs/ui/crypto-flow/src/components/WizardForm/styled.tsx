import emotionStyled from '@emotion/styled';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";

export const StyledForm = emotionStyled.form`
  display: flex;
  flex-direction: column;
  width: 488px;
`;

export const StepperWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;
