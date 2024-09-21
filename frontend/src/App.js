import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PdfUploader from "./components/PdfUploader";
import Home from "./components/Home";
import Subjects from "./components/Subjects";
import SubjectAssignments from "./components/SubjectAssignments";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { Snackbar } from "@mui/material";
import Profile from "./components/Profile";
import StudentNetworking from "./components/StudentNetworking";

function App() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/subjects"
            element={
              <ProtectedRoute>
                <Subjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subjects/:id"
            element={
              <ProtectedRoute>
                <SubjectAssignments />
              </ProtectedRoute>
            }
          />
          <Route path="/fast-deliveries" element={<PdfUploader />} />
          <Route
            path="/"
            element={<Home setOpenSnackbar={setOpenSnackbar} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/networking"
            element={
              <ProtectedRoute>
                <StudentNetworking />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Please log in to access this page"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
