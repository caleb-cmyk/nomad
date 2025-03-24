import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import { Box, Switch, Typography, Button, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: "",
    phoneCountry: "",
    phoneNumber: "",
    dateOfBirth: "",
    countryOfResidence: "",
    gender: "",
    userType: "Guest",
  });

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConf,
    phoneCountry,
    phoneNumber,
    dateOfBirth,
    countryOfResidence,
    gender,
    userType,
  } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSwitchChange = (evt) => {
    setFormData({ ...formData, userType: evt.target.checked ? "Host Pending" : "Guest" });
  };

  const handleSignUp = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      firstName &&
      lastName &&
      email &&
      password &&
      password === passwordConf &&
      phoneCountry &&
      phoneNumber &&
      dateOfBirth &&
      countryOfResidence &&
      gender
    );
  };

  return (
    <main>
      <Typography
        sx={{ textAlign: "center", padding: "30px" }}
        variant="h3"
        component="h3"
      >
        Hi there, tell us more about yourself!
      </Typography>
      <Typography
        sx={{ textAlign: "center", padding: "10px" }}
        variant="h4"
        component="h4"
      >
        {message}
      </Typography>
      <form autoComplete="off" onSubmit={handleSignUp}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="First Name"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="firstName"
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Last Name"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="lastName"
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Email Address"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Confirm Password"
            variant="outlined"
            type="password"
            autoComplete="off"
            id="password"
            value={formData.passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Country Code"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="phoneCountry"
            value={formData.phoneCountry}
            name="phoneCountry"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Phone Number"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="phoneNumber"
            value={formData.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Date of Birth"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            name="dateOfBirth"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Country of Residence"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="countryOfResidence"
            value={formData.countryOfResidence}
            name="countryOfResidence"
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ padding: "0px 0px 20px 0px" }}
            label="Gender"
            variant="outlined"
            type="text"
            autoComplete="off"
            id="gender"
            value={formData.gender}
            name="gender"
            onChange={handleChange}
            required
          />

          <FormControlLabel
            control={<Switch checked={userType === "Host Pending"} onChange={handleSwitchChange} />}
            label="Do you have a place to host?"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "350px",
            }}
          >

            <Button variant="outlined" type="submit" disabled={isFormInvalid()} sx={{margin: "20px"}}>
              Sign Up
            </Button>

          </Box>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
