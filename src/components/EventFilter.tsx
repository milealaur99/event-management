import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { EventList } from "./EventList";
import { searchEvents } from "../services/eventService";
type Event = {
  _id: string;
  name: string;
  description: string;
  date: string;
  hall: string;
  tichetPrice: number;
  poster: string;
};

export const EventFilter: React.FC = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await searchEvents(search);
      setEvents(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <form onSubmit={onSearch}>
        <TextField
          label="Search Events"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <EventList propsEvents={events} />
    </Container>
  );
};
