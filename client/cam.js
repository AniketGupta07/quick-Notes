import FileSystem from 'expo'
import React from 'react';
import { Text, View, TouchableOpacity ,ToastAndroid} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    email:'',
  };

  async componentDidMount() {
    const {navigation} = this.props;
    this.setState({email:navigation.getParam('email')});
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
snap = async () => {
  if (this.camera) {
    ToastAndroid.show('Please Wait for a while', ToastAndroid.SHORT);
     let photo = await this.camera.takePictureAsync({ base64: true });
// console.log(photo);
     const userData = {
      base: photo.base64,
      email: this.state.email
    };
    // console.log(newUser);
  
  var myJSON=JSON.stringify(userData);
    fetch('http://172.17.75.174:5000/api/users/Text', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: myJSON,
   })
      .then(res => {
      if(res.status ==200){
        console.log("Here");
        ToastAndroid.show('DONE!!!', ToastAndroid.SHORT);
        this.props.navigation.push('Home',{email:this.state.email});
      }
      else{
        ToastAndroid.show('Oops, Try Again', ToastAndroid.SHORT);
        console.log(res);
      }
    }).catch((error) =>{
        console.error(error);
      });
  }
};
back=async()=>{
  this.props.navigation.push('Home',{email:this.state.email});
}
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}  ref={ref => {
        this.camera = ref;
        }}>
         
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={
                  this.back
                }>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Back </Text>
              </TouchableOpacity>
               <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={
                  this.snap
                }>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Snap </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}