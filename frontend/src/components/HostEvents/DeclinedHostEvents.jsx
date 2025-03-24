import { useEffect, useState } from "react";
import { showHostEventByStatus } from "../../services/hostEventService";
import { useParams } from "react-router";
import moment from "moment";
import {
  Typography,
  Paper,
  CircularProgress,
  Box,
  Link,
} from "@mui/material";

const DeclinedHostEvents = () => {
  const { propertyId } = useParams();
  const status = "declined";
  const [declinedHostEvents, setdeclinedHostEvents] = useState([]);

  useEffect(() => {
    const fetchHostEvents = async () => {
      const data = await showHostEventByStatus(propertyId, status);
      setdeclinedHostEvents(data.hostEventsByPropertyIdAndStatus);
    };
    fetchHostEvents();
  }, [propertyId]);

  return !declinedHostEvents ? (
    <Box sx={{ display: "flex", padding: "50px", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Typography variant="h2" component="h2" sx={{ margin: "2%", padding: "20px" }}>
        Declined Guests
      </Typography>
      {declinedHostEvents.map((hostEvent) => (
        <Paper key={hostEvent._id} sx={{ margin: "2%", padding: "20px", backgroundColor: "#fff1e3" }}>
          <Typography variant="h3" component="h3">
            <Link sx={{color:"lightgrey"}} underline="none" href={`/users/${hostEvent.guestId._id}`}>
            {hostEvent.guestId.firstName} {hostEvent.guestId.lastName} {}
            </Link>
            from {hostEvent.guestId.countryOfResidence}
          </Typography>

          <Typography variant="h4" component="h4">
            {hostEvent.status}
          </Typography>

          <Typography variant="h4" component="h4">
          {moment(hostEvent.dateStart).format("dddd, Do MMM YYYY")} - {moment(hostEvent.dateEnd).format("dddd, Do MMM YYYY")}
          </Typography>

        </Paper>
      ))}
    </>
  );
};

export default DeclinedHostEvents;
