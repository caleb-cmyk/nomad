const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hostEvents`;

const showHostEventByStatus = async (propertyId, status) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorised.");
  }

  try {
    const res = await fetch(`${BASE_URL}/property/${propertyId}?status=${status}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const showHostEventByGuestIdAndStatus = async (guestId, status) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorised.");
  }

  try {
    const res = await fetch(`${BASE_URL}/trips/${guestId}?status=${status}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateHostEventStatus = async (hostEventStatus, hostEventId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorised.");
  }

  try {
    const res = await fetch(`${BASE_URL}/${hostEventId}/edit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hostEventStatus),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const hostEventSendRequest = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorised.");
  }

  try {
    const res = await fetch(`${BASE_URL}/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const hostEventEditStatus = async (formData, hostEventId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorised.");
  }

  try {
    const res = await fetch(`${BASE_URL}/${hostEventId}/edit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const showHostEventByPropertyLocation = async (location) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorised.");
  }

  try {
    const res = await fetch(`${BASE_URL}/properties/?location=${location}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  hostEventSendRequest,
  hostEventEditStatus,
  showHostEventByStatus,
  updateHostEventStatus,
  showHostEventByGuestIdAndStatus,
  showHostEventByPropertyLocation,
};
