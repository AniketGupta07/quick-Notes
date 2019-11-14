import React, { Component } from 'react'
import{Text,View,Button,TextInput,StyleSheet,TouchableOpacity,BackHandler,ToastAndroid,StatusBar} from 'react-native'
import axios from 'axios'
import PropTypes from "prop-types";

import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email:'',
      password: '',
      errors:{}
      
    };
  }
componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }



   handleChange  = (key, val) => {
      // console.log('messi');
      this.setState({ [key]: val })
    }
    onSubmitR = async () => {
    this.props.navigation.push('Register');
    };
    onSubmit = async () => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    
    // console.log(newUser);
  
  var myJSON=JSON.stringify(userData);
    fetch('http://172.17.75.174:5000/api/users/login', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: myJSON,
   })
      .then(res => {
      if(res.status ==200){
        this.props.navigation.push('Home',{email: this.state.email});
      }
      else{
        ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
        console.log(res);
      }
    }).catch((error) =>{
        console.error(error);
      }); 
  }
    // axios
     //  .post("/api/users/register", newUser)
     //  .then(res =>{ 
     //   if(res===null){
     //     console.log("HOLA")
     //   }
     //    }
     //    ) // re-direct to login on successful register
     //  .catch(err =>
     //    console.log(err.message),
     //  ); 


render() {
  const { errors } = this.state;
  return (

     <View style={styles.container}>    
     <StatusBar hidden />
        <Text> E-mail:</Text>
        <TextInput
          style={styles.input}
            id="email"
            type="email"
      error={errors.email}
      placeholder="email"
      onChangeText={value => this.handleChange('email', value)}
      value={this.state.email}
        />
        <Text> password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true} 
            id="password"
            type="password"
      error={errors.password}
      placeholder="password"
      onChangeText={value => this.handleChange('password', value)}
      value={this.state.password}
        />
        <Button style={styles.sbmt}
          title='Login'
          onPress ={this.onSubmit}
        />
        <Button style={styles.sbmt}
          title='Register'
          onPress ={this.onSubmitR}
        />
      </View>
  )
}
}
const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sbmt:{
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  }
})

export default Login;