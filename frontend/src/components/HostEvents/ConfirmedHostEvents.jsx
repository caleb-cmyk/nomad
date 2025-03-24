import { useEffect, useState } from "react";
import { showHostEventByStatus } from "../../services/hostEventService";
import { useParams } from "react-router";
import { updateHostEventStatus } from "../../services/hostEventService";
import moment from "moment";
import {
  Typography,
  Paper,
  CircularProgress,
  Box,
  Button,
  Link,
} from "@mui/material";

const ConfirmedHostEvents = () => {
  const { propertyId } = useParams();
  const status = "confirmed";
  const [confirmedHostEvents, setConfirmedHostEvents] = useState([]);

  useEffect(() => {
    const fetchHostEvents = async () => {
      const data = await showHostEventByStatus(propertyId, status);
      setConfirmedHostEvents(data.hostEventsByPropertyIdAndStatus);
    };
    fetchHostEvents();
  }, [propertyId]);

  const handleCancel = async (hostEventId) => {
    try {
      await updateHostEventStatus({ status: "cancelled" }, hostEventId);
  
    } catch (err) {
      console.error("error:", err.message);
    }
  };

  return !confirmedHostEvents ? (
    <>
    <Box sx={{ display: "flex", padding: "50px", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
        </>
  ) : (
    <>
      <Typography sx={{ margin: "2%", padding: "20px" }} variant="h2" component="h2">
        Current Guests
      </Typography>
      {confirmedHostEvents.map((hostEvent) => (
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

          <Button sx={{margin: "10px", backgroundColor: "white"}} onClick={() => handleCancel(hostEvent._id)}>Cancel</Button>
        </Paper>
      ))}
    </>
  );
};

export default ConfirmedHostEvents;
