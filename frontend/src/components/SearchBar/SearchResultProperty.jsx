import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const SearchResultProperty = ({ property }) => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ margin: "2%", padding: "20px" }}>
      <Typography variant="h3" component="h3">
        {property.propertyName} in {property.countryOfProperty}
      </Typography>

      <Typography variant="h4" component="h4">
        {property.addressLine}
      </Typography>

      <Button onClick={() => navigate(`/properties/${property._id}`)}>
        View
      </Button>

    </Paper>
  );
};

export default SearchResultProperty;
