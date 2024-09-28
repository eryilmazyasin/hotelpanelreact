import React, { useState } from "react";

import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import "./Homepage.scss";

import FabAdd from "../../components/FabAdd.tsx";
import useRooms from "../../hooks/useRooms.ts";
import AddRoomModal from "../../modals/AddRoomModal.tsx";

export default function HomePage() {
  const [roomModalOpen, setRoomModalOpen] = useState(false);

  const { data: rooms, isLoading } = useRooms();

  const handleAddClick = () => {
    setRoomModalOpen(true);
  };

  const handleRoomModalOpenState = (value: boolean) => {
    setRoomModalOpen(value);
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "100px" }}>
        <CircularProgress />
      </Box>
    );

  if (!rooms && !isLoading) return "Oda yok";

  return (
    <Box sx={{ flexGrow: 1 }} className="homepage-wrapper">
      <FabAdd onClick={handleAddClick} />

      <div>
        <div>
          <b>Toplam Oda: </b> {rooms?.length}
        </div>
        <div>
          <b>Dolu Oda: </b> {rooms?.filter((room) => !room.is_available).length}
        </div>
        <div>
          <b>Boş Oda: </b> {rooms?.filter((room) => room.is_available).length}
        </div>
        <br />
        <hr />
      </div>

      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {rooms?.length &&
          rooms.map((room, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 3, lg: 2 }}>
              <div className="card">
                <div className="card-title">
                  <BedroomParentIcon />
                  <span>Oda - {room.room_number}</span>
                </div>
                <div className="card-body">
                  <span>{room.room_type}</span>
                  {/* //rezarvasyon yapılmış ise bu blok aktif olacak */}
                  {!room.is_available && (
                    <div className="reservation-info">
                      <span className="reservation-name">
                        <CheckIcon /> Yasin Eryılmaz
                      </span>

                      {room.description && (
                        <span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </span>
                      )}

                      {/* <span>
                        <br />
                        <DoNotDisturbOnIcon />
                        <br />
                        Bu oda kullanım dışı.
                      </span> */}
                    </div>
                  )}
                </div>

                {!room.is_available && (
                  <div className="date">
                    <span>15.09.2021</span>
                    <br />
                    <span>20.09.2021</span>
                  </div>
                )}

                {room.is_available && (
                  <Button variant="contained">Rezervasyon Yap</Button>
                )}
              </div>
            </Grid>
          ))}
      </Grid>

      <AddRoomModal
        open={roomModalOpen}
        onRoomModalOpenState={handleRoomModalOpenState}
      />
    </Box>
  );
}
