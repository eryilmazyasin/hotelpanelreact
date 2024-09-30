import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

export default function ReservationModal({
  open,
  room,
  onReservationModalOpenState,
}: IProps) {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [nightlyRate, setNightlyRate] = useState<any>("");
  const [formattedNightlyRate, setFormattedNightlyRate] = useState<any>(""); // Formatlı değer için yeni bir state
  const [availability, setAvailability] = useState(true);

  const [errors, setErrors] = useState({
    roomNumber: false,
    roomType: false,
    nightlyRate: false,
  });

  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const { mutate: mutateAddRoom } = useAddRoom();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

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
              label="Oda Numarası"
              variant="outlined"
              fullWidth
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              error={errors.roomNumber} // Hata durumu
              helperText={errors.roomNumber && "Oda numarası boş bırakılamaz"} // Hata mesajı
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <FormControl fullWidth error={errors.roomType}>
              <InputLabel id="room-type-label">Oda Tipi</InputLabel>
              <Select
                labelId="room-type-label"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                label="Oda Tipi"
              >
                <MenuItem value="standard">Standart</MenuItem>
                <MenuItem value="deluxe">Deluxe</MenuItem>
              </Select>
              {errors.roomType && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  Oda tipi boş bırakılamaz
                </p>
              )}
            </FormControl>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Açıklama"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Gecelik Ücret"
              variant="outlined"
              fullWidth
              type="text" // Sayısal giriş ama formatlı gösterim
              value={formattedNightlyRate} // Formatlı hali gösteriyoruz
              onChange={(e) =>
                handleNightlyRateChange(
                  e,
                  setNightlyRate,
                  setFormattedNightlyRate
                )
              }
              onBlur={() =>
                handleNightlyRateBlur(nightlyRate, setFormattedNightlyRate)
              } // Input dışına çıkıldığında formatla
              onFocus={() =>
                handleNightlyRateFocus(nightlyRate, setFormattedNightlyRate)
              } // Input'a tıklayınca ham değeri göster
              error={errors.nightlyRate} // Hata durumu
              helperText={errors.nightlyRate && "Gecelik ücret boş bırakılamaz"} // Hata mesajı
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                />
              }
              label="Müsait"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button>Kaydet</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
