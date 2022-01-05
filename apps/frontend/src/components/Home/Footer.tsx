import { Link } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

export const Footer = () => {
  return (
    <Wrapper item>
      <Title>
        Zero Labs is incorporated in Talinn, Estonia
      </Title>
      <Box display="flex" margin="0 auto">
        <StyledLink>
          Privacy policy
        </StyledLink>
        <StyledLink>
          Cookies policy
        </StyledLink>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Grid)(({theme}) => `
  background-color: ${theme.palette.primary.dark};
  display: flex;
  align-items: center;
  padding: 36px 72px 37px 72px;
`)

const Title = styled(Typography)`
  font-size: 12px;
  font-weight: 700;
  color: #CDABFF;
  text-align: center;
`

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #CDABFF;
  text-decoration: none;
  cursor: pointer;
  margin-right: 32px;
`
