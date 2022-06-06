import { useSelector } from "react-redux";
const useAuth = () => {
  const userData = useSelector((state) => state.persistedReducer.auth.currentUser);
  return userData;
};

export default useAuth;
