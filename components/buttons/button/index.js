import React from "react";
import { Button as MuiButton } from "@mui/material";

export default function Button({ size = "medium", onClick, type, children }) {
  return (
    <MuiButton
      variant="contained"
      sx={{
        width: "100%",
        size: size,
        margin: "8px 0"
      }}
      type={type}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
}
