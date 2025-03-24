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

const PendingHostEvents = () => {
  const { propertyId } = useParams();
  const status = "pending";
  const [pendingHostEvents, setpendingHostEvents] = useState([]);

  useEffect(() => {
    const fetchHostEvents = async () => {
      const data = await showHostEventByStatus(propertyId, status);
      setpendingHostEvents(data.hostEventsByPropertyIdAndStatus);
    };
    fetchHostEvents();
  }, [propertyId]);

const handleConfirm = async (hostEventId) => {
  try {
    await updateHostEventStatus({ status: "confirmed" }, hostEventId);

  } catch (err) {
    console.error("error:", err.message);
  }
};


const handleDecline = async (hostEventId) => {
  try {
    await updateHostEventStatus({ status: "declined" }, hostEventId);

  } catch (err) {
    console.error("error:", err.message);
  }
};

  return !pendingHostEvents ? (
    <Box sx={{ display: "flex", padding: "50px", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Typography variant="h2" component="h2" sx={{ margin: "2%", padding: "20px" }}>
        New Requests
      </Typography>
      {pendingHostEvents.map((hostEvent) => (
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

          <Button sx={{margin: "10px", backgroundColor: "white"}} onClick={() => handleConfirm(hostEvent._id)}>Confirm</Button>
          <Button sx={{margin: "10px", backgroundColor: "white"}} onClick={() => handleDecline(hostEvent._id)}>Decline</Button>
        </Paper>
      ))}
    </>
  );
};

export default PendingHostEvents;
