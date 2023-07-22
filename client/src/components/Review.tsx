import {
  Box,
  Button,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect, ChangeEvent, FC, SyntheticEvent } from "react";
import ReviewCard from "./ReviewCard";
import axiosInstance from "../utils/axios";
import CustomAlert from "./CustomAlert";

interface ReviewProps {
  id: string;
}
export interface ReviewResponseData {
  _id: string;
  creatingUser: string;
  dislikes: [string];
  likes: [string];
  ign: string;
  profilePicture: string;
  message: string;
  rating: number;
  user: string;
}

const Review: FC<ReviewProps> = ({ id }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<ReviewResponseData[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function getReviews() {
      try {
        const response = await axiosInstance.get(`/review/getReviews/${id}`);

        if (response.data) {
          if (!ignore) {
            setReviews(response.data);
          }
        }
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

  useEffect(() => {
    let ignore = false;
    function getTotalStars() {
      if (!ignore) {
        let total = 0;
        reviews.forEach((review) => (total += review.rating));
        setTotalStars(total);
      }
    }

    getTotalStars();

    return () => {
      ignore = true;
    };
  }, [id, reviews]);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  function handleRender() {
    setError("");
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    // Handle submitting the message (e.g., send it to a backend server, etc.)
    try {
      if (rating) {
        const response = await axiosInstance.post(
          `/review/createReview/${id}`,
          {
            message,
            rating,
          }
        );
        if (response.data && response.status === 200) {
          setReviews((prev) => [...prev, response.data]);
          setTotalStars((prev) => prev + rating);
        }
      } else {
        setError("Please give a rating.");
        throw new Error("Please give a rating.");
      }
    } catch (error: any) {
      setError(error.response.data.message);
      throw new Error(error.response.data.message);
    }

    // Clear the message and rating input after submitting
    setMessage("");
    setRating(null);
  };

  return (
    <Box>
      {error ? (
        <CustomAlert
          severity="error"
          duration={5000}
          message={error}
          onRender={handleRender}
        />
      ) : (
        ""
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: "1rem",
          pt: "2rem",
        }}
      >
        <Rating sx={{ display: "none" }} />
        <Rating
          name="read-only"
          precision={0.5}
          value={Math.round(totalStars * 10) / 10}
          readOnly
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "grey", //set outline color to grey
            },
            fontSize: "45px",
          }}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="body1" sx={{ color: "gray" }}>
            {Math.round(totalStars * 10) / 10} Stars
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            ({reviews.length} Votes)
          </Typography>
        </Box>
      </Box>

      <Divider
        variant="middle"
        sx={{
          backgroundColor: "gray", // Change this to your desired color
          height: 2, // Adjust the height as needed
          mt: 2, // Add margin at the top
          mb: 2, // Add margin at the bottom
        }}
      />

      <Box
        sx={{
          my: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: "3rem",
        }}
      >
        <Typography variant="h5" sx={{ color: "gray", mb: "1rem" }}>
          Reviews
        </Typography>
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            setTotalStars={setTotalStars}
            setReviews={setReviews}
            setError={setError}
          />
        ))}
      </Box>

      <Divider
        variant="middle"
        sx={{
          backgroundColor: "gray", // Change this to your desired color
          height: 2, // Adjust the height as needed
          mt: 2, // Add margin at the top
          mb: 2, // Add margin at the bottom
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: "50px",
        }}
      >
        <Typography variant="h5" sx={{ color: "gray", mb: "1rem" }}>
          Leave a Review
        </Typography>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            fontFamily: "Poppins",
            backgroundColor: "#FF4654",
            "&:hover": {
              backgroundColor: "#c6000f",
            },
          }}
        >
          Create Review
        </Button>
      </Box>
    </Box>
  );
};

export default Review;
