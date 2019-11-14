import React, { Component } from "react";
import { Button,StyleSheet, Text, View } from 'react-native';
import { Link } from "react-router-dom";
import{createAppContainer} from 'react-navigation';
import{createStackNavigator} from 'react-navigation-stack';

const styles = {
  container: {
    position: 'absolute' ,
    top:200,
    left:100,
  },
};


class Landing extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() =>
          this.props.navigation.navigate('Register')
          }
          title="Register"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() =>
          this.props.navigation.navigate('Login')
          }
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
export default Landing;