import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideBar from "../screens/SideBar";
import Dashboard from "../screens/Dashboard";
import Modal from "../screens/Modal";

export default createDrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    Modal: { screen: Modal },
  },
  {
    initialRouteName: "Dashboard",
    contentComponent: props => <SideBar {...props} />
  }
);
