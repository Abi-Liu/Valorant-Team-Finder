import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { useState, useEffect, ChangeEvent, FC } from "react";

interface ReviewProps {
  id: string;
}

const Review: FC<ReviewProps> = ({ id }) => {
  const [value, setValue] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("hi");
  }, []);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submitting the message (e.g., send it to a backend server, etc.)
    console.log("Message submitted:", message);
    // Clear the message input after submitting
    setMessage("");
  };
  console.log(value);
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
          value={value}
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "grey", //set outline color to grey
            },
          }}
          onChange={(event: React.SyntheticEvent, newValue) => {
            setValue(newValue);
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
