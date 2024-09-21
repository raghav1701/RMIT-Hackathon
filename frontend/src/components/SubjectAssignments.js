import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import AssignmentsNavbar from "./AssignmentsNavbar";
import AssignmentCard from "./AssignmentCard";
import BannerBackground from "../Assets/home-banner-background.png";
import { useAuth } from "../AuthContext";

const API_BASE_URL = "http://localhost:4100/users";

export default function SubjectAssignments() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch assignments");
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAssignment = async (newAssignment) => {
    try {
      const response = await fetch(
        "http://localhost:4100/users/addassignment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            ...newAssignment,
            subjectId: id,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to add assignment");
      const addedAssignment = await response.json();
      setAssignments([...assignments, addedAssignment]);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

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
      <AssignmentsNavbar addAssignment={handleAddAssignment} />
      <Divider
        sx={{ width: "100%", borderBottomWidth: 2, margin: "0 70px 0 90px" }}
      />
      <Box sx={{ display: "flex", position: "relative", zIndex: 1 }}>
        {/* Left side - Assignments (60%) */}
        <Box
          sx={{
            width: "60%",
            padding: "2rem",
            overflowY: "auto",
            maxHeight: "calc(100vh - 64px)", // Adjust based on your navbar height
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            assignments.map((assignment) => (
              <AssignmentCard key={assignment._id} assignment={assignment} />
            ))
          )}
        </Box>

        {/* Right side - Paragraph (40%) */}
        <Box
          sx={{
            width: "40%",
            padding: "2rem",
            overflowY: "auto",
            maxHeight: "calc(100vh - 64px)", // Adjust based on your navbar height
          }}
        >
          <Paper elevation={3} sx={{ padding: "2rem" }}>
            <Typography variant="h5" gutterBottom>
              Subject Information
            </Typography>
            <Typography variant="body1" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Typography variant="body1" paragraph>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </Typography>
            <Typography variant="body1">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
