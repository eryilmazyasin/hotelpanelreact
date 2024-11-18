// pages/Admin/SettingsPage.js
import React from "react";

import CustomerList from "../../components/CustomerList.tsx";

const SettingsPage = () => {
  return (
    <div>
      <h1>Müşteriler</h1>
      <CustomerList />
    </div>
  );
};

export default SettingsPage;
