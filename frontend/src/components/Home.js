import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@mui/material";
import About from "./About";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Footer from "./Footer";

const Home = ({ setOpenSnackbar }) => {
  return (
    <>
      <Container>
        <Navbar />
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">Manage Deadlines,</h1>
            <h1 className="primary-heading">Maximize Learning</h1>
            <p className="primary-text">
              Stay organized and connected with our assignment planner and
              networking platform. Collaborate with peers, manage deadlines, and
              maximize your learning experience—all in one place.
            </p>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </Container>
      <About />
      <Container>
        <Work setOpenSnackbar={setOpenSnackbar} />
        <Testimonial />
        <Footer />
      </Container>
    </>
  );
};

export default Home;
