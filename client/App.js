import React, { Component } from 'react';
import {StatusBar, StyleSheet, Text, View ,AppRegistry} from 'react-native';
import{createAppContainer} from 'react-navigation';
import{createStackNavigator,Header} from 'react-navigation-stack';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import Note from './components/Note';
import Home2 from './Home2';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import CameraExample from './cam.js';
  const RootStack = createStackNavigator({
  Register: {screen:Register},
  Login:  {screen:Login},
  Home:  {screen:Home},
  Navbar:  {screen:Navbar},
  Landing:  {screen:Landing},
  Home2:  {screen:Home2},
  Note: {screen:Note},
  Cam: {screen:CameraExample}
  },
    {
      initialRouteName: 'Login',
      defaultNavigationOptions:{
        header:null,
      }
    }
  );
  const App = createAppContainer(RootStack);
 

export default App;
AppRegistry.registerComponent('login',()=>App);