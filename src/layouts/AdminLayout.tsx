import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout"; // Logout iconu ekleyin
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import "./AdminLayout.scss";

const drawerWidth = 240;

const AdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Hotel Zeki Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem component={Link} to="home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Ana Sayfa" />
        </ListItem>
        <ListItem component={Link} to="settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Ayarlar" />
        </ListItem>
        <ListItem component={Link} to="profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profil" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="logout">
          {" "}
          {/* Logout route'u ekleyin */}
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Çıkış Yap" />
        </ListItem>
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
            Admin Panel
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
