import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import ProfileNavbar from "./ProfileNavbar";
import BannerBackground from "../Assets/home-banner-background.png";
import Divider from "@mui/material/Divider";
import { useAuth } from "../AuthContext";

export default function Profile() {
  const { user } = useAuth();

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
      <ProfileNavbar sx={{ position: "relative", zIndex: 2 }} />
      <Divider
        sx={{ width: "100%", borderBottomWidth: 2, margin: "0 70px 0 90px" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          position: "relative",
          zIndex: 1,
          marginTop: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <TextField
            label="First Name"
            value={user.firstname}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={user.lastname}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Email"
            value={user.email}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="University"
            value={user.university}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          {/* Add more fields as needed */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FE9E0D", color: "black", mt: 2 }}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
