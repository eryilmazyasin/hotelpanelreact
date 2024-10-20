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

import {
  handleNightlyRateBlur,
  handleNightlyRateChange,
  handleNightlyRateFocus,
} from "../helpers/helpers.ts";
import useAddRoom from "../hooks/useAddRoom.ts";
import useDeleteRoom from "../hooks/useDeleteRoom.ts";
import useUpdateRoom from "../hooks/useUpdateRoom.ts";
import { IRoom } from "../interfaces/interface.ts";

interface IProps {
  open: boolean;
  room?: IRoom;
  onRoomModalOpenState: (value: boolean) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddUpdateRoomModal = ({ open, room, onRoomModalOpenState }: IProps) => {
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
  const { mutate: mutateUpdateRoom } = useUpdateRoom();
  const { mutate: mutateDeleteRoom } = useDeleteRoom();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  console.log({ open, room, onRoomModalOpenState, openDialog });

  useEffect(() => {
    setRoomNumber(room ? room.room_number : "");
    setRoomType(room ? room.room_type : "");
    setDescription(room ? room.description : "");
    setNightlyRate(room ? room.price_per_night : "");
    setAvailability(room ? room.is_available : true);

    const price = room?.price_per_night?.toString()?.replace(/[^\d.]/g, "");

    setNightlyRate(price);
    setFormattedNightlyRate(price);
  }, []);

  const handleClose = () => {
    onRoomModalOpenState?.(false);
    setRoomNumber("");
    setRoomType("");
    setDescription("");
    setNightlyRate("");
    setFormattedNightlyRate("");
    setAvailability(true);
    setErrors({
      roomNumber: false,
      roomType: false,
      nightlyRate: false,
    });
  };

  const handleAddUpdateRoom = (event) => {
    event.preventDefault();

    // Hata kontrolü
    let newErrors = {
      roomNumber: roomNumber === "",
      roomType: roomType === "",
      nightlyRate: nightlyRate === "" || parseFloat(nightlyRate) === 0,
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (isValid) {
      const formData = {
        room_number: roomNumber,
        room_type: roomType,
        description: description,
        price_per_night: parseFloat(nightlyRate), // Ham değeri formda kullan
        is_available: availability ? 1 : 0,
      };

      const updateFormData = {
        ...formData,
        id: room?.id,
      };

      if (room) {
        //güncelleme
        mutateUpdateRoom(updateFormData as any);
      } else {
        //ekleme
        mutateAddRoom(formData as any);
      }

      handleClose();
    } else {
      console.log("Form validation failed");
    }
  };

  const handleDeleteRoom = (event) => {
    event.preventDefault();

    const isConfirmed = window.confirm(
      "Bu odayı silmek istediğinize emin misiniz?"
    );
    if (isConfirmed) {
      mutateDeleteRoom(room?.id);
      handleClose();
    }
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
          {room ? `Oda ${room.room_number}` : "Oda Ekle"}
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
          {room && (
            <Button onClick={handleDeleteRoom} color="error">
              Odayı Sil
            </Button>
          )}

          <Button onClick={handleAddUpdateRoom}>
            {room ? "Güncelle" : "Kaydet"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default AddUpdateRoomModal;
