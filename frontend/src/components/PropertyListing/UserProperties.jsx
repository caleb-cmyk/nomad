import { useEffect, useState } from "react";
import PropertyCardLarge from "./PropertyCardLarge";
import { propertiesHost } from "../../services/propertyService";
import { Box, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router";

const UserProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await propertiesHost();
      setProperties(data.propertiesByHostId);
    };
    fetchProperty();
  }, []);

  return !properties ? (
    <Box sx={{ display: "flex", padding: "50px", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      {properties.map((property) => (
        <PropertyCardLarge key={property._id} property={property} />
      ))}
      <Button
        onClick={() => navigate(`/properties/new`)}
        sx={{ margin: "30px" }}
      >
        List Property
      </Button>
    </>
  );
};

export default UserProperties;
