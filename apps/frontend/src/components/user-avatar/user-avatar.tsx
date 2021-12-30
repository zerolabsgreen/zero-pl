import { FC } from 'react';
import { Box, Avatar, Typography } from '@material-ui/core';
import { useStyles } from './user-avatar.style';

interface UserAvatarProps {
  image: string;
  name: string;
  name2: string;
  position: string;
  imageSize?: number;
}

export const UserAvatar: FC<UserAvatarProps> = ({
  image,
  name,
  name2,
  position,
  imageSize,
}) => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Avatar
        src={image}
        sx={{ width: imageSize ?? 51, height: imageSize ?? 51 }}
      />
      <Box ml={2}>
        <Typography fontWeight={700} className={classes.name}>
          {name}
        </Typography>
        <Typography className={classes.text}>{position}</Typography>
        <Typography fontWeight={700} className={classes.text}>
          {name2}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserAvatar;
