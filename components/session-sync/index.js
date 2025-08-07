import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, signOutReducer } from "@/store/user";

/**
 * SessionSync component keeps the NextAuth session and Redux state in sync
 * It listens for session changes and updates Redux accordingly
 */
const SessionSync = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  // Sync NextAuth session with Redux
  useEffect(() => {
    // If session is loading, do nothing
    if (status === "loading") return;

    // If user is signed out in NextAuth but still in Redux
    if (!session && currentUser) {
      // Sign out in Redux as well
      dispatch(signOutReducer());
    }

    // If user is signed in with NextAuth but not in Redux
    if (
      session?.user &&
      (!currentUser || currentUser.email !== session.user.email)
    ) {
      // Fetch and update user in Redux
      dispatch(fetchUser(session.user.email));
    }
  }, [session, status, currentUser, dispatch]);

  // Return null as this is just a utility component
  return null;
};

export default SessionSync;
