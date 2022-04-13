import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"

const SecondaryButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'active' })<{ active?: boolean }>(({ theme, active }) => `
  background-color: ${active ? theme.palette.secondary.main : theme.palette.background.paper};
  color: ${active ? theme.palette.text.primary : theme.palette.primary.main};
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  border-radius: 5px;
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  & path {
    fill: ${active && theme.palette.primary.main}
  }
  &:hover {
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.text.primary};
    & path {
      fill: ${theme.palette.primary.main}
    }
  }
`)

export default SecondaryButton
