import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout'; // Logout iconu ekleyin
import MenuIcon from '@mui/icons-material/Menu';
import NotesIcon from '@mui/icons-material/Notes';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import './AdminLayout.scss';

const drawerWidth = 240;

const AdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="drawer-wrapper">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Hotel Zeki
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={handleDrawerToggle}
        >
          <HomeIcon /> {/* MUI Icon */}
          Anasayfa
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={handleDrawerToggle}
        >
          <PersonIcon />
          Müşteriler
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={handleDrawerToggle}
        >
          <NotesIcon />
          Notlar
        </NavLink>
        <Divider />
        <NavLink
          to="/logout"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={handleDrawerToggle}
        >
          <LogoutIcon />
          Çıkış Yap
        </NavLink>
      </List>
    </div>
  );

  return (
    <Box className="container">
      <CssBaseline />
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hotel Zeki
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mobilde daha iyi performans için
        }}
        className="drawer"
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        className="drawer"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        open
      >
        {drawer}
      </Drawer>
      <main className="mainContent">
        <Toolbar />
        <Outlet /> {/* İçerik burada render edilecek */}
      </main>
    </Box>
  );
};

export default AdminLayout;
