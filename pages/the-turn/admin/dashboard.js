import React from "react";
import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Paper,
  Chip,
  Alert,
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  CircularProgress,
  Tabs,
  Tab
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { logError } from "@/utils/logger";
import { useGetReservationsQuery } from "@/store/apis/reservation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { data: reservations } = useGetReservationsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/the-turn/sign-in");
    } else if (session.user.role !== "admin") {
      router.push("/the-turn/unauthorized");
    } else {
      fetchUsers();
    }
  }, [session, status, router]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(0); // Reset pagination when switching tabs
  };

  async function fetchUsers() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      logError("Failed to fetch users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserDelete = async (id) => {
    try {
      setError("");
      const response = await fetch(`/api/admin/user/delete?userId=${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      logError("Failed to delete user:", error);
      setError("Failed to fetch users.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  // Function to render the users tab content
  const renderUsersTab = () => (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Subscribed</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow hover key={user.id}>
                    <TableCell>{user.name || "—"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={user.role === "admin" ? "primary" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.subscribed ? "subscribed" : ""}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this user?"
                            )
                          ) {
                            handleUserDelete(user.id);
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            {users && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

  // Function to sort reservations by date (soonest first)
  const getSortedReservations = () => {
    if (!reservations) return [];

    return [...reservations].sort((a, b) => {
      // First compare by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateB - dateA; // Ascending date order (soonest first)
      }

      // If same date, compare by time
      // Convert time strings to comparable values (e.g. "6:00 PM" to minutes)
      const timeToMinutes = (timeStr) => {
        if (!timeStr) return 0; // Handle null/undefined times

        try {
          const [timePart, period] = timeStr.split(" ");
          let [hours, minutes] = timePart.split(":").map(Number);

          // Handle 12-hour format conversion to 24-hour
          if (period === "PM" && hours !== 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;

          return hours * 60 + (minutes || 0); // In case minutes is undefined
        } catch {
          return 0; // Default value if parsing fails
        }
      };

      return timeToMinutes(b.time) - timeToMinutes(a.time);
    });
  };

  // Function to render the reservations tab content
  const renderReservationsTab = () => {
    const sortedReservations = getSortedReservations();

    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Bay</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Occasion</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedReservations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((reservation) => {
                  const user = users.find((u) => u.id === reservation.user_id);
                  return (
                    <TableRow hover key={reservation.id}>
                      <TableCell>
                        {new Date(reservation.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.service_time} hour(s)</TableCell>
                      <TableCell>{reservation.bay}</TableCell>
                      <TableCell>{user?.email || "—"}</TableCell>
                      <TableCell>{reservation.occasion || "—"}</TableCell>
                      <TableCell>{reservation.note || "—"}</TableCell>
                    </TableRow>
                  );
                })}
              {sortedReservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No reservations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedReservations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  };

  return (
    <AdminLayout>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="admin dashboard tabs"
          variant="fullWidth"
        >
          <Tab label="Users" />
          <Tab label="Reservations" />
        </Tabs>
      </Box>

      {activeTab === 0 ? renderUsersTab() : renderReservationsTab()}
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/the-turn/sign-in",
        permanent: false
      }
    };
  }

  if (session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/the-turn/unauthorized",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}
