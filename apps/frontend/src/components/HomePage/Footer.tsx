import { Link } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material/styles"

export const Footer = () => {
  return (
    <Wrapper item>
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
  background-color: ${theme.palette.primary.main};
  display: flex;
  align-items: center;
  padding: 36px 72px 37px 72px;
`)

const StyledLink = styled(Link)(({ theme }) => `
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: ${theme.palette.text.primary};
  text-decoration: none;
  cursor: pointer;
  margin-right: 32px;
`)
