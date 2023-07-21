import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { useState, useEffect, ChangeEvent, FC, SyntheticEvent } from "react";
import axiosInstance from "../utils/axios";

interface ReviewProps {
  id: string;
}
interface ReviewResponseData {
  _id: string;
  creatingUser: string;
  dislikes: [string];
  likes: [string];
  message: string;
  rating: number;
  user: string;
}

const Review: FC<ReviewProps> = ({ id }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<ReviewResponseData | null>(null);
  console.log(reviews);
  useEffect(() => {
    let ignore = false;
    async function getReviews() {
      try {
        const response = await axiosInstance.get(`/review/getReviews/${id}`);
        if (response.data) {
          if (!ignore) setReviews(response.data);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
        throw new Error("failed to fetch reviews");
      }
    }

    getReviews();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    // Handle submitting the message (e.g., send it to a backend server, etc.)
    try {
      const response = await axiosInstance.post(`/review/createReview/${id}`, {
        message,
        rating,
      });
      console.log(response);
      if (response.data && !response.data.message) {
        setReviews((prev) => ({
          ...prev,
          ...response.data,
        }));
      }
    } catch (error) {
      console.log(error);
      throw new Error("failed to create review");
    }
    console.log("Message submitted:", message);
    // Clear the message and rating input after submitting
    setMessage("");
    setRating(null);
  };
  console.log(rating);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: "1rem",
        }}
      >
        <Rating
          name="half-rating-read"
          precision={0.5}
          readOnly
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "grey", //set outline color to grey
            },
            fontSize: "45px",
          }}
        />
        <Box>
          <Typography component={"span"}>Stars</Typography>
          <Typography component={"span"}>Votes</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          mt: "10px",
        }}
      >
        <Rating
          value={rating}
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "grey", //set outline color to grey
            },
          }}
          onChange={(event: React.SyntheticEvent, newValue) => {
            setRating(newValue);
          }}
        />
        <TextField
          label="Type your message here"
          variant="outlined"
          value={message}
          onChange={handleMessageChange}
          fullWidth
          multiline
          rows={4}
          sx={{
            backgroundColor: "white",
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default Review;
