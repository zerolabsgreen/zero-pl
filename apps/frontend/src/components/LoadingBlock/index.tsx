import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

const StyledLoading = styled('div')`
  display: flex;
  justify-content: center;
  height: calc(100vh - 88px);
  align-items: center;
  flex-wrap: wrap;
`;

export const LoadingBlock = () => {
  const theme = useTheme();
  return (
  <StyledLoading>
    <Helmet>
      <title>Loading - Please Wait</title>
      <style type={'text/css'}>
        {`body * { background-color: ${theme.palette.primary.main} ; }
        .opacitor { animation: showHide 2s infinite; }
        @keyframes showHide { from { opacity:1 } to { opacity:0.3 } alternate;  }
        `}
      </style>
    </Helmet>

    <Box>
      <Box mb={2} width={'100%'}>
        <Typography
          className={'opacitor'}
          textAlign={'center'}
          color={theme.palette.background.default}
          fontWeight={700}
          fontSize={'32px'}
        >
          Please wait!
        </Typography>
      </Box>
      <svg
        width="303"
        height="400"
        viewBox="0 0 303 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.3">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M151.549 0C235.151 0 303 67.8493 303 151.451C303 235.151 235.151 303 151.549 303C67.8493 303 0 235.151 0 151.451C0 67.8493 67.8493 0 151.549 0ZM151.549 21.3756C223.434 21.3756 281.644 79.5657 281.644 151.471C281.644 223.356 223.454 281.664 151.549 281.664C79.6636 281.664 21.3756 223.376 21.3756 151.471C21.3756 79.5657 79.6636 21.3756 151.549 21.3756Z"
            fill="url(#paint0_angular)"
          />
        </g>
        <g opacity="0.6">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M151.041 24C221.123 24 278 80.877 278 150.959C278 221.123 221.123 278 151.041 278C80.8769 278 24 221.123 24 150.959C24 80.877 80.8769 24 151.041 24ZM151.041 41.9188C211.301 41.9188 260.098 90.6986 260.098 150.975C260.098 211.236 211.318 260.114 151.041 260.114C90.7807 260.114 41.9188 211.252 41.9188 150.975C41.9188 90.6986 90.7807 41.9188 151.041 41.9188Z"
            fill="url(#paint1_angular)"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M152.035 44C211.08 44 259 91.92 259 150.965C259 210.08 211.08 258 152.035 258C92.9199 258 45 210.08 45 150.965C45 91.92 92.9199 44 152.035 44ZM152.035 59.0969C202.805 59.0969 243.917 100.195 243.917 150.979C243.917 201.75 202.819 242.931 152.035 242.931C101.264 242.931 60.0969 201.764 60.0969 150.979C60.0969 100.195 101.264 59.0969 152.035 59.0969Z"
          fill="url(#paint2_angular)"
        />
        <path
          d="M148.5 167.972C146.883 167.972 145.344 167.625 143.946 167L140 398H157L153.054 167C151.657 167.625 150.117 167.972 148.5 167.972Z"
          fill="white"
        />
        <path
          d="M160.607 155.416C160.607 149.734 156.681 144.971 151.394 143.688C150.479 143.466 149.523 143.348 148.54 143.348C147.502 143.348 146.495 143.479 145.534 143.725C140.325 145.061 136.474 149.789 136.474 155.416C136.474 156.593 136.643 157.732 136.958 158.807C137.522 160.736 138.554 162.465 139.924 163.863C141.02 164.98 142.33 165.885 143.789 166.511C145.247 167.136 146.853 167.483 148.54 167.483C150.227 167.483 151.833 167.136 153.292 166.511C154.8 165.864 156.149 164.919 157.266 163.75C158.617 162.336 159.627 160.594 160.166 158.655C160.453 157.625 160.607 156.539 160.607 155.416Z"
          fill="white"
        />
        <path
          d="M145.534 142.517C146.495 142.271 147.503 142.14 148.541 142.14C149.524 142.14 150.48 142.258 151.395 142.481V0L139.673 124.064L145.534 130.177V142.517H145.534Z"
          fill="white"
        />
        <path
          d="M12.8301 230.387L126.12 178.509L128.482 170.376L139.171 164.204C137.801 162.806 136.769 161.078 136.205 159.148L12.8301 230.387Z"
          fill="white"
        />
        <path
          d="M179.943 163.299L171.719 165.319L161.033 159.148C160.494 161.087 159.484 162.829 158.133 164.243L281.509 235.485L179.943 163.299Z"
          fill="white"
        />
        <rect x="5" y="397" width="284" height="3" fill="white" />
        <defs>
          <radialGradient
            id="paint0_angular"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(151.5 151.5) rotate(90) scale(151.5)"
          >
            <stop stopColor={theme.palette.primary.light} />
            <stop offset="1" stopColor={theme.palette.primary.main} />
          </radialGradient>
          <radialGradient
            id="paint1_angular"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(151 151) rotate(90) scale(127)"
          >
            <stop stopColor={theme.palette.primary.light} />
            <stop offset="1" stopColor={theme.palette.primary.main} />
          </radialGradient>
          <radialGradient
            id="paint2_angular"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(152 151) rotate(90) scale(107)"
          >
            <stop stopColor={theme.palette.primary.light} />
            <stop offset="1" stopColor={theme.palette.primary.main} />
          </radialGradient>
        </defs>
      </svg>
    </Box>
  </StyledLoading>
)}

export default LoadingBlock
