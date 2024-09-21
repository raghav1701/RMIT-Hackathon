import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ap from "../Assets/ap.jpg";
import net from "../Assets/net.png";
import { useAuth } from "../AuthContext";

const Work = ({ setOpenSnackbar }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const workInfoData = [
    {
      image: ap,
      title: "Assignment Planner",
      text: "Stay on top of deadlines, organize your tasks with To-Do lists, and receive AI-powered recommendations for better task management.",
      route: "/subjects",
    },
    {
      image: net,
      title: "Student Networking",
      text: "Connect with fellow students from your preferred university, course, or hobby to form study groups and share knowledge seamlessly.",
      route: "/networking",
    },
  ];

  const handleCardClick = (route) => {
    if (user) {
      navigate(route);
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4, mt: 20 }}>
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "700", color: "#fe9e0d", fontSize: "1.15rem" }}
      >
        Work
      </Typography>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontSize: "clamp(2rem, 5vw, 4rem)",
          color: "#4c4c4c",
        }}
      >
        How It Works
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ mb: 4, color: "#6a6a6a", fontSize: "clamp(1rem, 3vw, 1.5rem)" }}
      >
        At MyCampus, our mission is to foster a supportive community where
        students can connect, collaborate, and thrive. We believe that academic
        success is best achieved together, and we're here to support you every
        step of the way.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {workInfoData.map((data) => (
          <Grid item xs={12} sm={6} md={4} key={data.title}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(data.route)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={data.image}
                  alt={data.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.text}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      my: "20px",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "#FE9E0D",
                        color: "black",
                        fontWeight: "bold",
                        padding: "10px 40px",
                        borderRadius: "50px",
                        fontSize: "12px",
                        "&:hover": {
                          backgroundColor: "#e08c0b",
                        },
                      }}
                    >
                      Explore Now
                    </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Work;
