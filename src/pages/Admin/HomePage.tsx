import React, { useState } from "react";

import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import "./Homepage.scss";

import FabAdd from "../../components/FabAdd.tsx";
import RoomItem from "../../components/RoomItem.tsx";
import useRooms from "../../hooks/useRooms.ts";
import AddUpdateRoomModal from "../../modals/AddUpdateRoomModal.tsx";

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

  const renderEmptyList = () => {
    if (!rooms?.length && !isLoading) {
      return (
        <div className="homepage-empty-list">
          <BedroomParentIcon className="bedroom-icon" />
          <span className="text">Henüz oda yok</span>
          <Button onClick={handleAddClick} variant="outlined">
            Oda Ekle
          </Button>
          <FabAdd onClick={handleAddClick} />
        </div>
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="homepage-wrapper">
      <FabAdd onClick={handleAddClick} />

      <div>
        <div>
          <b>Toplam Oda: </b> {rooms?.length}
        </div>
        <div>
          <b>Dolu Oda: </b> {rooms?.filter((room) => room.is_reserved).length}
        </div>
        <div>
          <b>Boş Oda: </b> {rooms?.filter((room) => !room.is_reserved).length}
        </div>
        <br />
        <hr />
      </div>

      {renderEmptyList()}

      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 3, lg: 2 }}>
              <RoomItem room={room} />
            </Grid>
          ))}
      </Grid>

      {roomModalOpen && (
        <AddUpdateRoomModal
          open={roomModalOpen}
          onRoomModalOpenState={handleRoomModalOpenState}
        />
      )}
    </Box>
  );
}
