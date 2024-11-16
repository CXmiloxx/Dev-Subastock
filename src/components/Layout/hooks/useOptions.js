import { optionsLogged, optionsUnlogged } from "../constants/HeaderOptions";
import useAuth from "../../../contexts/AuthContext";

const useOptions = () => {
  const { isLogged, isLoading } = useAuth();
  if (isLoading) return [];
  return isLogged ? optionsLogged : optionsUnlogged;
};

export default useOptions;
