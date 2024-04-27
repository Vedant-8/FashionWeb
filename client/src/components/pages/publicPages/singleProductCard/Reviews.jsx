import React, { useEffect, useState } from "react";
import { useBaseApi } from "../../../contextApi/BaseDomainContext";

import axios from "axios";

import { Rating } from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

import { Button, Form } from "react-bootstrap";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";
import { useNavigate } from "react-router-dom";
import { ToasterMessage } from "../../../../helper/toastHelper";
import { adjectives, animals, colors, names, uniqueNamesGenerator } from "unique-names-generator";

const Reviews = ({ productId }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState({
    ratings: 0,
    text: "",
  });
  const [flagForRefresh, setFlagForRefresh] = useState(false);

  useEffect(() => {
    fetchReview();
  }, [flagForRefresh]);

  const baseURL = useBaseApi();

  const customConfig ={
    dictionaries: [names, colors],
    separator: ' ',
    length: 2,
    style: 'capital'
  };
  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const { accessToken } = useAccessToken();

  const fetchReview = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/ecommerce/review/${productId}`,
        {
          headers: {
            projectId: "4stjj1sb1x5a",
          },
        }
      );

      // console.log("reviews", response.data.data);
      setReviews(response.data.data);
    } catch (e) {
      console.log("error occured in fetching reviews", e);
    }
  };

  // console.log(reviews);

  const handleReviewChange = (e) => {
    setReviewInput({
      ...reviewInput,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(reviewInput);
  const handleAddReview = async () => {
    // e.preventDefault();
    if (!accessToken) {
      navigate("/login");
      return;
    }
    else{
      if(reviewInput.ratings <= 0 || reviewInput.review === '')
      {
        ToasterMessage('info','Please complete the review');
        return;
      }
    }
    
      try {
        const response = await axios.post(
          `https://academics.newtonschool.co/api/v1/ecommerce/review/${productId}`,
          {
            ratings: reviewInput.ratings,
            text: reviewInput.text,
          },
          {
            headers: {
              projectId: "4stjj1sb1x5a",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // console.log(response);
        if (response.status === 201) {
         ToasterMessage('success',response.data.message);
          setFlagForRefresh(!flagForRefresh);
        }
      } catch (error) {
        ToasterMessage('error',"Something went wrong");
      }
    }
  // console.log(productId);

  const handleRemoveReview = async (id) => {
    try {
      const response = await axios.delete(
        `
        https://academics.newtonschool.co/api/v1/ecommerce/review/${id}
        `,
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log("response", response);
      if (response.status === 204) {
        ToasterMessage('success',"review deleted successfully");
        setFlagForRefresh(!flagForRefresh);
      }
    } catch (error) {
      if (error.message === "Review not found") {
       ToasterMessage('error',error.response.data.message);
        // console.log('error in deleting review', error);
      } else {
        ToasterMessage('error',"something went wrong");
      }
    }
  };

  return (
    <div className="review-wrapper">
      <div className="review-container">
        <h4 className="review-title">Reviews</h4>

        {reviews.map((review) => {
          return (
            <div key={review.id} className="review-item-wrapper">
              <div>
                <div className="ratings-star">
                  <Rating value={review.ratings} readOnly />
                </div>
                <div className="review-text">
                  {review.text}
                  <div className="review-username">{uniqueNamesGenerator(customConfig)}</div>
                  <div className="review-date">2021-06-24</div>
                </div>
              </div>
              <DeleteForeverTwoToneIcon
                className="review-delete-icon"
                onClick={() => handleRemoveReview(review._id)}
              />
            </div>
          );
        })}
        <div className="adding-review-wrapper">
          <h3 className="adding-review-title">Add a review</h3>

          <Form
            className="adding-review-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddReview();
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicRating">
              <Form.Label>How was the product ?</Form.Label>
              <Form.Control
                type="number"
                max={5}
                min={0}
                onChange={handleReviewChange}
                name="ratings"
                placeholder="Rate the product out of 5"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicReview">
              <Form.Label>Review Product :</Form.Label>
              <Form.Control
                type="text"
                onChange={handleReviewChange}
                name="text"
                placeholder="Enter a review"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
