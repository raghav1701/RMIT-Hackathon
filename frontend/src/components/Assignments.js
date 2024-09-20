import React, { useState } from "react";
import { Link } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AssignmentsNavbar from "./AssignmentsNavbar";
import { Box } from "@mui/material";
import BannerBackground from "../Assets/home-banner-background.png";
import Divider from "@mui/material/Divider";

import Image11 from "../Assets/11.svg";
import Image12 from "../Assets/12.svg";
import Image13 from "../Assets/13.svg";

const images = [Image11, Image12, Image13];

export default function Assignments() {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (newSubject) => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setSubjects([...subjects, { ...newSubject, image: randomImage }]);
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
      <AssignmentsNavbar
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
        {subjects.map((subject, index) => (
          <Card
            key={index}
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
                {subject.subjectName}
              </Typography>
            </CardContent>
            <AspectRatio minHeight="200px" maxHeight="200px">
              <img
                src={subject.image}
                alt={subject.subjectName}
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
                Total Due: 2
              </Typography>
              <Link
                to={`/assignments/${index}`}
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
