import { ReactChild } from 'react';
import { Theme, styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { ReactIcon } from '../ReactIcon';

interface IProps {
  children: ReactChild;
  title: string;
  show: boolean;
  setShow: (show: boolean) => void;
  hideTitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StyledMuiDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

export interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose } = props;
  return (
    <StyledMuiDialogTitle>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <StyledIconButton aria-label="close" onClick={onClose}>
          <ReactIcon
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme: Theme) => theme.palette.grey[500],
            }}
            icon="eva:close-circle-fill"
          />
        </StyledIconButton>
      ) : null}
    </StyledMuiDialogTitle>
  );
};

function FormDialog(props: IProps) {
  const { show, setShow, title, children, hideTitle = false, size = 'md' } = props;

  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Dialog
        maxWidth={size}
        open={show}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {!hideTitle && (
          <DialogTitle onClose={handleClose} id="form-dialog-title">
            {title}
          </DialogTitle>
        )}
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
}

export default FormDialog;
