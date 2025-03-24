import { useEffect, useState } from "react";
import { hostEventSendRequest } from "../../services/hostEventService";
import { Box, Typography, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { showHostEventByStatus } from "../../services/hostEventService";

const BookingForm = ({ property }) => {
  dayjs.extend(isSameOrBefore);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    hostId: property.propertyById.hostId._id,
    propertyId: property.propertyById._id,
    dateStart: "",
    dateEnd: "",
  });
  const { dateStart, dateEnd } = formData;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const dateStartSubmitted = formData.dateStart;
    const dateEndSubmitted = formData.dateEnd;
    if (dayjs(dateEndSubmitted).isSameOrBefore(dateStartSubmitted)) {
      setMessage("Please select an end date after your start date");
      return;
    }

    try {
      await hostEventSendRequest(formData);
      setMessage("Request Sent!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(dateStart && dateEnd);
  };

  const handleDateStartChange = (date) => {
    setFormData({ ...formData, dateStart: date.format("YYYY-MM-DD") });
  };
  const handleDateEndChange = (date) => {
    setFormData({ ...formData, dateEnd: date.format("YYYY-MM-DD") });
  };

  // https://stackoverflow.com/questions/71153388/how-to-disable-list-of-dates-in-mui-date-picker
  // https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates

  const propertyId = property.propertyById._id;
  const status = "confirmed";
  const [blackoutDates, setBlackoutDates] = useState();
  
  useEffect(() => {
    const fetchHostEvents = async () => {
      try {
        const data = await showHostEventByStatus(propertyId, status);
        const blackoutDatesArray = [];

        for (let i = 0; i < data.hostEventsByPropertyIdAndStatus.length; i++) {
          let startDate = dayjs(data.hostEventsByPropertyIdAndStatus[i].dateStart);
          const endDate = dayjs(data.hostEventsByPropertyIdAndStatus[i].dateEnd);

          while (startDate.isSameOrBefore(endDate)) {
            blackoutDatesArray.push(startDate.format("YYYY-MM-DD"));
            startDate = startDate.add(1, "day");
          }
        }

        setBlackoutDates(blackoutDatesArray);
      } catch (err) {
        console.error("error:", err.message);
      }
    };

    fetchHostEvents();
  }, [propertyId]);

  const unavailableDates = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    return blackoutDates.includes(formattedDate);
  };

  return (
    <Box>
      <Typography>{message}</Typography>
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography>Select Start Date</Typography>
          <DatePicker
            onChange={(date) => handleDateStartChange(date)}
            showDaysOutsideCurrentMonth
            disablePast
            shouldDisableDate={unavailableDates}
          />
          <Typography>Select End Date</Typography>
          <DatePicker
            onChange={(date) => handleDateEndChange(date)}
            showDaysOutsideCurrentMonth
            disablePast
            shouldDisableDate={unavailableDates}
          />
        </LocalizationProvider>
        <Button variant="outlined" type="submit" disabled={isFormInvalid()}>
          Request
        </Button>
      </form>
    </Box>
  );
};

export default BookingForm;

// https://mui.com/x/react-date-pickers/validation/
// https://stackoverflow.com/questions/62243151/dayjs-to-js-date-for-mongo
// https://day.js.org/docs/en/display/format
