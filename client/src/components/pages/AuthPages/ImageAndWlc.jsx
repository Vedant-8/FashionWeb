import React from "react";
import { Image } from "react-bootstrap";

const ImageAndWlc = () => {
  return (
    <div className="welcome-section">
      <h2 className="login-welcome-text">Welcome to the world of Fashion!</h2>
      <div className="login-welcome-img">
        <Image
          src="https://images.bewakoof.com/web/group-19-1617704502.png"
          fluid
          loading="lazy"
          alt="login-image"
        />
      </div>
    </div>
  );
};

export default ImageAndWlc;
