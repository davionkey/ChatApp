import React , { Component} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from 'react-native-button';
import * as firebase from 'firebase';
export default class RegisterComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            repassword: '',
        }
    }
    register = () => {
     
      firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then((user)=>{
        
        this.props.navigation.navigate('Chatroom')
      })
      .catch(error=>{console.log(error)})
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
                       secureTextEntry
            ></TextInput>
            <TextInput style={styles.textInput}
                       placeholder = 'Enter Re-Password'
                       onChangeText = {(text)=>this.setState({repassword:text})}
                       value = {this.state.repassword}
                       secureTextEntry
            ></TextInput>
            
            <Button
                  containerStyle={styles.button}
                  style={styles.textbutton}
                  onPress={()=>this.register()}
            >
             Register
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