import Cookies from "universal-cookie";
const cookies = new Cookies();
export const useGetUserInfo = () => {
  const displayName = cookies.get("name");
  const profilePicture = cookies.get("profilePicture");
  const userID = cookies.get("uid");
  return { displayName, profilePicture, userID };
};
