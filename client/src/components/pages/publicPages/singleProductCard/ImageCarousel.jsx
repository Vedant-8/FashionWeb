import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import List from "@mui/material/List";

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerWidth, setDrawerWidth] = useState(700); // Increased drawer width

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

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const singleImageWidth = 500; // Increased image width
    const newDrawerWidth = singleImageWidth;
    setDrawerWidth(newDrawerWidth);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      handlePrev();
    } else if (event.key === "ArrowRight") {
      handleNext();
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: drawerWidth, padding: "20px 0" }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {state[anchor] && (
          <div
            className="image-carousel"
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${
                  index === activeIndex ? "active" : ""
                }`}
                style={{
                  width: `${drawerWidth}px`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  flexShrink: 0,
                  padding: index === activeIndex ? "20px" : "0", // Increased padding for the active slide
                }}
              >
                <img
                  src={image.imgPath}
                  alt={image.label}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </div>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
          <Button onClick={toggleDrawer(anchor, true)}>Match Fit</Button>
        </React.Fragment>
      ))}
    </div>
  );
}
