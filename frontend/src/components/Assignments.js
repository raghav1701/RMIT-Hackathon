import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import AssignmentsNavbar from "./AssignmentsNavbar";
import { Box } from "@mui/material";
import BannerBackground from "../Assets/home-banner-background.png";
import Divider from "@mui/material/Divider";

export default function Assignments() {
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
      <AssignmentsNavbar sx={{ position: "relative", zIndex: 2 }} />
      <Divider
        sx={{ width: "100%", borderBottomWidth: 2, margin: "0 70px 0 90px" }} // Increased width and line thickness
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} sx={{ width: 320, marginRight: "2rem" }}>
            <div>
              <Typography level="title-lg">Yosemite National Park</Typography>
              <Typography level="body-sm">April 24 to May 02, 2021</Typography>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs">Total price:</Typography>
                <Typography sx={{ fontSize: "lg", fontWeight: "lg" }}>
                  $2,900
                </Typography>
              </div>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              >
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
