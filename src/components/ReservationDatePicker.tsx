import React from "react";

import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";

import { Dayjs } from "dayjs";

interface IProps {
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  setCheckInDate: (date: Dayjs | null) => void;
  setCheckOutDate: (date: Dayjs | null) => void;
  errors: { checkInDate: boolean; checkOutDate: boolean }; // Hata yönetimi için
}

const ReservationDatePicker: React.FC<IProps> = ({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  errors,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 1 }}>
        <DatePicker
          label="Giriş Tarihi"
          value={checkInDate}
          onChange={(newDate) => setCheckInDate(newDate)}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              error: errors.checkInDate, // Hata durumu
              helperText: errors.checkInDate
                ? "Giriş tarihi boş bırakılamaz."
                : "", // Hata mesajı
            },
          }}
          format="DD/MM/YYYY"
        />

        <DatePicker
          label="Çıkış Tarihi"
          value={checkOutDate}
          onChange={(newDate) => setCheckOutDate(newDate)}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              error: errors.checkOutDate, // Hata durumu
              helperText: errors.checkOutDate
                ? "Çıkış tarihi boş bırakılamaz."
                : "", // Hata mesajı
            },
          }}
          format="DD/MM/YYYY"
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ReservationDatePicker;
