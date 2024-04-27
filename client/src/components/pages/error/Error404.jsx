import React from "react";
import { Image } from "react-bootstrap";

import "./Error.css";
const Error404 = () => {
  return (
    <div className="error-wrapper">
      <Image
        src="https://mountaineeringscotland.justgo.com/ErrorPages/img/404-light.gif"
        loading="lazy"
        alt="error"
      />
    </div>
  );
};

export default Error404;
