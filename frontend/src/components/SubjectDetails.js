import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AssignmentsNavbar from "./AssignmentsNavbar";
import BannerBackground from "../Assets/home-banner-background.png";
import Divider from "@mui/material/Divider";

export default function SubjectDetails() {
  const { id } = useParams();

  // Note: You'll need to implement a way to fetch the subject details based on the id
  // This could be from a global state, context, or an API call

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${BannerBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          backgroundSize: "contain",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 0,
          width: "700px",
          height: "100%",
        }}
      />
      <AssignmentsNavbar />
      <Divider
        sx={{ width: "100%", borderBottomWidth: 2, margin: "0 70px 0 90px" }}
      />
      <Box sx={{ padding: "2rem", position: "relative", zIndex: 1 }}>
        <Typography variant="h4">Subject Name for ID: {id}</Typography>
        <Typography variant="body1">Due Date: </Typography>
        <Typography variant="body1">Description: </Typography>
        {/* Add more details as needed */}
      </Box>
    </Box>
  );
}
