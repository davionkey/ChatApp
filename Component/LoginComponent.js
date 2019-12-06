import React , { Component} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from 'react-native-button'
import * as firebase from 'firebase'



const firebaseConfig = {
  apiKey: "AIzaSyBRrgIaKGrCRz2YM1Xn6nkItKVujiBDdLA",
  authDomain: "contactform-e9bfb.firebaseapp.com",
  databaseURL: "https://contactform-e9bfb.firebaseio.com",
  projectId: "contactform-e9bfb",
  storageBucket: "contactform-e9bfb.appspot.com",
  messagingSenderId: "56898023109",
  appId: "1:56898023109:web:37720f7c6f7f869da10aac",
  measurementId: "G-GY39BDRRJJ"
};
firebase.initializeApp(firebaseConfig);
export default class LoginComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      email : '',
      password : ''
    }
  }
  signIn = ()=>{
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .then((user)=>{
      if(!user.user.displayName)
      {
        this.props.navigation.navigate('Update')
      }else{
      this.props.navigation.navigate('Chatroom')}})
    .catch(error=>console.log(error));
    
  }
  render(){
    return(
      <View style={styles.container}>
            <TextInput style={styles.textInput}
                       placeholder = 'Enter Email'
                       onChangeText = {(text)=>this.setState({email:text})}
                       value = {this.state.email}
            >
                      
            </TextInput>
            <TextInput style={styles.textInput}
                       placeholder = 'Enter Password'
                       onChangeText = {(text)=>this.setState({password:text})}
                       value = {this.state.password}
            ></TextInput>
            <Button
                  containerStyle={styles.button}
                  style={styles.textbutton}
                  onPress={()=>this.signIn()}
            >
              Sign In
            </Button>
            <Button
                  containerStyle={styles.button}
                  style={styles.textbutton}
                  onPress={()=>this.props.navigation.navigate('Register')}
            >
              Sign Up
            </Button>
            <Button
                  containerStyle={styles.button}
                  style={styles.textbutton}
                  onPress={()=>this.signInFacebook()}
            >
              Login With Facebook
            </Button>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container : {
      flex :1,
      justifyContent : 'center'
    },
    textInput : {
      height : 40,
      borderColor:'gray',
      borderWidth: 1,
      margin : 10,
      borderRadius : 45,
      padding : 10
    },
    button : {
      padding : 10,
      height : 45,
      overflow :'hidden',
      borderRadius : 4,
      backgroundColor : '#365899',
      margin : 10
    },
    textbutton: {
        fontSize : 20,
        color : 'white'
    }
});