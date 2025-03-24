import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.localUser();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <Typography
        sx={{ margin: "2%", padding: "20px" }}
        variant="h3"
        component="h3"
      >
        Hello, {user.firstName}
      </Typography>
    </main>
  );
};

export default Dashboard;
