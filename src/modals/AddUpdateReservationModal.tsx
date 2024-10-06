import React, { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

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

import { Dayjs } from "dayjs";
import ReservationDatePicker from "../components/ReservationDatePicker.tsx";
// Helper fonksiyonları import ediyoruz
import {
  handleNightlyRateBlur,
  handleNightlyRateChange,
  handleNightlyRateFocus,
} from "../helpers/helpers.ts";
import useAddCustomer from "../hooks/useAddCustomer.ts";
import useAddReservation from "../hooks/useAddReservation.ts";
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
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [errors, setErrors] = useState({
    customerName: false,
    customerPhone: false,
    checkInDate: false, // Giriş tarihi için hata yönetimi
    checkOutDate: false, // Çıkış tarihi için hata yönetimi
  });

  const theme = useTheme();
  const queryClient = useQueryClient();
  const { mutate: mutateAddCustomer } = useAddCustomer();
  const { mutate: mutateAddReservation } = useAddReservation();

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

  const handleSave = (event) => {
    event.preventDefault(); // Formun varsayılan submit işlemini engelle

    // Hata kontrolü
    let newErrors = {
      customerName: customerName === "",
      customerPhone: customerPhone === "",
      checkInDate: checkInDate === null, // Giriş tarihi boş mu?
      checkOutDate: checkOutDate === null, // Çıkış tarihi boş mu?
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (isValid) {
      const customerData = {
        first_name: customerName,
        last_name: "",
        phone_number: customerPhone,
        national_id: customerId,
        room_id: room.id,
      };

      mutateAddCustomer(customerData, {
        onSuccess: (customerResponse) => {
          const rooms = queryClient.getQueryData<IRoom[]>(["rooms"]);

          console.log({ customerResponse });

          if (rooms) {
            const updatedRooms = rooms.map((room) => {
              if (room.id === room.id) {
                return {
                  ...room,
                  Customer: customerResponse,
                };
              }
              return room;
            });

            queryClient.setQueryData(["rooms"], updatedRooms);
          }

          // Müşteri başarılı şekilde kaydedildi, şimdi rezervasyonu kaydedelim
          const nights = checkOutDate && checkOutDate.diff(checkInDate, "day"); // Gün farkını hesapla

          const reservationData = {
            room_id: room.id,
            customer_id: customerResponse.id,
            check_in_date: checkInDate?.format("YYYY-MM-DD"),
            check_out_date: checkOutDate?.format("YYYY-MM-DD"),
            num_of_guests: guestNumber,
            total_price: nights ? parseFloat(nightlyRate) * nights : 0,
            price_per_night: parseFloat(nightlyRate),
          };

          // Rezervasyonu kaydet
          mutateAddReservation(reservationData, {
            onSuccess: () => {
              console.log("Rezervasyon başarıyla kaydedildi.", reservationData);
              handleClose(); // İşlem tamamlandığında modalı kapat
            },
            onError: (error) => {
              console.error(
                "Rezervasyon kaydedilemedi:",
                error,
                reservationData
              );
            },
          });
        },
        onError: (error) => {
          console.error("Müşteri kaydedilemedi:", error);
        },
      });
    } else {
      console.log("Form doğrulama hatası");
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
            <ReservationDatePicker
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              setCheckInDate={setCheckInDate}
              setCheckOutDate={setCheckOutDate}
              errors={errors} // Hata durumlarını prop olarak gönderiyoruz
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Kaydet</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
