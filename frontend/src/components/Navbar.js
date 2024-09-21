import React, { useState } from "react";
import MyCampus from "../Assets/MyCampus.svg";
import { HiOutlineBars3 } from "react-icons/hi2";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "../AuthContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    university: "",
  });

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { user, login, logout } = useAuth();

  const handleAuthOpen = () => setOpenAuth(true);
  const handleAuthClose = () => {
    setOpenAuth(false);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      university: "",
    });
  };
  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://rmit-hackathon.vercel.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user);
      handleAuthClose();
      showSnackbar("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      showSnackbar(error.message || "Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://rmit-hackathon.vercel.app/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      login(data.user);
      handleAuthClose();
      showSnackbar("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error);
      showSnackbar(error.message || "Signup failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    showSnackbar("Logged out successfully");
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={MyCampus} alt="" />
      </div>
      <div className="navbar-links-container">
        {user ? (
          <Box sx={{ display: "flex", gap: "40px" }}>
            <button
              className="primary-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 15px",
              }}
              onClick={handleProfileClick}
            >
              <Avatar {...stringAvatar(`${user.firstname} ${user.lastname}`)} />
              <span>Welcome, {user.firstname}</span>
            </button>
            <button className="primary-button" onClick={handleLogout}>
              Logout
            </button>
          </Box>
        ) : (
          <button className="primary-button" onClick={handleAuthOpen}>
            Login
          </button>
        )}
      </div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      <Dialog open={openAuth} onClose={handleAuthClose} maxWidth="xs" fullWidth>
        <DialogContent>
          <Typography variant="h5" align="center" gutterBottom>
            {isLogin ? "Login" : "Sign Up"}
          </Typography>

          <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
            {!isLogin && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="firstname"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  margin="dense"
                  id="lastname"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  margin="dense"
                  id="university"
                  label="University"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <Typography align="center" style={{ marginTop: "20px" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button
              color="primary"
              onClick={toggleAuthMode}
              disabled={isLoading}
            >
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          </Typography>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </nav>
  );
};

export default Navbar;
