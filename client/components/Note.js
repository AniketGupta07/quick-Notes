import React from 'react';
import { FlatList, ActivityIndicator, TextInput, TouchableHighlight, View ,Text } from 'react-native';

export default class FetchExample extends React.Component {
  constructor() {
    super()
    this.state = {
      note: '',
      email:''
    };
  }

  handleChange  = (key, val) => {
      // console.log('messi');
      this.setState({ [key]: val })
  }

  onadd = async() =>{
    const {navigation} =this.props;
    const myemail=navigation.getParam('email','NAn');
    console.log(myemail);
    const newUser = {
      data: this.state.note,
      email: myemail,
    };
    console.log(newUser);
  
    var myJSON=JSON.stringify(newUser)  
    fetch('http://172.17.75.174:5000/api/users/add', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: myJSON,
   })
      .then((response) =>{
         this.setState({ note:'' });
       if (response.status == 400){
        console.log("fail");
        response.json().then((responseJson)=>{this.state.errors.name=responseJson.name;
        this.state.errors.email=responseJson.email;
        console.log(responseJson.email);
      })
       }
       else{

       this.props.navigation.push('Home',{email:myemail});
     }
     }).catch((error) =>{
        console.error(error);
      }); 
  }
  back=async()=>{
    const {navigation} =this.props;
    const myemail=navigation.getParam('email','NAn');
    this.props.navigation.push('Home',{email:myemail});
  }

  render(){
    return(
      <View style={{flex: 1, paddingTop:20}}>
       <TextInput
          id="note"
          placeholder="data"
          onChangeText={value => this.handleChange('note', value)}
          value={this.state.note}
        />
        <TouchableHighlight
          onPress={this.onadd}
        >
        <Text>Add Note</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.back}
        >
        <Text>Cancel</Text>
        </TouchableHighlight>
      </View>
    );
  }
}