import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/userServices";

export const SignInForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ username, password });

      setMessage("Sign in successful");
      navigate("/");
    } catch (err) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </form>
      {message && <Typography>{message}</Typography>}
    </Container>
  );
};
