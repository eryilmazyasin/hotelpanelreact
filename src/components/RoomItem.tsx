import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

import dayjs from "dayjs"; // Day.js importu
import duration from "dayjs/plugin/duration"; // Day.js plugin for duration
import { formatDateToTR } from "../helpers/helpers.ts";
import { IRoom } from "../interfaces/interface.ts";
import AddUpdateReservationModal from "../modals/AddUpdateReservationModal.tsx";
import AddUpdateRoomModal from "../modals/AddUpdateRoomModal.tsx";

// Day.js plugin initialization
dayjs.extend(duration);

interface IProps {
  room: IRoom;
}

export default function RoomItem(props: IProps) {
  const { room } = props;
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [roomModalOpen, setRoomModalOpen] = useState(false);

  const handleReservationModalOpenState = (value: boolean) => {
    setReservationModalOpen(value);
  };

  const handleRoomModalOpenState = (value: boolean) => {
    setRoomModalOpen(value);
  };

  // // Check-in ve Check-out tarihleri arasındaki gün farkını hesaplama
  // const getStayDuration = () => {
  //   if (
  //     room.Reservation &&
  //     room.Reservation.check_in_date &&
  //     room.Reservation.check_out_date
  //   ) {
  //     const checkInDate = dayjs(room.Reservation.check_in_date).startOf("day"); // Günü başlangıç olarak alıyoruz
  //     const checkOutDate = dayjs(room.Reservation.check_out_date).startOf(
  //       "day"
  //     ); // Günü başlangıç olarak alıyoruz
  //     const diffInDays = checkOutDate.diff(checkInDate, "day"); // Gün farkı
  //     return diffInDays;
  //   }
  //   return null;
  // };

  // Güncel tarihe göre kalan gün sayısını hesaplama
  const getDaysUntilCheckOut = () => {
    if (room.Reservation && room.Reservation.check_out_date) {
      const checkOutDate = dayjs(room.Reservation.check_out_date).startOf(
        "day"
      );
      const currentDate = dayjs().startOf("day"); // Güncel tarih
      const daysUntilCheckOut = checkOutDate.diff(currentDate, "day"); // Kalan gün farkı

      return daysUntilCheckOut >= 0 ? daysUntilCheckOut : "Geçmiş rezervasyon";
    }
    return null;
  };

  return (
    <div>
      <div
        className="card"
        data-room-is-available={room.is_available && room.is_reserved}
      >
        <div
          className="card-title"
          onClick={() => handleRoomModalOpenState(true)}
        >
          <BedroomParentIcon />
          <span>Oda - {room.room_number}</span>
        </div>
        <div
          className="card-body"
          onClick={() =>
            room.is_available &&
            room.is_reserved &&
            handleReservationModalOpenState(true)
          }
        >
          <span>{room.room_type}</span>
          {room.is_reserved &&
            room.is_available &&
            room.Customers &&
            room.Customers.length > 0 && (
              <div className="reservation-info">
                <span className="reservation-name">
                  <CheckIcon /> {room.Customers[0].first_name}
                </span>

                {room.description && (
                  <span>
                    {room.description}
                    <br />
                  </span>
                )}

                {getDaysUntilCheckOut() !== null &&
                  getDaysUntilCheckOut() === 1 && (
                    <span>
                      {getDaysUntilCheckOut() !== null
                        ? `checkout'a ${getDaysUntilCheckOut()} gece kaldı`
                        : "Kalan gün bilgisi yok"}
                    </span>
                  )}
              </div>
            )}

          {!room.is_available && (
            <span>
              <br />
              <DoNotDisturbOnIcon />
              <br />
              Bu oda kullanım dışı.
            </span>
          )}

          <div className="edit-icon-wrapper">
            <EditIcon />
          </div>
        </div>

        {room.is_available && room.is_reserved && room.Reservation && (
          <div className="date" data-last-day={getDaysUntilCheckOut()}>
            <span>{formatDateToTR(room.Reservation.check_in_date)}</span>
            <br />
            <span>{formatDateToTR(room.Reservation.check_out_date)}</span>
            <br />
          </div>
        )}

        {!room.is_reserved && (
          <Button
            variant="contained"
            disabled={!room.is_available}
            onClick={() => handleReservationModalOpenState(true)}
          >
            Rezervasyon Yap
          </Button>
        )}
      </div>

      {reservationModalOpen && (
        <AddUpdateReservationModal
          open={reservationModalOpen}
          room={room}
          onReservationModalOpenState={handleReservationModalOpenState}
        />
      )}
      {roomModalOpen && (
        <AddUpdateRoomModal
          open={roomModalOpen}
          onRoomModalOpenState={handleRoomModalOpenState}
          room={room}
        />
      )}
    </div>
  );
}
