import { Typography, CircularProgress, Box } from "@mui/material";
import ConfirmedHostEvents from "./ConfirmedHostEvents";
import PendingHostEvents from "./PendingHostEvents";
import PastHostEvents from "./PastHostEvents";
import RejectedHostEvents from "./DeclinedHostEvents";
import CancelledHostEvents from "./CancelledHostEvents";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { propertyOne } from "../../services/propertyService";

const HostEventsByProperty = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState();

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await propertyOne(propertyId);
      setProperty(data);
    };
    fetchProperty();
  }, [propertyId]);

  return !property ?(
    <Box sx={{ display: "flex", padding: "50px", justifyContent: "center" }}>
    <CircularProgress />
  </Box>
    ) : (
    <>
      <Typography
        variant="h2"
        component="h2"
        sx={{ margin: "2%", padding: "20px" }}
      >
        {property.propertyById.propertyName} in {property.propertyById.countryOfProperty}
      </Typography>
      <PendingHostEvents />
      <ConfirmedHostEvents />
      <RejectedHostEvents />
      <CancelledHostEvents />
      <PastHostEvents />
    </>
  );
};

export default HostEventsByProperty;
