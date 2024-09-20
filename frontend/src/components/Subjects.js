import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import SubjectAssignmentNavbar from "./AssignmentsNavbar";
import { Box, CircularProgress } from "@mui/material";
import BannerBackground from "../Assets/home-banner-background.png";
import Divider from "@mui/material/Divider";
import { useAuth } from "../AuthContext";

import Image11 from "../Assets/11.svg";
import Image12 from "../Assets/12.svg";
import Image13 from "../Assets/13.svg";

const images = [Image11, Image12, Image13];

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:4100/users/fetchsubjects",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch subjects");
      const data = await response.json();
      setSubjects(
        data.map((subject) => ({
          ...subject,
          image: images[Math.floor(Math.random() * images.length)],
        }))
      );
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async (newSubject) => {
    try {
      const response = await fetch("http://localhost:4100/users/addsubject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newSubject),
      });
      if (!response.ok) throw new Error("Failed to add subject");
      const addedSubject = await response.json();
      setSubjects([
        ...subjects,
        {
          ...addedSubject,
          image: images[Math.floor(Math.random() * images.length)],
        },
      ]);
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

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
      <SubjectAssignmentNavbar
        addSubject={addSubject}
        sx={{ position: "relative", zIndex: 2 }}
      />
      <Divider
        sx={{ width: "100%", borderBottomWidth: 2, margin: "0 70px 0 90px" }}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {subjects.map((subject) => (
          <Card
            key={subject._id}
            sx={{
              width: 320,
              marginRight: "2rem",
              marginBottom: "2rem",
              overflow: "hidden",
              padding: "0",
            }}
          >
            <CardContent>
              <Typography
                level="h2"
                fontSize="lg"
                fontWeight="lg"
                margin="15px 10px 10px 20px"
              >
                {subject.name}
              </Typography>
            </CardContent>
            <AspectRatio minHeight="200px" maxHeight="200px">
              <img
                src={subject.image}
                alt={subject.name}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </AspectRatio>
            <CardContent
              orientation="horizontal"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 20px 10px 20px",
              }}
            >
              <Typography
                level="body-md"
                sx={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Total Due: {subject.assignmentsCount || 0}
              </Typography>
              <Link
                to={`/subjects/${subject.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="View Details"
                >
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
