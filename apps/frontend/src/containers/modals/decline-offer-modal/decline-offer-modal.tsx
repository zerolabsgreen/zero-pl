import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormLabel,
  TextField,
} from '@material-ui/core';
import { StyledButton } from '../../../components/buttons';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';
import { useDeclineOfferModalEffects } from './decline-offer-modal.effects';
import { useStyles } from './decline-offer-modal.style';

interface DeclineOfferModalProps {
  open: boolean;
  handleClose: () => void;
}

export const DeclineOfferModal: FC<DeclineOfferModalProps> = ({
  open,
  handleClose,
}) => {
  const classes = useStyles();
  const { formik } = useDeclineOfferModalEffects();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
    >
      <DialogTitle className={classes.title}>Decline offer</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText className={classes.contentText}>
          Could You tell Us, why You decline the offer?
        </DialogContentText>
        <form className={classes.form}>
          <FormLabel className={classes.label}>Comment</FormLabel>
          <TextField
            fullWidth
            multiline
            rows={6}
            id="comment"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            className={classes.textField}
          />
        </form>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <StyledButton
          variant="contained"
          onClick={handleClose}
          startIcon={<CloseIcon />}
          className={classes.button}
          classes={{ startIcon: classes.icon }}
        >
          Cancel
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleClose}
          autoFocus
          endIcon={<CloseIcon />}
          className={classes.button}
          classes={{ endIcon: classes.icon }}
        >
          Confirm decline
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};
