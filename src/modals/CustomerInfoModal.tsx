import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { formatToTL } from "../helpers/helpers.ts";

interface Reservation {
  check_in_date: string;
  check_out_date: string;
  price_per_night: string;
  total_price: string;
  num_of_guests: number;
  room?: {
    room_number: string;
    room_type: string;
  } | null;
}

interface CustomerInfoModalProps {
  open: boolean;
  onClose: () => void;
  customer: {
    first_name: string;
    last_name: string | null;
    phone_number: string | null;
    national_id: string | null;
    createdAt: string;
    updatedAt: string;
    customerReservations: Reservation[];
  };
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomerInfoModal: React.FC<CustomerInfoModalProps> = ({
  open,
  onClose,
  customer,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Mobilde tam ekran açılması için

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Müşteri Bilgileri
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          {customer.first_name} {customer.last_name || ""}
        </Typography>
        <Typography variant="subtitle1">
          Telefon: {customer.phone_number || "Bilgi Yok"}
        </Typography>
        <Typography variant="subtitle1">
          TC Kimlik Numarası: {customer.national_id || "Bilgi Yok"}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Kayıt Tarihi: {new Date(customer.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Güncelleme Tarihi: {new Date(customer.updatedAt).toLocaleDateString()}
        </Typography>
        <hr />
        <Typography variant="h6" gutterBottom>
          Rezervasyon Geçmişi
        </Typography>
        {customer.customerReservations.length > 0 ? (
          customer.customerReservations.map((reservation, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <Typography>
                <strong>Oda:</strong>{" "}
                {reservation.room?.room_number || "Silinmiş Oda"} (
                {reservation.room?.room_type || "Bilinmiyor"})
              </Typography>
              <Typography>
                <strong>Misafir Sayısı:</strong> {reservation.num_of_guests}
              </Typography>
              <Typography>
                <strong>Giriş Tarihi:</strong> {reservation.check_in_date}
              </Typography>
              <Typography>
                <strong>Çıkış Tarihi:</strong> {reservation.check_out_date}
              </Typography>
              <Typography>
                <strong>Gecelik Fiyat:</strong> ₺{reservation.price_per_night}
              </Typography>
              <Typography>
                <strong>Toplam Fiyat: </strong>
                {formatToTL(reservation.total_price)}
              </Typography>
              <hr />
            </div>
          ))
        ) : (
          <Typography>Bu müşteri için rezervasyon kaydı bulunamadı.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Kapat
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CustomerInfoModal;
