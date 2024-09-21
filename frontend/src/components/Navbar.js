import React, { useState } from "react";
import MyCampus from "../Assets/MyCampus.svg";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    university: "",
  });

  const { user, login, logout } = useAuth();

  const handleAuthOpen = () => setOpenAuth(true);
  const handleAuthClose = () => {
    setOpenAuth(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      university: "",
    });
  };
  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
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

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      login(data.user); // Use the login function from context
      console.log("User logged in:", data);
      handleAuthClose();
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (e.g., show error message to user)
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
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

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      login(data.user); // Use the login function from context
      console.log("User signed up:", data);
      handleAuthClose();
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle signup error (e.g., show error message to user)
    }
  };

  const handleLogout = () => {
    logout(); // Use the logout function from context
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={MyCampus} alt="" />
      </div>
      <div className="navbar-links-container">
        {user ? (
          <>
            <Typography variant="body1" style={{ marginRight: "15px" }}>
              Welcome, {user.firstName}
            </Typography>
            <button className="primary-button" onClick={handleLogout}>
              Logout
            </button>
          </>
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
                  id="firstName"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  margin="dense"
                  id="lastName"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.lastName}
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
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          <Typography align="center" style={{ marginTop: "20px" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button color="primary" onClick={toggleAuthMode}>
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          </Typography>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
