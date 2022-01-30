import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { ReactComponent as Chat } from '../../assets/chat.svg';
import CardReadMore from "./CardReadMore";

const Wrapper = styled(Box)`
  position: absolute;
  right: 80px;
  top: 300px;
`;

const CardReadMoreTablet = () => {
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

export default CardReadMoreTablet;
