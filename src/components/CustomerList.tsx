import React, { useMemo, useState } from "react";

import debounce from "lodash/debounce";

import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import useCustomers from "../hooks/useCustomers.ts";
import CustomerInfoModal from "../modals/CustomerInfoModal.tsx";

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { data: customersData, isLoading } = useCustomers(searchTerm, page);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPage(1);
    debouncedSearch(value);
  };

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 500),
    []
  );

  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setModalOpen(false);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Müşteri Arama"
        variant="outlined"
        onChange={handleSearchChange}
        placeholder="İsim, telefon numarası veya kimlik numarası ile arayın"
        style={{ marginBottom: "20px" }}
      />

      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <List>
            {customersData?.data?.length > 0 &&
              customersData.data.map((customer) => (
                <ListItem
                  key={customer.id}
                  alignItems="flex-start"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                    },
                    padding: "10px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => handleOpenModal(customer)}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        component="span"
                      >
                        {customer.first_name} {customer.last_name || ""}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="span"
                        >
                          Telefon: {customer.phone_number || "Mevcut değil"}
                        </Typography>
                      </>
                    }
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(customer);
                    }}
                    sx={{
                      marginLeft: "10px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Detay
                  </Button>
                </ListItem>
              ))}
          </List>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Önceki
            </Button>
            <Typography variant="body2">
              Sayfa {page} / {customersData?.totalPages || 1}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextPage}
              disabled={page === customersData?.totalPages}
            >
              Sonraki
            </Button>
          </div>
        </>
      )}

      {selectedCustomer && (
        <CustomerInfoModal
          open={isModalOpen}
          onClose={handleCloseModal}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};

export default CustomerList;
