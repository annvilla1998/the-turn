import React, { useState } from "react";
import Link from "next/link";
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
  useTheme
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Home as HomeIcon
} from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const menuUrls = [
  {
    link: "/the-turn/reserve",
    label: "Reserve A Bay",
    icon: <CalendarMonthIcon />
  },
  {
    link: "/the-turn/membership",
    label: "Become a Member",
    icon: <CreditCardIcon />
  },
  {
    link: "/the-turn/gift-cards",
    label: "Buy Gift Card",
    icon: <CardGiftcardIcon />
  },
  {
    link: "/the-turn/checkout",
    label: "Checkout",
    icon: <ShoppingCartIcon />
  }
];

export default function SecondaryHeader({ children }) {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(anchorEl);
  const theme = useTheme();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = async () => {
    // First sign out with NextAuth (this will trigger our SessionSync component)
    await signOut({ redirect: false });
    // Close the menu
    handleProfileMenuClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              The Turn
            </Link>
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
                slotProps={{
                  paper: {
                    sx: {
                      color: theme.palette.text.primary
                    }
                  }
                }}
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
              <Typography variant="body1" sx={{ cursor: "pointer" }}>
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
            background: theme.palette.common.white,
            color: theme.palette.text.primary
          }
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 6,
          background: theme?.palette?.common?.white,
          color: theme.palette.common.black
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
