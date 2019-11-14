import React, { Component } from 'react'
import{ToastAndroid,KeyboardAvoidingView,Text,View,Button,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import axios from 'axios'
import PropTypes from "prop-types";

import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			email:'',
			password: '',
			password2: '',
			errors:{}
			
		};
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
    onSubmit2=async()=>{
      this.props.navigation.navigate('Login')
    }
    onSubmit = async () => {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
  
  var myJSON=JSON.stringify(newUser)  
    fetch('http://172.17.75.174:5000/api/users/register', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: myJSON,
   })
      .then((response) =>{
       if (response.status == 400){
        ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
        console.log("fail");
        response.json().then((responseJson)=>{this.state.errors.name=responseJson.name;
        this.state.errors.email=responseJson.email;
        console.log(responseJson.email);
      })
       }
       else{
       this.props.navigation.push('Login');
     }
     }).catch((error) =>{
        console.error(error);
      }); 

  }
    // axios
	   //  .post("/api/users/register", newUser)
	   //  .then(res =>{ 
	   //  	if(res===null){
	   //  		console.log("HOLA")
	   //  	}
	   //    }
	   //    ) // re-direct to login on successful register
	   //  .catch(err =>
	   //    console.log(err.message),
	   //  ); 


render() {
	const { errors } = this.state;
	return (
		 <View>
		 <Text> Username:</Text>
        <TextInput
          style={styles.input}
          	id="name"
          	type="username"
			error={errors.name}
			placeholder="Username"
			onChangeText={value => this.handleChange('name', value)}
      value={this.state.name}
        />
       
        <Text> email:</Text>
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
        <Text> Confirm Password:</Text>
        <TextInput secureTextEntry={true} 
          style={styles.input}
          	id="password2"
          	type="password"
			error={errors.password2}
			placeholder="Confirm Password"
			onChangeText={value => this.handleChange('password2', value)}
      value={this.state.password2}
        />
        <Button style={styles.sbmt}
          title='Sign Up'
          onPress ={this.onSubmit}
        />
        <Button style={styles.sbmt}
          title='Log In'
          onPress ={this.onSubmit2}
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

export default Register;