import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createEvent } from "../services/eventService";

export const EventForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hall, setHall] = useState("");
  const [tichetPrice, setTichetPrice] = useState("");
  const [poster, setPoster] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPoster(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("hall", hall);
    formData.append("tichetPrice", tichetPrice);
    if (poster) {
      formData.append("poster", poster);
    }

    try {
      const response = await createEvent(formData);
      setMessage(response.message);
    } catch (err) {
      setMessage("There was a problem with the server");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="hall-label">Hall</InputLabel>
          <Select
            labelId="hall-label"
            value={hall}
            defaultValue="Small Hall"
            onChange={(e) => setHall(e.target.value)}
          >
            <MenuItem value="Small Hall">Small Hall</MenuItem>
            <MenuItem value="Large Hall">Large Hall</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Ticket Price"
          value={tichetPrice}
          onChange={(e) => setTichetPrice(e.target.value)}
          margin="normal"
        />
        <input id="poster" name="poster" type="file" onChange={onFileChange} />
        <Button type="submit" variant="contained" color="primary">
          Create Event
        </Button>
      </form>
      {message && <Typography>{message}</Typography>}
    </Container>
  );
};
