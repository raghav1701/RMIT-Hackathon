import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
  Button,
  Input,
} from "@mui/material";
import AssignmentsNavbar from "./AssignmentsNavbar";
import AssignmentCard from "./AssignmentCard";
import BannerBackground from "../Assets/home-banner-background.png";
import { useAuth } from "../AuthContext";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const API_BASE_URL = "https://rmit-hackathon.vercel.app/users";

export default function SubjectAssignments() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [uploading, setUploading] = useState(false);

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
        "https://rmit-hackathon.vercel.app/users/addassignment",
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const extractTextFromPdf = async (file) => {
    const pdfData = await pdfjsLib.getDocument(URL.createObjectURL(file))
      .promise;
    let text = "";

    for (let i = 1; i <= pdfData.numPages; i++) {
      const page = await pdfData.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      text += `${pageText} `;
    }
    return text;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const text = await extractTextFromPdf(file);
      const response = await axios.post(
        "https://rmit-hackathon.vercel.app/users/summary",
        {
          text,
        }
      );
      setExtractedText(response.data.summary);
    } catch (error) {
      console.error("Error processing or sending text to backend:", error);
      setExtractedText("An error occurred while processing the PDF.");
    } finally {
      setUploading(false);
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

        <Box
          sx={{
            width: "40%",
            padding: "2rem",
            overflowY: "auto",
            maxHeight: "calc(100vh - 64px)", // Adjust based on your navbar height
          }}
        >
          <Paper elevation={3} sx={{ padding: "2rem" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Get Recommendations from AI
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ textAlign: "center", marginBottom: "35px" }}
            >
              Just upload your PDF and get AI-powered recommendations.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={uploading}
                sx={{
                  backgroundColor: "#FE9E0D",
                  color: "black",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  fontSize: "12px",
                }}
              >
                {uploading ? "Processing..." : "Upload PDF"}
              </Button>
            </form>
            {uploading && (
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <CircularProgress />
              </Box>
            )}
            {extractedText && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">AI Recommendations:</Typography>
                <Typography variant="body1">{extractedText}</Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
