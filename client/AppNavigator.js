import {createAppContainer,StackNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import React, { Component } from "react";

const RootStack = createStackNavigator({
  Register: Register,
  Login:  Login ,
  Home:  Home ,
},
  {
  	initialRouteName: 'Home',
  }
);
const AppContainer = createAppContainer(RootStack)
 class AppNavigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}
export default AppNavigator;