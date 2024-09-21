import React from "react";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";
import { useAuth } from "../AuthContext";

const Work = ({ setOpenSnackbar }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const workInfoData = [
    {
      image: PickMeals,
      title: "Pick Meals",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
      route: "/subjects",
    },
    {
      image: ChooseMeals,
      title: "Choose How Often",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
      route: "/networking",
    },
    {
      image: DeliveryMeals,
      title: "Fast Deliveries",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
      route: "/fast-deliveries",
    },
  ];

  const handleCardClick = (route) => {
    if (user) {
      navigate(route);
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <CardActionArea
            key={data.title}
            onClick={() => handleCardClick(data.route)} // Navigate on card click
            style={{ textDecoration: "none" }} // Optional styling to prevent underline
          >
            <div className="work-section-info">
              <div className="info-boxes-img-container">
                <img src={data.image} alt={data.title} />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          </CardActionArea>
        ))}
      </div>
    </div>
  );
};

export default Work;
