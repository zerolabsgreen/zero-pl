import styled from "@emotion/styled";
import { Box } from "@material-ui/core"
import { useState } from "react";
import { ReactComponent as Chat } from '../../assets/svg/Chat.svg';
import CardReadMore from "./CardReadMore";

const Wrapper = styled(Box)`
  position: absolute;
  right: 80px;
  top: 300px
`

export const CardReadMoreTablet = () => {
  const [fullInfoOpen, setFullInfoOpen] = useState(false);

  const toggleFullInfoOpen = () => setFullInfoOpen(!fullInfoOpen);

  return (
    <>
    {fullInfoOpen
      ? (<Box onClick={toggleFullInfoOpen}>
          <CardReadMore />
        </Box>)
      : (
    <Wrapper>
      <Chat onClick={toggleFullInfoOpen} />
    </Wrapper>)
    }
    </>
  )
}
