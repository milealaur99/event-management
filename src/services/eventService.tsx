export const getEvents = async () => {
  const response = await fetch("http://localhost:5000/api/events");
  const data = await response.json();
  console.log(data, "response");
  return data;
};

export const createEvent = async (eventData: FormData) => {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const options: RequestInit = {
    method: "POST",
    headers,
    body: eventData,
  };

  const response = await fetch(
    "http://localhost:5000/api/events/create",
    options
  );
  const data = await response.json();
  return data;
};

export const searchEvents = async (search: string) => {
  const response = await fetch(
    `http://localhost:5000/api/events?search=${search}`
  );
  const data = await response.json();
  return data;
};
