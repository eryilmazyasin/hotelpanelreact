import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

import { formatDateToTR } from "../helpers/helpers.ts";
import { IRoom } from "../interfaces/interface.ts";
import AddUpdateReservationModal from "../modals/AddUpdateReservationModal.tsx";
import AddUpdateRoomModal from "../modals/AddUpdateRoomModal.tsx";

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

  console.log({ room });

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

          <div className="edit-icon-wrapper">
            <EditIcon />
          </div>
        </div>

        {room.is_available && room.is_reserved && room.Reservation && (
          <div className="date">
            <span>{formatDateToTR(room.Reservation.check_in_date)}</span>
            <br />
            <span>{formatDateToTR(room.Reservation.check_out_date)}</span>
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
