import React, { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

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

import dayjs, { Dayjs } from "dayjs";
import ConfirmDialog from "../components/DialogMessage.tsx";
import ReservationDatePicker from "../components/ReservationDatePicker.tsx";
import {
  getStayDuration,
  handleNightlyRateBlur,
  handleNightlyRateChange,
  handleNightlyRateFocus,
} from "../helpers/helpers.ts";
import useAddReservation from "../hooks/useAddReservation.ts";
import useUpdateReservation from "../hooks/useUpdateReservation.ts"; // useUpdateReservation hook'unu import ettik
import { IRoom } from "../interfaces/interface.ts";

interface IProps {
  open: boolean;
  room: IRoom | null;
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
  const [guests, setGuests] = useState([
    { id: null, name: "", phone: "", nationalId: "" },
  ]);
  const [nightlyRate, setNightlyRate] = useState("");
  const [paidRate, setPaidRate] = useState("");
  const [leftAmount, setLeftAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(room?.Reservation?.total_price);
  const [formattedNightlyRate, setFormattedNightlyRate] = useState<any>("");
  const [formattedPaidRate, setFormattedPaidRate] = useState<any>("");
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [errors, setErrors] = useState({
    customerName: false,
    customerPhone: false,
    checkInDate: false,
    checkOutDate: false,
  });

  const theme = useTheme();
  const queryClient = useQueryClient();
  const { mutate: mutateAddReservation } = useAddReservation();
  const { mutate: mutateUpdateReservation } = useUpdateReservation(); // Rezervasyon güncelleme hook'u kullanıldı

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  useEffect(() => {
    if (room) {
      const roomPrice = room.Reservation
        ? room.Reservation?.price_per_night
        : room.price_per_night;
      const paidPrice = room.Reservation ? room.Reservation?.paid_amount : 0;

      setNightlyRate(roomPrice?.toString() || "");
      handleNightlyRateBlur(roomPrice, setFormattedNightlyRate);

      setPaidRate(paidPrice?.toString() || "");
      handleNightlyRateBlur(paidPrice, setFormattedPaidRate);

      if (room.Reservation) {
        setCheckInDate(dayjs(room.Reservation.check_in_date));
        setCheckOutDate(dayjs(room.Reservation.check_out_date));

        const customers = room.Customers || [];
        const guestList = customers.map((customer: any) => ({
          id: customer.id, // ID'yi burada ekliyoruz
          name: customer.first_name,
          phone: customer.phone_number,
          nationalId: customer.national_id,
        }));
        setGuests(guestList);
      }
    } else {
      setGuests([{ id: null, name: "", phone: "", nationalId: "" }]);
      setNightlyRate("");
      setPaidRate("");
      setCheckInDate(null);
      setCheckOutDate(null);
    }
  }, [room]);

  useEffect(() => {
    const diffInDays = getStayDuration(checkInDate, checkOutDate);

    const totalPrice = diffInDays ? parseFloat(nightlyRate) * diffInDays : 0;

    const leftAmount = totalPrice - parseFloat(paidRate) || 0;

    setTotalPrice(totalPrice);
    setLeftAmount(leftAmount);
  }, [nightlyRate, checkInDate, checkOutDate, paidRate]);

  const handleClose = () => {
    onReservationModalOpenState?.(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    let newErrors = {
      customerName: guests[0].name === "",
      customerPhone: guests[0].phone === "",
      checkInDate: checkInDate === null,
      checkOutDate: checkOutDate === null,
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (isValid) {
      const customerData = guests.map((guest) => ({
        ...(guest.id ? { id: guest.id } : {}), // Yalnızca id varsa ekleyin
        first_name: guest.name,
        phone_number: guest.phone,
        national_id: guest.nationalId,
      }));

      const reservationData = {
        room_id: room?.id || null,
        check_in_date: checkInDate ? checkInDate.format("YYYY-MM-DD") : null,
        check_out_date: checkOutDate ? checkOutDate.format("YYYY-MM-DD") : null,
        num_of_guests: guests.length,
        total_price: nightlyRate ? parseFloat(nightlyRate) * guests.length : 0,
        price_per_night: parseFloat(nightlyRate),
        paid_amount: parseFloat(paidRate),
        status: "active", // Varsayılan olarak "active" status'ü ekliyoruz
      };

      if (
        !reservationData.room_id ||
        !reservationData.check_in_date ||
        !reservationData.check_out_date
      ) {
        console.error("Eksik rezervasyon bilgileri:", reservationData);
        return;
      }

      if (room?.Reservation?.id) {
        const payload = {
          id: room.Reservation.id,
          reservationData,
          customersData: customerData,
        };

        mutateUpdateReservation(payload, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
            queryClient.invalidateQueries({ queryKey: ["rooms"] });

            handleClose();
          },
          onError: (error) => {
            console.error("Rezervasyon güncellenemedi:", error);
          },
        });
      } else {
        const payload = {
          reservationData,
          customersData: customerData,
        };

        mutateAddReservation(payload, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            handleClose();
          },
          onError: (error) => {
            console.error("Rezervasyon kaydedilemedi:", error);
          },
        });
      }
    } else {
      console.log("Form doğrulama hatası");
    }
  };

  const handleAddGuest = () => {
    setGuests([...guests, { id: null, name: "", phone: "", nationalId: "" }]);
  };

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index][field] = value;
    setGuests(updatedGuests);
  };

  const handleConfirm = () => {
    setConfirmOpen(true);
  };

  const handleCloseDialog = () => {
    setConfirmOpen(false);
  };

  const handleCheckout = () => {
    // İşlemi gerçekleştir
    axios
      .post(`/api/reservations/${room?.Reservation?.id}/checkout`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Oda başarıyla boşaltıldı.");
          queryClient.invalidateQueries({ queryKey: ["rooms"] });
        }
      })
      .catch((error) => {
        console.error("Oda boşaltılamadı:", error);
      });

    setConfirmOpen(false);
    handleClose();
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
          Oda {room?.room_number || ""} - Rezervasyon
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
          {guests.map((guest, index) => (
            <div
              key={index}
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <TextField
                label={index === 0 ? "Ad Soyad" : `Misafir ${index} Ad Soyad`}
                variant="outlined"
                fullWidth
                value={guest.name}
                onChange={(e) =>
                  handleGuestChange(index, "name", e.target.value)
                }
                error={index === 0 && errors.customerName}
                helperText={
                  index === 0 && errors.customerName
                    ? "Müşteri bilgileri boş bırakılamaz."
                    : ""
                }
                style={{ marginBottom: "1rem" }}
              />
              <TextField
                label={
                  index === 0
                    ? "Telefon Numarası"
                    : `Misafir ${index} Telefon Numarası`
                }
                variant="outlined"
                fullWidth
                value={guest.phone}
                onChange={(e) =>
                  handleGuestChange(index, "phone", e.target.value)
                }
                error={index === 0 && errors.customerPhone}
                helperText={
                  index === 0 && errors.customerPhone
                    ? "Telefon numarası boş bırakılamaz."
                    : ""
                }
                type="number"
                style={{ marginBottom: "1rem" }}
              />
              <TextField
                label={
                  index === 0
                    ? "TC Kimlik Numarası"
                    : `Misafir ${index} TC Kimlik`
                }
                variant="outlined"
                fullWidth
                value={guest.nationalId}
                onChange={(e) =>
                  handleGuestChange(index, "nationalId", e.target.value)
                }
              />
            </div>
          ))}

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

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Toplam Ücret"
              variant="outlined"
              fullWidth
              type="text"
              value={totalPrice}
              disabled
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Alınan Ücret"
              variant="outlined"
              fullWidth
              type="text"
              value={formattedPaidRate}
              onChange={(e) => {
                // Eğer kullanıcı boşaltmaya çalışıyorsa, değeri sıfır yap.
                handleNightlyRateChange(e, setPaidRate, setFormattedPaidRate);
              }}
              onBlur={() =>
                handleNightlyRateBlur(paidRate, setFormattedPaidRate)
              }
              onFocus={() =>
                handleNightlyRateFocus(paidRate, setFormattedPaidRate)
              }
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Kalan Ücret"
              variant="outlined"
              fullWidth
              type="text"
              value={leftAmount}
              disabled
            />
          </div>

          <div>
            <ReservationDatePicker
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              setCheckInDate={setCheckInDate}
              setCheckOutDate={setCheckOutDate}
              errors={errors}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {room?.is_reserved && (
            <Button onClick={handleConfirm} color="error">
              Odayı Boşalt
            </Button>
          )}
          <Button onClick={handleAddGuest}>Misafir Ekle</Button>
          <Button onClick={handleSave}>Kaydet</Button>
        </DialogActions>

        <ConfirmDialog
          title={"Odayı Boşalt"}
          open={confirmOpen}
          onClose={handleCloseDialog}
          onConfirm={handleCheckout}
        />
      </BootstrapDialog>
    </React.Fragment>
  );
}
