import { useSelector } from 'react-redux';
import routes from "routes";

const getRolePermissions = () => {
  const { role } = useSelector((state) => state?.auth);
  const currentPath = window.location.pathname.replace("/admin", "");
  const getRoleCode = routes?.protectedPath?.find((item) => item.route === currentPath)?.role;
  const isAllowWrite = role[getRoleCode].includes("W");
  const isAllowDelete = role[getRoleCode].includes("D");

  return {
    currentPath,
    menuRole: getRoleCode,
    isAllowWrite,
    isAllowDelete
  };
};

export default getRolePermissions;