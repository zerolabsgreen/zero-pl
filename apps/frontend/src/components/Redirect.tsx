import { styled } from '@mui/material/styles'
import { Helmet } from 'react-helmet-async'

const Container = styled('div')(({ theme }) => `
  width: 100%;
  height: 100%;
  background-color: ${theme.palette.background.paper};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`)

const LoadingText = styled('div')(({ theme }) => `
  font-size: 32px;
  font-weight: 500;
  color: ${theme.palette.primary.light};
`)

const Redirect = () => {
  return (
    <>
          <Helmet>
      <style type={'text/css'}>
        {`
        .opacitor { animation: showHide 1.5s infinite; }
        @keyframes showHide { from { opacity: 1 } to { opacity: 0.3 } alternate;  }
        `}
      </style>
    </Helmet>
    <Container>
        <LoadingText className='opacitor'>Redirecting to the newest user interface...</LoadingText>
      </Container>
      </>
  )
}

export default Redirect
