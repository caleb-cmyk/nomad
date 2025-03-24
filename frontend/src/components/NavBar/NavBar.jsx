import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { signIn } from "../../services/authService";
import "../../App.css";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  TextField,
  Divider,
} from "@mui/material";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSignIn = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      handleCloseUserMenu();
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleOpenUserMenu = (evt) => {
    setAnchorElUser(evt.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAccount = () => {
    setAnchorElUser(null);
    navigate(`/users/${user._id}`);
  };

  const handleYourTrips = () => {
    setAnchorElUser(null);
    navigate(`/trips/${user._id}`);
  };

  const handleYourProperties = () => {
    setAnchorElUser(null);
    navigate("/properties");
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleIcon = () => {
    setAnchorElUser(null);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LandscapeOutlinedIcon
            onClick={handleIcon}
            sx={{
              display: { xs: 1, md: "flex" },
              mr: 1,
              pr: 0.5,
              cursor: "pointer",
            }}
            fontSize="large"
          />
          <Typography
            variant="h6"
            onClick={handleIcon}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "quicksand",
              fontWeight: 700,
              letterSpacing: ".4rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            nomad.
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 1, md: "flex" } }}></Box>

          {/* code for smaller screens display start */}

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "quicksand",
              fontWeight: 700,
              letterSpacing: ".4rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            nomad.
          </Typography>

          {/* code for smaller screens display end */}

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src="https://i.pinimg.com/736x/79/38/19/793819af1d6945d2fa9ed3e83212765c.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user
                ? [
                    <Box key="box">
                      <Typography sx={{ textAlign: "left", padding: "10px" }}>
                        Hello, {user.firstName} {user.lastName}
                      </Typography>
                      <Divider />
                      <MenuItem onClick={handleAccount}>
                        <Typography sx={{ textAlign: "left" }}>
                          Account
                        </Typography>
                      </MenuItem>

                      <MenuItem onClick={handleYourTrips}>
                        <Typography sx={{ textAlign: "left" }}>
                          Your Trips
                        </Typography>
                      </MenuItem>

                      {user.userType === "Host" && (
                        <MenuItem onClick={handleYourProperties}>
                          <Typography sx={{ textAlign: "left" }}>
                            Your Properties
                          </Typography>
                        </MenuItem>
                      )}

                      <MenuItem onClick={handleLogout}>
                        <Typography sx={{ textAlign: "left" }}>
                          Logout
                        </Typography>
                      </MenuItem>
                    </Box>,
                  ]
                : [
                    <Box key="box">
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "10px",
                        }}
                      >
                        {message}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "350px",
                          padding: "15px",
                        }}
                      >
                        <form autoComplete="off" onSubmit={handleSignIn}>
                          <div>
                            <TextField
                              sx={{ padding: "0px 0px 20px 0px" }}
                              label="Email Address"
                              variant="outlined"
                              fullWidth
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
                              fullWidth
                              type="password"
                              autoComplete="off"
                              id="password"
                              value={formData.password}
                              name="password"
                              onChange={handleChange}
                              required
                            />
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                width: "350px",
                              }}
                            >
                              <Button variant="outlined" type="submit">
                                Login
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() => navigate("/sign-up")}
                              >
                                Sign Up
                              </Button>
                            </Box>
                          </div>
                        </form>
                      </Box>
                    </Box>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
