import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ReservationDatePicker from "../components/ReservationDatePicker.tsx";
// Helper fonksiyonları import ediyoruz
import {
  handleNightlyRateBlur,
  handleNightlyRateChange,
  handleNightlyRateFocus,
} from "../helpers/helpers.ts";
import useAddRoom from "../hooks/useAddRoom.ts";
import { IRoom } from "../interfaces/interface.ts";

interface IProps {
  open: boolean;
  room: IRoom;
  onReservationModalOpenState: (value: boolean) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddUpdateReservationModal({
  open,
  room,
  onReservationModalOpenState,
}: IProps) {
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [nightlyRate, setNightlyRate] = useState("");
  const [customerId, setCustomerId] = useState<any>("");
  const [formattedNightlyRate, setFormattedNightlyRate] = useState<any>(""); // Formatlı değer için yeni bir state
  const [guestNumber, setGuestNumber] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  const [errors, setErrors] = useState({
    customerName: false,
    customerPhone: false,
    customerId: false,
  });

  const theme = useTheme();
  const { mutate: mutateAddRoom } = useAddRoom();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  useEffect(() => {
    const roomPrice = room && room.price_per_night;
    setNightlyRate(roomPrice);
    handleNightlyRateBlur(roomPrice, setFormattedNightlyRate);
  }, [room]);

  const handleClose = () => {
    onReservationModalOpenState?.(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        fullScreen={fullScreen}
        fullWidth
        disableEscapeKeyDown
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Oda {room.room_number} - Rezervasyon
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Ad Soyad"
              variant="outlined"
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              error={errors.customerName}
              helperText={
                errors.customerName && "Müşteri bilgileri boş bırakılamaz."
              }
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Telefon Numarası"
              variant="outlined"
              fullWidth
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              error={errors.customerPhone}
              type="number"
              helperText={
                errors.customerPhone && "Telefon numarası boş bırakılamaz."
              }
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="TC Kimlik Numarası"
              variant="outlined"
              fullWidth
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Misafir Sayısı"
              variant="outlined"
              fullWidth
              type="number"
              value={guestNumber}
              onChange={(e) => setGuestNumber(Number(e.target.value))}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Gecelik Ücret"
              variant="outlined"
              fullWidth
              type="text"
              value={formattedNightlyRate}
              onChange={(e) =>
                handleNightlyRateChange(
                  e,
                  setNightlyRate,
                  setFormattedNightlyRate
                )
              }
              onBlur={() =>
                handleNightlyRateBlur(nightlyRate, setFormattedNightlyRate)
              }
              onFocus={() =>
                handleNightlyRateFocus(nightlyRate, setFormattedNightlyRate)
              }
            />
          </div>

          <div>
            <ReservationDatePicker />
          </div>
        </DialogContent>
        <DialogActions>
          <Button>Kaydet</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
