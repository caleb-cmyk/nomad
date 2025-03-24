import { Paper, Typography, Button, Badge } from "@mui/material";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { showHostEventByStatus } from "../../services/hostEventService";

const PropertyCardLarge = ({ property }) => {
  const navigate = useNavigate();

  const status = "pending";
  const [pendingHostEventsCount, setPendingHostEventsCount] = useState();

  useEffect(() => {
    const fetchHostEvents = async () => {
      const propertyId = property._id;
      const data = await showHostEventByStatus(propertyId, status);
      setPendingHostEventsCount(data.hostEventsByPropertyIdAndStatus.length);
    };
    fetchHostEvents();
  }, [property._id]);

  return (
    <Paper sx={{ margin: "2%", padding: "20px", backgroundColor: "#fff1e3" }}>
      <Typography variant="h3" component="h3">
        {property.propertyName} in {property.countryOfProperty}
      </Typography>

      <Typography variant="h4" component="h4">
        {property.addressLine}
      </Typography>

      <Button onClick={() => navigate(`/properties/${property._id}`)} sx={{margin: "10px", backgroundColor:"white" }}>
        View
      </Button>

      <Button sx={{margin: "10px", backgroundColor:"white" }}>Edit</Button>

      <Button onClick={() => navigate(`/properties/requests/${property._id}`)} sx={{margin: "10px", backgroundColor:"white" }}>
        Requests
        </Button>
      <Badge
        sx={{ padding: "0px 0px 30px 2px" }}
        badgeContent={pendingHostEventsCount}
        color="secondary"
        ></Badge>
    </Paper>
  );
};

export default PropertyCardLarge;
