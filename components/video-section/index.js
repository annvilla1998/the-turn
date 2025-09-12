import React from "react";
import { Box } from "@mui/material";

export default function VideoSection() {
  return (
    <Box mt={10} sx={{ position: "relative", zIndex: 1, width: "100%" }}>
      <Box
        component="video"
        controls
        sx={{
          width: "100%",
          maxHeight: "60vh",
          display: "block",
          boxShadow: "0 15px 30px rgba(0,0,0,0.4)"
        }}
        poster="/images/gameplay.jpg"
      >
        <source src="/mp4/grand-opening.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Box>
    </Box>
  );
}
