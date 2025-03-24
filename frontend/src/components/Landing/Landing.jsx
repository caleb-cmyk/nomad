import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <main
    style={{
      backgroundImage: "url('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fcms-image-bucket-production-ap-northeast-1-a7d2.s3.ap-northeast-1.amazonaws.com%2Fimages%2F1%2F9%2F4%2F8%2F49008491-1-eng-GB%2FDove+Lake%2C+the+deepest+freshwater+lake+in+Australia%2C+at+Cradle+Mountain-Lake+St+Clair+National+Park%2C+credit+Jason+Charles+Hill.jpg?source=nar-cms'), url('https://www.newegg.com/insider/wp-content/uploads/windows_xp_bliss-wide.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      padding: "300px 0px 0px 0px",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
      <Typography
        sx={{ margin: "1.5%", textAlign: "center", color: "white" }} variant="h4" component="h4"
        >
        come as you, live as us.
      </Typography>
      <p>
      <Button onClick={() => navigate("/sign-up")}>
        Sign up
      </Button>
      </p>
    </main>
  );
};

export default Landing;
