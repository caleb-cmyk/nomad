const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/properties`;

const propertyOne = async (propertyId) => {
  try {
    const res = await fetch(`${BASE_URL}/${propertyId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const propertiesHost = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const createProperty = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const propertiesByLocation = async (propertyLocation) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search?propertyLocation=${propertyLocation}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { propertyOne, propertiesHost, createProperty, propertiesByLocation };
