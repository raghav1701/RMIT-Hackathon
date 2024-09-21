// SubjectAssignments.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Divider } from "@mui/material";
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
      <Box sx={{ padding: "2rem", position: "relative", zIndex: 1 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Assignments
        </Typography>
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
    </Box>
  );
}
