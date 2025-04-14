import React, { useState, useEffect } from "react";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import { useSearchParams } from "next/navigation";
import { clearMessages, unsubscribeUser } from "@/store/user";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export default function Unsubscribe() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("Processing...");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      setStatus("Invalid request: missing token.");
      return;
    }

    const unsubscribe = () => {
      try {
        dispatch(unsubscribeUser({ token }));

        setStatus("You have been successfully unsubscribed.");
      } catch (error) {
        setStatus(
          error.message || "An error occurred. Please try again later."
        );
      } finally {
        dispatch(clearMessages());
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        margin: 0,
        fontWeight: 700
      }}
    >
      <Typography fontWeight="bold">{status}</Typography>
    </Box>
  );
}

Unsubscribe.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
