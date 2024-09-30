import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

import { formatDateToTR } from "../helpers/helpers.ts";
import { IRoom } from "../interfaces/interface.ts";
import ReservationModal from "../modals/ReservationModal.tsx";

interface IProps {
  room: IRoom;
}

export default function RoomItem(props: IProps) {
  const { room } = props;
  const [reservationModalOpen, setReservationModalOpen] = useState(false);

  const handleReservationModalOpenState = (value: boolean) => {
    setReservationModalOpen(value);
  };

  return (
    <div>
      <div
        className="card"
        data-room-is-available={room.is_available}
        onClick={() =>
          !room.is_available && handleReservationModalOpenState(true)
        }
      >
        <div className="card-title">
          <BedroomParentIcon />
          <span>Oda - {room.room_number}</span>
        </div>
        <div className="card-body">
          <span>{room.room_type}</span>
          {/* //rezarvasyon yapılmış ise bu blok aktif olacak */}
          {room.isReserved && room.is_available && room.Customer && (
            <div className="reservation-info">
              <span className="reservation-name">
                <CheckIcon /> {room.Customer.first_name}
              </span>

              {room.description && <span>{room.description}</span>}
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
        </div>

        {room.is_available && room.isReserved && room.Reservation && (
          //buralar veritabanından çekilecek
          <div className="date">
            <span>{formatDateToTR(room.Reservation.check_in_date)}</span>
            <br />
            <span>{formatDateToTR(room.Reservation.check_out_date)}</span>
          </div>
        )}

        {room.is_available && !room.isReserved && (
          <Button
            variant="contained"
            onClick={() => handleReservationModalOpenState(true)}
          >
            Rezervasyon Yap
          </Button>
        )}

        <div className="edit-icon-wrapper">
          <EditIcon />
        </div>
      </div>

      <ReservationModal
        open={reservationModalOpen}
        room={room}
        onReservationModalOpenState={handleReservationModalOpenState}
      />
    </div>
  );
}
