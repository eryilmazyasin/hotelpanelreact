// pages/Unauth/UnauthPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UnauthPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Erişim Engellendi
      </Typography>
      <Typography variant="body1" gutterBottom>
        Bu sayfaya erişim izniniz bulunmamaktadır.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Ana Sayfaya Dön
      </Button>
    </Box>
  );
};

export default UnauthPage;
