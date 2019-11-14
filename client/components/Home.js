import React, { Component } from "react";
import { Button,StyleSheet, Text, FlatList, View,TouchableHighlight } from 'react-native';
import { Link } from "react-router-dom";
import Navbar from "./layout/Navbar"
import Landing from "./layout/Landing"

class Home extends Component {
constructor() {
    super()
    
    this.state = {
      email: 'User@xyz.in',
      Notes: []
    };
  }

  async componentDidMount(){
  	
  	
  	this.fetchData();
  }

fetchData = async() =>{
	const {navigation} = this.props;
  	this.setState({email:navigation.getParam('email')});
	fetch(`http://172.17.75.174:5000/api/users/getAll?email=${encodeURIComponent(navigation.getParam('email'))}`, {
    method: 'GET',
	})
    .then((response) =>{
    	if (response.status == 400){
        	console.log("fail");
        	response.json().then((responseJson)=>{this.state.errors.name=responseJson.name;
        		this.state.errors.email=responseJson.email;
        		console.log(responseJson.email);
      		})
       	}
       	else{
       		response.json().then((responseJson)=>{
       			console.log(responseJson);
       			// const json= JSON.stringify(responseJson);
       			const json= responseJson;
       			this.setState({Notes:json});
       		})
		}
    }).catch((error) =>{
        console.error(error);
    });
};

  render() {
  	var Note='Aniket';
	 


    return (
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
        data={this.state.Notes}
        renderItem={({ item }) => <Text style={{margin:10,padding: 10, height:50, textAlign: 'center' ,backgroundColor: 'skyblue',fontSize: 20}}> {item.data} </Text>}
        keyExtractor={item => item._id}
      	/>
      	<View>
      		<TouchableHighlight
      			onPress={()=>{
      				this.props.navigation.navigate('Cam',{email:this.state.email});
      			}}
      			style = {{alignItems: 'center',height:50,backgroundColor: 'powderblue'  }}
      		>
      			<Text style={{padding: 15,fontSize: 20,color: 'white',fontWeight:'bold' }}>Camera</Text>
      		</TouchableHighlight>
      		<TouchableHighlight
      			onPress={()=>{
      				this.props.navigation.navigate('Note',{email:this.state.email});
      			}}
      			style = {{alignItems: 'center',height:50,backgroundColor: 'powderblue'  }}
      		>
      			<Text style={{padding: 15,fontSize: 20,color: 'white',fontWeight:'bold' }}>Add Note</Text>
      		</TouchableHighlight>
      		<TouchableHighlight
      			onPress={()=>{
      				this.setState({email: ''});
      				this.props.navigation.push('Login');
      			}}
      			style = {{alignItems: 'center',height:50,backgroundColor: 'powderblue'  }}
      		>
      			<Text style={{padding: 15,fontSize: 20,color: 'white',fontWeight:'bold' }}>Log-out</Text>
      		</TouchableHighlight>
      	</View>
      </View>
    );
  }
}
export default Home;