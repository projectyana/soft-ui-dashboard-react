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

import { Navigate } from "react-router-dom";

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

// App Pages
import AppDashboard from "pages/dashboard";
import SignIn from "pages/auth/sign-in";
import RolePage from "pages/role";
import UserPage from "pages/user";
import MenuConfigurationPage from "pages/menu";

// Page 
import PageMenu from "pages/page";
import PageEditor from "pages/page/editor";

// Blog 
import BlogMenu from "pages/blog";
import BlogEditor from "pages/blog/editor";

import CarouselPage from "pages/carousel";
import LivestreamPage from "pages/livestream";
import PressRelease from "pages/press_release";

// Dashboard sidebar menu
const sideNav = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Office size="12px" />,
    route: "/dashboard",
    component: <AppDashboard />,
    // component: <Tables />,
  },
  {
    type: "collapse",
    name: "Role",
    key: "role",
    icon: <Document size="12px" />,
    route: "/role",
    component: <RolePage />,
  },
  {
    type: "collapse",
    name: "User",
    key: "user",
    icon: <Document size="12px" />,
    route: "/user",
    component: <UserPage />,
  },
  {
    type: "collapse",
    name: "Page",
    key: "page",
    icon: <Document size="12px" />,
    route: "/page",
    component: <PageMenu />,
  },
  {
    type: "collapse",
    name: "Blog",
    key: "blog",
    icon: <Document size="12px" />,
    route: "/blog",
    component: <BlogMenu />,
  },
  {
    type: "collapse",
    name: "Carousel",
    key: "carousel",
    icon: <Document size="12px" />,
    route: "/carousel",
    component: <CarouselPage />,
  },
  {
    type: "collapse",
    name: "Menu Configuration",
    key: "menu-configuration",
    icon: <Document size="12px" />,
    route: "/menu-configuration",
    component: <MenuConfigurationPage />,
  },
  {
    type: "collapse",
    name: "Livestream",
    key: "livestream",
    icon: <Document size="12px" />,
    route: "livestream",
    component: <LivestreamPage />,
  },
  {
    type: "collapse",
    name: "Press Release",
    key: "press-release",
    icon: <Document size="12px" />,
    route: "press-release",
    component: <PressRelease />,
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
