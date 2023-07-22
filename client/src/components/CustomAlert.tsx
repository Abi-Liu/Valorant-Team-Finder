import { Alert, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useState, useEffect } from "react";

type CustomAlertColor = "success" | "error" | "warning" | "info";

interface Props {
  severity: CustomAlertColor;
  message: string;
  duration: number;
  onRender: () => void;
}

const CustomAlert: FC<Props> = ({ severity, message, duration, onRender }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      onRender();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      {open && (
        <Alert severity={severity} action={action}>
          {message}
        </Alert>
      )}
    </>
  );
};

export default CustomAlert;
