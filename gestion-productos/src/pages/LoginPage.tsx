import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
  Paper,
  ThemeProvider,
  createTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0", // Lila fuerte
    },
    secondary: {
      main: "#ce93d8", // Lila pastel
    },
  },
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      if (isRegistering) {
        await register(email, password);
        setSuccess("✅ ¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        setIsRegistering(false);
      } else {
        await login(email, password);
        navigate("/productos");
      }
    } catch (err: any) {
      const code = err?.code || "";
      switch (code) {
        case "auth/invalid-email":
          setError("El correo electrónico no es válido.");
          break;
        case "auth/user-not-found":
          setError("No existe una cuenta con ese correo.");
          break;
        case "auth/wrong-password":
          setError("La contraseña es incorrecta.");
          break;
        case "auth/email-already-in-use":
          setError("Este correo ya está registrado.");
          break;
        case "auth/missing-password":
          setError("Debes ingresar una contraseña.");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        default:
          console.error("Error desconocido:", err);
          setError("Ocurrió un error inesperado. Intenta nuevamente.");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url("/assets/fondo-login.png")`, // 🔁 reemplaza con la ruta real a tu imagen
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: "90%", bgcolor: "rgba(255, 255, 255, 0.85)" }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color="primary"
            fontWeight="bold"
          >
            {isRegistering ? "Crear cuenta" : "Iniciar sesión"}
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Correo electrónico"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="primary"
            />

            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="primary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Button variant="contained" onClick={handleSubmit} fullWidth>
              {isRegistering ? "Registrarme" : "Ingresar"}
            </Button>

            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                setIsRegistering((prev) => !prev);
                setError("");
                setSuccess("");
              }}
            >
              {isRegistering
                ? "¿Ya tienes una cuenta? Inicia sesión"
                : "¿No tienes cuenta? Regístrate aquí"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
