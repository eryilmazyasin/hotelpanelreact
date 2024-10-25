import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (e?: any) => void;
  title?: string;
  text?: string;
}

function ConfirmDialog(props: IProps) {
  const { open, onClose, onConfirm, title, text } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title ? title : "Onay"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text ? text : "İşleme devam etmek istediğinize emin misiniz?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Vazgeç</Button>
        <Button onClick={onConfirm} color="primary">
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
