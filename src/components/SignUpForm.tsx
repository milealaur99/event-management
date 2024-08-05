import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { signUp } from "../services/userServices";

export const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { message } = await signUp({ username, email, password });
      setMessage(message);
    } catch (err) {
      setMessage("There was a problem with the server");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </Button>
      </form>
      {message && <Typography>{message}</Typography>}
    </Container>
  );
};
