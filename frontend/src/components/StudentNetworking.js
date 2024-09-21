import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import NetworkingNavbar from "./NetworkingNavbar";
import BannerBackground from "../Assets/home-banner-background.png";
import Image11 from "../Assets/11.svg";
import Image12 from "../Assets/12.svg";
import Image13 from "../Assets/13.svg";

const StudentNetworking = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    course: "",
    age: "",
    hobby: "",
    university: "",
  });

  // Dummy universities
  const universities = ["University A", "University B", "University C"];

  // Mock data - replace this with actual API call
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: "Alice",
        course: "Computer Science",
        age: 22,
        hobby: "Gaming",
        university: "University A",
      },
      {
        id: 2,
        name: "Bob",
        course: "Engineering",
        age: 24,
        hobby: "Sports",
        university: "University B",
      },
      {
        id: 3,
        name: "Charlie",
        course: "Business",
        age: 26,
        hobby: "Reading",
        university: "University C",
      },
      {
        id: 4,
        name: "Diana",
        course: "Computer Science",
        age: 23,
        hobby: "Music",
        university: "University A",
      },
      {
        id: 5,
        name: "Eve",
        course: "Engineering",
        age: 28,
        hobby: "Gaming",
        university: "University B",
      },
    ];
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    let result = students;
    if (filters.course) {
      result = result.filter((student) => student.course === filters.course);
    }
    if (filters.age) {
      const [min, max] = filters.age.split("-").map(Number);
      result = result.filter(
        (student) => student.age >= min && student.age <= max
      );
    }
    if (filters.hobby) {
      result = result.filter((student) => student.hobby === filters.hobby);
    }
    if (filters.university) {
      result = result.filter(
        (student) => student.university === filters.university
      );
    }
    setFilteredStudents(result);
  }, [filters, students]);

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
      <NetworkingNavbar sx={{ position: "relative", zIndex: 2 }} />
      <Divider
        sx={{
          width: "100%",
          borderBottomWidth: 2,
          marginBottom: "20px",
          marginLeft: "80px",
        }}
      />

      <Box
        sx={{ padding: "2rem", position: "relative", zIndex: 1, ml: "55px" }}
      >
        <Box sx={{ display: "flex", gap: "20px", mb: "30px" }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Course</InputLabel>
            <Select
              name="course"
              value={filters.course}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Age</InputLabel>
            <Select
              name="age"
              value={filters.age}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="20-25">20-25</MenuItem>
              <MenuItem value="25-30">25-30</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Hobby</InputLabel>
            <Select
              name="hobby"
              value={filters.hobby}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Gaming">Gaming</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Reading">Reading</MenuItem>
            </Select>
          </FormControl>

          {/* University Filter */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>University</InputLabel>
            <Select
              name="university"
              value={filters.university}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {universities.map((uni) => (
                <MenuItem key={uni} value={uni}>
                  {uni}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Display filtered students */}
        <Grid container spacing={3}>
          {filteredStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <Card
                sx={{
                  boxShadow: "0 4px 20px rgba(255, 158, 0, 0.5)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  display: "flex",
                  height: "100%",
                }}
              >
                {/* Left Side - Student Info (75% width) */}
                <CardContent sx={{ flex: "0 0 70%" }}>
                  <Typography variant="h6">{student.name}</Typography>
                  <Typography>Course: {student.course}</Typography>
                  <Typography>Age: {student.age}</Typography>
                  <Typography>Hobby: {student.hobby}</Typography>
                  <Typography>University: {student.university}</Typography>
                </CardContent>

                {/* Right Side - Image (25% width) */}
                <Box
                  sx={{
                    flex: "0 0 30%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <img
                    src={[Image11, Image12, Image13][student.id % 3]} // Cycle through images
                    alt={`Decoration ${student.id}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentNetworking;
