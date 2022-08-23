import { useSelector } from 'react-redux';
import routes from "routes";

const getRolePermissions = (currentPagePath = null) => {
  // get user allowed role
  const { role } = useSelector((state) => state?.auth);
  // get page url from params or from window.location.pathname
  const currentPath = currentPagePath ?? window.location.pathname.replace("/admin", "");
  // get page role code from routes, by matching with current path
  const getRoleCode = routes?.protectedPath?.find((item) => item.route === currentPath)?.role;
  // check if user is allowed to write/delete on this page
  const isAllowWrite = role[getRoleCode]?.includes("W");
  const isAllowDelete = role[getRoleCode]?.includes("D");

  return {
    currentPath,
    menuRole: getRoleCode,
    isAllowWrite,
    isAllowDelete
  };
};

export default getRolePermissions;