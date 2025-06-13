import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { login, register } from "../../services/auth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      isLogin ? await login(email, password) : await register(email, password);
    } catch {
      alert("Error al autenticar.");
    }
  };

  return (
    <Box sx={{ maxWidth: 320, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Correo" margin="normal" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField fullWidth label="Contraseña" margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          {isLogin ? "Entrar" : "Crear cuenta"}
        </Button>
      </form>
      <Button fullWidth size="small" sx={{ mt: 1 }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
      </Button>
    </Box>
  );
};

export default AuthForm;
