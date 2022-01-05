import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import { Box, Button, Modal, Paper, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { useSelectedProtocolStore } from '../../context';
import { useStyles } from './RemoveMinerIdModal.styles';

interface RemoveMinerIdModalProps {
  open: boolean;
  id: number | undefined;
  handleClose: () => void;
  handleRemove: (id: number | undefined) => void;
}

export const RemoveMinerIdModal: FC<RemoveMinerIdModalProps> = ({
  open,
  id,
  handleClose,
  handleRemove,
}) => {
  const selectedProtocol = useSelectedProtocolStore();
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;
  const classes = useStyles({ isFilecoin });
  const theme = useTheme();
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper className={classes.wrapper}>
        <Typography
          color="primary"
          variant="h5"
          component="span"
          textAlign="center"
          fontSize={theme.breakpoints.down('sm') ? '16px' : undefined}
        >
          Are you sure you want to remove this Miner ID / Address ?
        </Typography>
        <Box className={classes.buttonGroup}>
          <Button
            className={classes.buttonCancel}
            variant="contained"
            onClick={handleClose}
            classes={{ contained: classes.button }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemove(id)}
            classes={{ contained: classes.button }}
          >
            Remove
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
