import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { propertyOne } from "../../services/propertyService";
import BookingForm from "../BookingForm/BookingForm";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

const PropertyListing = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState();

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await propertyOne(propertyId);
      setProperty(data);
    };
    fetchProperty();
  }, [propertyId]);

  return (
    <>
      {!property ? (
        <Box
          sx={{ display: "flex", padding: "50px", justifyContent: "center" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="h2" component="h2">
            {property.propertyById?.propertyName}
          </Typography>
          <Typography variant="h4" component="h4">
            {`${property.propertyById?.hostId.firstName} ${property.propertyById?.hostId.lastName}'s Place`}
          </Typography>
          <Typography variant="h4" component="h4">
            {property.propertyById?.countryOfProperty}
          </Typography>
          <Typography variant="h4" component="h4">
            {`${property.propertyById?.addressLine} ${property.propertyById?.postcode}`}
          </Typography>
        <BookingForm property={property} />
        </Box>
      )}
    </>
  );
};

export default PropertyListing;
