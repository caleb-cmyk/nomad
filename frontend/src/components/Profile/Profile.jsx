import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { userById } from "../../services/userService";
import { Typography, Box, CircularProgress, Avatar, Button } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { deleteUserById } from "../../services/userService";
import moment from "moment";

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState();
  const authorisedUser  = useContext(UserContext).user._id;

  useEffect(() => {
    const fetchUser = async () => {
      const data = await userById(userId);
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  // https://momentjs.com/

  const formatDate = (date) => {
    const formattedDate = moment(date).fromNow();
    return formattedDate;
  };

  const handleDelete = async ( authorisedUser ) => {
    try {
    await deleteUserById(authorisedUser);
    localStorage.removeItem("token");
    navigate("/");
  } catch (err) {
    console.error("error:", err.message);
  }
};

  return (
    <>
      {!user ? (
        <Box sx={{ display: "flex", padding: "50px", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              padding: "20px",
            }}
          >
            <Avatar
              src={`${user.user.profilePhoto}`}
              sx={{ width: 200, height: 200, justifyContent: "center" }}
            />
          </Box>

          <Typography variant="h2" component="h2" sx={{ textAlign: "center" }}>
            {`${user.user.firstName} ${user.user.lastName}`}
          </Typography>

          <Typography variant="h4" component="h4" sx={{ textAlign: "center" }}>
            {`From ${user.user.countryOfResidence}`}
          </Typography>

          <Typography variant="h4" component="h4" sx={{ textAlign: "center" }}>
            {`Joined us ${formatDate(user.user.createdAt)}`}
          </Typography>

          <Typography variant="h4" component="h4" sx={{ textAlign: "center" }}>
            {`${user.user.gender}, birthed ${formatDate(user.user.dateOfBirth)}`}
          </Typography>

          {authorisedUser === userId && (
            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
              <Button sx={{margin: "10px"}}>
                Edit Profile
              </Button>
              <Button onClick={() => handleDelete(authorisedUser)} sx={{margin: "10px"}}>
                Delete Account
              </Button>
            </Box>)}
        </>
      )}
    </>
  );
};

export default Profile;
