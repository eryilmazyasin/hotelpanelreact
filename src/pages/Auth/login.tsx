import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';

import useLogin from '../../hooks/useLogin.ts';

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate: mutateLogin } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();

    mutateLogin(
      { name: username, password },
      {
        onSuccess: (data) => {
          // Backend'den dönen JWT'yi al ve localStorage'a kaydet
          localStorage.setItem("token", data.token);

          // Kullanıcıyı yönlendir
          navigate("/home");
        },
        onError: (error) => {
          console.log({ error });
          setError("Giriş bilgileri hatalı. Lütfen tekrar deneyin.");
        },
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
