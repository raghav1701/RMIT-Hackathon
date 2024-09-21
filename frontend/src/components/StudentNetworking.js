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
  CircularProgress,
} from "@mui/material";
import NetworkingNavbar from "./NetworkingNavbar";
import BannerBackground from "../Assets/home-banner-background.png";
import Image11 from "../Assets/11.svg";
import Image12 from "../Assets/12.svg";
import Image13 from "../Assets/13.svg";
import { useAuth } from "../AuthContext";

const images = [Image11, Image12, Image13];

const StudentNetworking = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    course: "",
    university: "",
    hobby: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    courses: [],
    universities: [],
    hobbies: [],
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://rmit-hackathon.vercel.app/users/all",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
      updateFilterOptions(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFilterOptions = (data) => {
    const courses = [...new Set(data.map((student) => student.course))];
    const universities = [
      ...new Set(data.map((student) => student.university)),
    ];
    const hobbies = [...new Set(data.map((student) => student.hobby))];
    setFilterOptions({ courses, universities, hobbies });
  };

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
    if (filters.university) {
      result = result.filter(
        (student) => student.university === filters.university
      );
    }
    if (filters.hobby) {
      result = result.filter((student) => student.hobby === filters.hobby);
    }
    setFilteredStudents(result);
  }, [filters, students]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
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
              {filterOptions.courses.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>University</InputLabel>
            <Select
              name="university"
              value={filters.university}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {filterOptions.universities.map((uni) => (
                <MenuItem key={uni} value={uni}>
                  {uni}
                </MenuItem>
              ))}
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
              {filterOptions.hobbies.map((hobby) => (
                <MenuItem key={hobby} value={hobby}>
                  {hobby}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredStudents.map((student, index) => (
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
                  <CardContent sx={{ flex: "0 0 75%" }}>
                    <Typography variant="h6">{`${student.firstname} ${student.lastname}`}</Typography>
                    <Typography>Course: {student.course}</Typography>
                    <Typography>University: {student.university}</Typography>
                    <Typography>Hobby: {student.hobby}</Typography>
                  </CardContent>
                  <Box
                    sx={{
                      flex: "0 0 25%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <img
                      src={images[index % images.length]}
                      alt={`Decoration ${index + 1}`}
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
        )}
      </Box>
    </Box>
  );
};

export default StudentNetworking;
