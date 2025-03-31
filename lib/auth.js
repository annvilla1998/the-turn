export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};

export function isAdmin(session) {
  return session?.user?.role === USER_ROLES.ADMIN;
}
