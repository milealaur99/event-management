import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";

interface Event {
  name: string;
  description: string;
  date: Date;
  tichetPrice: number;
  hall: any;
  seats: any;
  poster?: string;
}

const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  const { data, isLoading, isError } = useQuery<Event>(
    ["event", eventId],
    async () => {
      const response = await axios.get(`/api/event/${eventId}`);
      return response.data;
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data, 'aici s a modificat');
      setEvent(data);
    }
  }, [data]);

  if (isLoading) {
    return <Typography>Loading event...</Typography>;
  }

  if (isError) {
    return <Typography>Error fetching event</Typography>;
  }

  if (!event) {
    return <Typography>Loading event...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">{event.name}</Typography>
      <Typography variant="body1">
        Date: {event.date?.toLocaleString()}
      </Typography>
      <Typography variant="body1">Description: {event.description}</Typography>
      <Typography variant="body1">Ticket Price: {event.tichetPrice}</Typography>
      <Typography variant="body1">Hall: {event.hall}</Typography>
      {event.seats && (
        <Typography variant="body1">
          Seats: {event.seats.map((seat: any) => seat?.name).join(", ")}
        </Typography>
      )}
      {event.poster && <img src={event.poster} alt="Event Poster" />}
    </div>
  );
};

export default EventPage;
