import React from "react";
import { Alert } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { HomeScreen, RegisterScreen, LoginScreen } from "@screens";
import MainStack from "./MainStack";

console.disableYellowBox = true;

const Login_Register = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none",
  }
);

const SwitchNav = createSwitchNavigator(
  { Login_Register, MainStack },
  {
    initialRouteName: "Login_Register",
    headerMode: "none",
  }
);

export default createAppContainer(SwitchNav);
