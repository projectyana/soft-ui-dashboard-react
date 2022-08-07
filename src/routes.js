
/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
/* eslint-disable*/
import { Navigate } from "react-router-dom";

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignUp from "layouts/authentication/sign-up";

// App svg
import * as SVG from "assets/svg";

// App Pages
import AppDashboard from "pages/dashboard";
import SignIn from "pages/auth/sign-in";
import RolePage from "pages/role";
import UserPage from "pages/user";
import MenuConfigurationPage from "pages/menu";
import GalleryPage from "pages/gallery";


// Page 
import PageMenu from "pages/page";
import PageEditor from "pages/page/editor";

// Blog 
import BlogMenu from "pages/blog";
import BlogEditor from "pages/blog/editor";

import CarouselPage from "pages/carousel";
import LivestreamPage from "pages/livestream";
import PressRelease from "pages/press_release";
import RecentInfoCategoryPage from "pages/recent_info_category";
import RecentInfoPage from "pages/recent_info";
import HealthComicPage from "pages/health_comic";

// Dashboard sidebar menu
const sideNav = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <SVG.DashboardIcon />,
    route: "/dashboard",
    component: <AppDashboard />,
  },
  {
    type: "collapse",
    name: "Role",
    key: "role",
    icon: <SVG.RoleIcon />,
    route: "/role",
    component: <RolePage />,
  },
  {
    type: "collapse",
    name: "User",
    key: "user",
    icon: <SVG.UserIcon />,
    route: "/user",
    component: <UserPage />,
  },
  {
    type: "collapse",
    name: "Page",
    key: "page",
    icon: <SVG.PageIcon />,
    route: "/page",
    component: <PageMenu />,
  },
  {
    type: "collapse",
    name: "Blog",
    key: "blog",
    icon: <SVG.BlogIcon />,
    route: "/blog",
    component: <BlogMenu />,
  },
  {
    type: "collapse",
    name: "Carousel",
    key: "carousel",
    icon: <SVG.CarouselIcon />,
    route: "/carousel",
    component: <CarouselPage />,
  },
  {
    type: "collapse",
    name: "Menu Configuration",
    key: "menu-configuration",
    icon: <SVG.MenuIcon />,
    route: "/menu-configuration",
    component: <MenuConfigurationPage />,
  },
  {
    type: "collapse",
    name: "Livestream",
    key: "livestream",
    icon: <SVG.LivestreamIcon />,
    route: "livestream",
    component: <LivestreamPage />,
  },
  {
    type: "collapse",
    name: "Press Release",
    key: "press-release",
    icon: <SVG.PressReleaseIcon />,
    route: "press-release",
    component: <PressRelease />,
  },
  {
    type: "collapse",
    name: "Recent Info Category",
    key: "recent-info-category",
    icon: <SVG.RecentInfoCategoryIcon />,
    route: "recent-info-category",
    component: <RecentInfoCategoryPage />,
  },
  {
    type: "collapse",
    name: "Recent Info",
    key: "recent-info",
    icon: <SVG.RecentInfoIcon />,
    route: "recent-info",
    component: <RecentInfoPage />,
  },
  {
    type: "collapse",
    name: "Health Comic",
    key: "health-comic",
    icon: <SVG.ComicIcon />,
    route: "health-comic",
    component: <HealthComicPage />,
  },
  {
    type: "collapse",
    name: "Media",
    key: "media",
    icon: <SVG.ComicIcon />,
    route: "media",
    component: <GalleryPage />,
  },
];

// Unauthenticated routes
const publicPath = [
  {
    name: "sign-in",
    key: "sign-in",
    route: "/sign-in",
    component: <SignIn />,
  },
  {
    name: "wildcard",
    key: "wildcard",
    route: "*",
    component: <Navigate replace to="/sign-in" />,
  },
];

// Require authentication routes
const protectedPath = sideNav.concat([
  // create or edit page 
  {
    name: "Page Editor",
    key: "page-editor",
    route: "/page/editor/:action", // action : create | edit
    component: <PageEditor />,
  },
  {
    name: "Blog Editor",
    key: "blog-editor",
    route: "/blog/editor/:action", // action : create | edit
    component: <BlogEditor />,
  },
  {
    name: "protected-wildcard",
    key: "protected-wildcard",
    route: "*",
    component: <Navigate replace to="/dashboard" />,
  },
]);

const routes = { publicPath, protectedPath };

export default routes;
