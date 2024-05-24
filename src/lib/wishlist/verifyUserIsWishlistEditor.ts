import type { UserTypeWithOwner } from "~/types/user";

export const verifyUserIsWishlistEditor = (userType: UserTypeWithOwner) => {
  return userType === "editor" || userType === "owner";
};
