import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { createProperty } from "../../services/propertyService";
import { Box, Typography, Button, TextField } from "@mui/material";

const PropertyForm = ({ property }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    hostId: user._id,
    propertyName: "",
    countryOfProperty: "",
    addressLine: "",
    postcode: "",
  });
  const { propertyName, countryOfProperty, addressLine, postcode } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await createProperty(formData);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(propertyName && countryOfProperty && addressLine && postcode);
  };

  return (
    <Box>
      <Typography textAlign="center">
        Tell us more about your place!
      </Typography>
      <Typography textAlign="center">
        {message}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <TextField
            sx={{ margin: "2%", width: "50%" }}
            label="Property Listing Title"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="propertyName"
            onChange={handleChange}
            value={formData.propertyName}
            name="propertyName"
            required
          />
          <TextField
            sx={{ margin: "2%", width: "50%" }}
            label="Country"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="countryOfProperty"
            onChange={handleChange}
            value={formData.countryOfProperty}
            name="countryOfProperty"
            required
          />
          <TextField
            sx={{ margin: "2%", width: "50%" }}
            label="Address"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="addressLine"
            onChange={handleChange}
            value={formData.addressLine}
            name="addressLine"
            required
          />
          <TextField
            sx={{ margin: "2%", width: "50%" }}
            label="Postcode"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="postcode"
            onChange={handleChange}
            value={formData.postcode}
            name="postcode"
            required
          />
          <Button
            sx={{ margin: "2%", width: "10%" }}
            variant="outlined"
            type="submit"
            disabled={isFormInvalid()}
            onClick={() => navigate("/properties")}
          >
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
  
};

export default PropertyForm;
