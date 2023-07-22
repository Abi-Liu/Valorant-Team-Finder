import { Dispatch, SetStateAction } from "react";
import { ReviewResponseData } from "./Review";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Divider,
  Rating,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ThumbUpOffAlt, ThumbDownOffAlt, Delete } from "@mui/icons-material";
import axiosInstance from "../utils/axios";
import { useUserContext } from "../contexts/UserContext";

const ReviewCard = ({
  review,
  setReviews,
  setTotalStars,
  setError,
}: {
  review: ReviewResponseData;
  setReviews: Dispatch<SetStateAction<ReviewResponseData[]>>;
  setTotalStars: Dispatch<SetStateAction<number>>;
  setError: Dispatch<SetStateAction<string>>;
}) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  function goToProfile() {
    navigate(`/profile/${review.creatingUser}`);
  }

  async function likeReview() {
    try {
      const response = await axiosInstance.put(
        `/review/likeReview/${review._id}`
      );
      if (response.data) {
        setReviews((prev) => {
          const index = prev.findIndex((review) => review._id === review._id);
          return [
            ...prev.slice(0, index),
            response.data,
            ...prev.slice(index + 1),
          ];
        });
      }
    } catch (error: any) {
      setError(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async function dislikeReview() {
    try {
      const response = await axiosInstance.put(
        `/review/dislikeReview/${review._id}`
      );
      if (response.data) {
        setReviews((prev) => {
          const index = prev.findIndex((review) => review._id === review._id);
          return [
            ...prev.slice(0, index),
            response.data,
            ...prev.slice(index + 1),
          ];
        });
      }
    } catch (error: any) {
      setError(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async function deleteReview() {
    try {
      const response = await axiosInstance.delete(
        `/review/deleteReview/${review._id}`
      );

      if (response.data) {
        setTotalStars((prev) => (prev -= review.rating));
        setReviews((prev) => {
          const index = prev.findIndex((review) => review._id === review._id);
          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        });
      }
    } catch (error: any) {
      setError(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  return (
    <Card variant="outlined">
      <CardContent sx={{ pb: "16px" }}>
        <Box sx={{ height: "100px", overflowY: "auto" }}>
          <Typography variant="body2">{review.message}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "1rem",
          }}
        >
          <Box>
            <Avatar
              src={review.profilePicture}
              alt="user profile card image"
              sx={{ height: "32px", width: "32px" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 14 }}
          >
            <Box onClick={goToProfile} sx={{ cursor: "pointer" }}>
              <Typography variant="body2">
                {review.ign.split("#")[0]}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                // width: "50px",
              }}
            >
              <Typography variant="caption">
                {review.dislikes.length}
              </Typography>
              <ThumbDownOffAlt
                sx={{ fontSize: "24px", px: "2.5px", cursor: "pointer" }}
                onClick={dislikeReview}
              />
              <ThumbUpOffAlt
                sx={{ fontSize: "24px", px: "2.5px", cursor: "pointer" }}
                onClick={likeReview}
              />
              <Typography variant="caption">{review.likes.length}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Rating value={review.rating} />
        </Box>
      </CardContent>
      {review.creatingUser === user._id && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Delete">
            <Delete
              sx={{ color: "black", cursor: "pointer" }}
              onClick={deleteReview}
            />
          </Tooltip>
        </Box>
      )}
    </Card>
  );
};

export default ReviewCard;
