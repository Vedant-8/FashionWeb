import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import List from "@mui/material/List";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=600&h=400&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=600&h=400&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&h=400",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=600&h=400&q=60",
  },
];

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const [activeIndexes, setActiveIndexes] = useState([0, 0, 0, 0]);
  const [drawerWidth, setDrawerWidth] = useState(800); // Adjust drawer width here

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handlePrev = (index) => {
    setActiveIndexes((prevIndexes) =>
      prevIndexes.map((prevIndex, i) =>
        i === index
          ? prevIndex === 0
            ? images.length - 1
            : prevIndex - 1
          : prevIndex
      )
    );
  };

  const handleNext = (index) => {
    setActiveIndexes((prevIndexes) =>
      prevIndexes.map((prevIndex, i) =>
        i === index ? (prevIndex + 1) % images.length : prevIndex
      )
    );
  };

  const list = (anchor, carouselIndex) => (
    <Box
      key={carouselIndex}
      sx={{ width: drawerWidth, padding: "10px 0" }} // Adjusted padding
      role="presentation"
    >
      <List>
        {carouselIndex === 0 && ( // Display "Make a Fit!" only for the first carousel
          <div>
            <Box textAlign="center" mb={2}>
              <h2>Make a Fit!</h2>
            </Box>
          </div>
        )}
        <div
          className="image-carousel"
          style={{
            display: "flex",
            justifyContent: "space-between", // Added space between buttons
            alignItems: "center",
            overflowX: "hidden", // Removed horizontal overflow
          }}
        >
          <Button
            onClick={() => handlePrev(carouselIndex)}
            variant="contained"
            startIcon={<NavigateBeforeIcon />}
            sx={{ minWidth: "20px", padding: "2px", marginRight: "4px" }} // Smaller button size
          />
          <div
            className={`carousel-slide active`}
            style={{
              width: `${drawerWidth - 80}px`, // Adjusted width for buttons and padding
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
              padding: "10px", // Adjusted padding
            }}
          >
            <img
              src={images[activeIndexes[carouselIndex]].imgPath}
              alt={images[activeIndexes[carouselIndex]].label}
              style={{
                width: "30%",
                borderRadius: "8px",
              }}
            />
          </div>
          <Button
            onClick={() => handleNext(carouselIndex)}
            variant="contained"
            endIcon={<NavigateNextIcon />}
            sx={{ minWidth: "20px", padding: "2px" }} // Smaller button size
          />
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor, index) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {[0, 1, 2, 3].map((carouselIndex) => list(anchor, carouselIndex))}
          </SwipeableDrawer>
          <Button onClick={toggleDrawer(anchor, true)}>Match Fit</Button>
        </React.Fragment>
      ))}
    </div>
  );
}
