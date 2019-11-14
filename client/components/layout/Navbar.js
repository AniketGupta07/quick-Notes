import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
  container: {
    position: 'absolute' ,
    top:0,
    left:0,
  },
};


class Navbar extends Component {
  static navigationOptions={
    title: 'Home',
  };
  
  render() {
    return (
    <View style={styles.container}>
      <Icon.Button
      name="home"
      backgroundColor="#000000"
      onPress={() =>
          this.props.navigation.navigate('Home')
      }
      >
        Home

      </Icon.Button>

    </View>
  );
  }
}
export default Navbar;