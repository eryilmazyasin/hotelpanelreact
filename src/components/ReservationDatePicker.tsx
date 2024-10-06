import React, { useState } from "react";

import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";

import dayjs, { Dayjs } from "dayjs";

const ReservationDatePicker: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

  console.log({ checkInDate, checkOutDate });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
        <DatePicker
          label="Giriş Tarihi"
          value={checkInDate}
          onChange={(newDate) => setCheckInDate(newDate)}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
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
            },
          }}
          format="DD/MM/YYYY"
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ReservationDatePicker;
