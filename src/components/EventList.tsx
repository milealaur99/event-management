import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Pagination,
  CardMedia,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";

const StyledContainer = styled(Container)`
  background-color: #f0f8ff;
  color: #000;
  min-height: 100vh;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  max-width: 345px;
  background-color: #e3f2fd;
  color: #000;
  margin: 16px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledMedia = styled(CardMedia)`
  height: 300px;
`;

const StyledButton = styled(Button)`
  background-color: #1e88e5;
  &:hover {
    background-color: #1565c0;
  }
  margin-top: 10px;
`;

const ApplyButton = styled(Button)`
  background-color: #1e88e5;
  &:hover {
    background-color: #1565c0;
  }
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 20px;
  .MuiPaginationItem-root {
    color: #1e88e5;
  }
`;

const TruncatedTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type Event = {
  _id: string;
  name: string;
  description: string;
  date: string;
  hall: string;
  tichetPrice: number;
  poster: string;
};

export const EventList = ({ propsEvents }: { propsEvents: Event[] }) => {
  const [filterDate, setFilterDate] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterHall, setFilterHall] = useState("");
  const [filterSeatsPercentage, setFilterSeatsPercentage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useQuery(
    [
      "events",
      currentPage,
      filterDate,
      filterPrice,
      filterHall,
      filterSeatsPercentage,
    ],
    async () => {
      const response = await axios.get("http://localhost:5000/api/events", {
        params: {
          page: currentPage,
          date: filterDate,
          price: filterPrice,
          hall: filterHall,
          seatsPercentage: filterSeatsPercentage,
        },
      });
      return response.data;
    }
  );
  const { events } = data ?? {};

  useEffect(() => {
    if (propsEvents?.length) {
      // Perform any additional logic here
    }
  }, [propsEvents]);

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    updateURL({ page });
  };

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, filterKey: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
    };

  const applyFilters = () => {
    updateURL({
      date: filterDate,
      price: filterPrice,
      hall: filterHall,
      seatsPercentage: filterSeatsPercentage,
      page: 1, // Reset to first page on filter apply
    });
  };

  const updateURL = (params: { [key: string]: any }) => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        searchParams.set(key, params[key]);
      } else {
        searchParams.delete(key);
      }
    });
    navigate({ search: searchParams.toString() });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !events?.length) {
    return <div>Error fetching events</div>;
  }

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      <StyledTextField
        label="Filter by Date"
        type="date"
        value={filterDate}
        onChange={handleFilterChange(setFilterDate, "date")}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <StyledTextField
        label="Filter by Price"
        type="number"
        value={filterPrice}
        onChange={handleFilterChange(setFilterPrice, "price")}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="hall-label">Filter by Hall</InputLabel>
        <Select
          labelId="hall-label"
          value={filterHall}
          onChange={(event) => setFilterHall(event.target.value as string)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Main Hall">Main Hall</MenuItem>
          <MenuItem value="Secondary Hall">Secondary Hall</MenuItem>
        </Select>
      </FormControl>
      <StyledTextField
        label="Filter by Seats Percentage"
        type="number"
        value={filterSeatsPercentage}
        onChange={handleFilterChange(
          setFilterSeatsPercentage,
          "seatsPercentage"
        )}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <ApplyButton onClick={applyFilters} variant="contained" color="primary">
        Apply Filters
      </ApplyButton>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {events.map((event: Event) => (
          <StyledCard key={event._id}>
            <StyledMedia image={`http://localhost:5000/${event.poster}`} />
            <CardContent>
              <TruncatedTypography gutterBottom variant="h5">
                {event.name}
              </TruncatedTypography>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.hall}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.tichetPrice} RON
              </Typography>
              <StyledButton
                variant="contained"
                fullWidth
                onClick={() => {
                  window.location.href = `/event/${event._id}`;
                }}
              >
                View Event
              </StyledButton>
            </CardContent>
          </StyledCard>
        ))}
      </Box>
      <StyledPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </StyledContainer>
  );
};
