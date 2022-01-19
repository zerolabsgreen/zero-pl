import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Popover from "@mui/material/Popover";
import styled from "@mui/material/styles/styled";
import LogoutIcon from '@mui/icons-material/Logout';

export const AuthButton = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <LoadingButton />;
  if (!isAuthenticated) return <LoginButton />;

  return (<AuthorizedButton />)
}

const LoadingButton = () => {
  return (<StyledButton><CircularProgress size="20px" /></StyledButton>)
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (<StyledButton onClick={loginWithRedirect}>Login</StyledButton>)
}

const AuthorizedButton = () => {
  const { logout, user } = useAuth0();
  const handleLogout = () => logout({ returnTo: window.location.origin });

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
    <StyledButton aria-describedby={id} onClick={handleClick}>
      {user?.name}
    </StyledButton>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      sx={{ top: '4px' }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}>
        <StyledList>
          <StyledListItem onClick={handleLogout}>
            Logout <StyledLogoutIcon />
          </StyledListItem>
        </StyledList>
    </Popover>
    </>
  )
}

const StyledButton = styled(Button)(({ theme }) => `
  position: absolute;
  right: 20px;
  top: 25px;
  font-weight: 600;
  background-color:#fff;
  padding: 6px 14px;
  color: ${theme.palette.primary.main};
  &:hover {
    background-color: ${theme.palette.secondary.main};
    color: #fff
  }
`)

const StyledList = styled(List)`
  padding: 0;
`

const StyledListItem = styled(ListItem)(({ theme }) => `
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  color: ${theme.palette.primary.main};
  display: flex;
  align-items: center;
  transform: all .3s ease-in;
  &:hover {
    color: #fff;
    background-color: ${theme.palette.secondary.main};
  }
`)

const StyledLogoutIcon = styled(LogoutIcon)`
  font-size: 14px;
  margin-left: 4px;
`
