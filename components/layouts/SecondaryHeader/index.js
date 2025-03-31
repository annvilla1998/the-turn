import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signOutReducer } from "@/store/user";
import { useSession, signOut } from "next-auth/react";
import { isAdmin } from "@/lib/auth";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";

const menuUrls = [
  {
    link: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1-ffmi662iw7iSin3K1u5-txijie6XwYO6m2x5Nd8A75C8qyRxOs8lxqiKIDtt1kvDM6xiDdl-",
    label: "Reserve",
    icon: <CalendarMonthIcon />,
  },
  {
    link: "/the-turn/membership",
    label: "Buy Membership",
    icon: <CreditCardIcon />,
  },
  {
    link: "/the-turn/gift-cards",
    label: "Buy Gift Card",
    icon: <CardGiftcardIcon />,
  },
];

export default function SecondaryHeader({ children }) {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    dispatch(signOutReducer());
    handleProfileMenuClose();
    signOut();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            The Turn
          </Typography>
          {session ? (
            <>
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {session?.user?.name?.charAt(0) || "U"}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={profileMenuOpen}
                onClose={handleProfileMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem disabled>
                  <Typography>
                    {session.user.name || session.user.email}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={signOutHandler}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/the-turn/sign-in" passHref>
              <Typography
                variant="body1"
                sx={{ cursor: "pointer", color: "white" }}
              >
                Sign In
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
          },
        }}
      >
        <Box sx={{ width: 240 }}>
          <Toolbar />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {isAdmin(session) && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href="/the-turn/admin/dashboard"
                  >
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin Dashboard" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}
            {menuUrls.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} href={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
