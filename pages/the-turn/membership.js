import React from "react";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import ProtectedRoute from "@/components/protected-route";
import { List, ListItem, Stack, Typography } from "@mui/material";

export default function Membership() {
  return (
    <ProtectedRoute>
      <Stack>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Become a Member
        </Typography>
        <Typography>
          Get access to member only events tournaments and activities. Subject
          to blackout dates.
        </Typography>
        <List>
          <ListItem>40 month 1hr</ListItem>
          <ListItem>100 month 3 hrs</ListItem>
          <ListItem>150 month 5hrs</ListItem>
        </List>
      </Stack>
    </ProtectedRoute>
  );
}

Membership.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
