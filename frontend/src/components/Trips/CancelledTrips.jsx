import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { showHostEventByGuestIdAndStatus } from "../../services/hostEventService";
import moment from "moment";
import {
  Typography,
  Paper,
  CircularProgress,
  Box,
  Link,
} from "@mui/material";

const CancelledTrips = () => {
  const status = "cancelled";
  const { userId } = useParams();
  const [cancelledHostEvents, setCancelledHostEvents] = useState();

  useEffect(() => {
    const fetchHostEvents = async () => {
      const data = await showHostEventByGuestIdAndStatus(userId, status);
      setCancelledHostEvents(data.hostEventsByGuestIdAndStatus);
    };
    fetchHostEvents();
  }, [userId]);

    return  !cancelledHostEvents ? (
      <Box sx={{ display: "flex", padding: "50px", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    ) : (
      <>
      <Typography variant="h2" component="h2" sx={{ margin: "2%", padding: "20px" }}>
        Cancelled Trips
      </Typography>
      {cancelledHostEvents.map((hostEvent) => (
        <Paper key={hostEvent._id} sx={{ margin: "2%", padding: "20px", backgroundColor: "#fff1e3" }}>
          <Typography variant="h3" component="h3">
          {hostEvent.propertyId.propertyName} in {hostEvent.propertyId.countryOfProperty}
          </Typography>
          
          <Typography variant="h4" component="h4">
          Your Host, 
          <Link sx={{color:"lightgrey"}} underline="none" href={`/users/${hostEvent.hostId._id}`}>
          {} {hostEvent.hostId.firstName} {hostEvent.hostId.lastName}
          </Link>
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

export default CancelledTrips;
